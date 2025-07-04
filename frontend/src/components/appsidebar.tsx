import { useLogFilterStore } from "../store/filter-store";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

export function AppSidebar() {
  const { filters, setFilters, clearFilters } = useLogFilterStore();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader>
        <div className="px-4 py-2 font-bold">Filters</div>
        <div className="flex justify-between items-center px-4">
          <Button onClick={() => {}}>Apply</Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-4 p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Level</SidebarGroupLabel>
          <Select
            onValueChange={(val) => setFilters({ level: val })}
            value={filters.level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warn">Warn</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Message</SidebarGroupLabel>
          <Input
            placeholder="failed to add user"
            value={filters.message || ""}
            onChange={(e) => setFilters({ message: e.target.value })}
          />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Resource ID</SidebarGroupLabel>
          <Input
            placeholder="server-1222"
            value={filters.resourceId || ""}
            onChange={(e) => setFilters({ resourceId: e.target.value })}
          />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>From (Start Time)</SidebarGroupLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                {filters.timestamp_start
                  ? format(
                      new Date(filters.timestamp_start),
                      "dd MMM yyyy, hh:mm a"
                    )
                  : "Select Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  filters.timestamp_start
                    ? new Date(filters.timestamp_start)
                    : undefined
                }
                onSelect={(date) =>
                  setFilters({
                    timestamp_start: date ? date.toISOString() : undefined,
                  })
                }
              />
            </PopoverContent>
          </Popover>
        </SidebarGroup>

        {/* Date Range End */}
        <SidebarGroup>
          <SidebarGroupLabel>To (End Time)</SidebarGroupLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                {filters.timestamp_end
                  ? format(
                      new Date(filters.timestamp_end),
                      "dd MMM yyyy, hh:mm a"
                    )
                  : "Select End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  filters.timestamp_end
                    ? new Date(filters.timestamp_end)
                    : undefined
                }
                onSelect={(date) =>
                  setFilters({
                    timestamp_end: date ? date.toISOString() : undefined,
                  })
                }
              />
            </PopoverContent>
          </Popover>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
