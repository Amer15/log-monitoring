import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { useCreateLog, useLogQuery } from "../queries/log_queries";
import { cn } from "../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { type LogFormValues, logFormSchema } from "../utils/schema-validators";
import { useLogFilterStore } from "../store/filter-store";
import { endOfDay, startOfDay } from "date-fns";

const Dashboard = () => {
  const { filters } = useLogFilterStore();
  const query = {
    level: filters.level,
    message: filters.message,
    resourceId: filters.resourceId,
    timestamp_start: filters.timestamp_start
      ? startOfDay(filters.timestamp_start).toISOString()
      : undefined,
    timestamp_end: filters.timestamp_end
      ? endOfDay(filters.timestamp_end).toISOString()
      : undefined,
  };

  const { data: logs = [], isLoading, isError } = useLogQuery(query);
  const { mutate: createLog, isPending, reset } = useCreateLog();

  const [open, setOpen] = useState(false);

  const form = useForm<LogFormValues>({
    resolver: zodResolver(logFormSchema),
    defaultValues: {
      level: "info",
      message: "",
      resourceId: "",
      traceId: "",
      spanId: "",
      commit: "",
      metadata: {},
    },
  });

  const onSubmit = (data: LogFormValues) => {
    createLog(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        reset();
      },
      onError: (err) => {
        console.error("Log creation failed:", err);
      },
    });
  };

  return (
    <section className="h-screen flex-1">
      <div className="max-w-[1500px] mx-auto h-screen p-6">
        <div className="flex justify-between items-center max-w-[1000px] mx-auto mb-6">
          <h3 className="font-semibold text-xl">Logs View</h3>
          {/* Sheet Trigger Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button>Add Log</Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
              <SheetHeader>
                <SheetTitle>Add a New Log</SheetTitle>
                <SheetDescription>
                  Fill in all log details below
                </SheetDescription>
              </SheetHeader>

              <div className="px-5 pb-5">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 mt-4"
                >
                  {/* Level */}
                  <div>
                    <label className="block mb-1">Level</label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("level", value as LogFormValues["level"])
                      }
                      defaultValue={form.watch("level")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warn</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block mb-1">Message</label>
                    <Textarea {...form.register("message")} />
                    {form.formState.errors.message && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* ResourceId */}
                  <div>
                    <label className="block mb-1">Resource ID</label>
                    <Input {...form.register("resourceId")} />
                  </div>

                  {/* TraceId */}
                  <div>
                    <label className="block mb-1">Trace ID</label>
                    <Input {...form.register("traceId")} />
                  </div>

                  {/* SpanId */}
                  <div>
                    <label className="block mb-1">Span ID</label>
                    <Input {...form.register("spanId")} />
                  </div>

                  {/* Commit */}
                  <div>
                    <label className="block mb-1">Commit</label>
                    <Input {...form.register("commit")} />
                  </div>

                  {/* Metadata (optional) */}
                  <div>
                    <label className="block mb-1">Metadata (JSON)</label>
                    <Textarea
                      placeholder='{"browser":"Chrome", "os":"Mac"}'
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          form.setValue("metadata", parsed);
                        } catch {
                          form.setError("metadata" as any, {
                            message: "Invalid JSON",
                          });
                        }
                      }}
                    />
                  </div>

                  <Button type="submit" className="mt-4" disabled={isPending}>
                    {isPending ? "creating log..." : "Submit"}
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Table */}
        {isLoading ? (
          <p className="text-center">Loading logs...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load logs.</p>
        ) : (
          <Table className="w-full border border-border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Level</TableHead>
                <TableHead className="w-[400px]" colSpan={6}>
                  Message
                </TableHead>
                <TableHead className="w-[160px]">ResourceId</TableHead>
                <TableHead className="w-[120px]">TraceId</TableHead>
                <TableHead className="w-[120px]">SpanId</TableHead>
                <TableHead className="w-[120px]">Commit</TableHead>
                <TableHead className="w-[200px]">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center">
                    No logs found.
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <p
                        className={cn(
                          "font-medium p-1 rounded-full text-center",
                          log.level === "error" && "bg-red-200 text-red-500",
                          log.level === "info" && "bg-blue-200 text-blue-500",
                          log.level === "warn" && "bg-amber-200 text-amber-500",
                          log.level === "debug" && "bg-slate-300 text-slate-600"
                        )}
                      >
                        {log.level}
                      </p>
                    </TableCell>
                    <TableCell colSpan={6}>{log.message}</TableCell>
                    <TableCell>{log.resourceId}</TableCell>
                    <TableCell>{log.traceId}</TableCell>
                    <TableCell>{log.spanId}</TableCell>
                    <TableCell>{log.commit}</TableCell>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
