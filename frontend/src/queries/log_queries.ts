import { queryClient } from "../main";
import { axiosClient } from "../config/axios-config";
import type { MonitoringLog } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { LogFormValues } from "../utils/schema-validators";

export const useLogQuery = () => {
  return useQuery<MonitoringLog[]>({
    queryKey: ["logs"],
    queryFn: async () => {
      const res = await axiosClient.get("/logs/all");
      return res.data.logs;
    },
  });
};

export const useCreateLog = () => {
  return useMutation({
    mutationFn: async (data: LogFormValues) => {
      const response = await axiosClient.post("/logs/create", {
        ...data,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
};
