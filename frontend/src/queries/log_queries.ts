import { queryClient } from "../main";
import { axiosClient } from "../config/axios-config";
import type { MonitoringLog } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { LogFormValues } from "../utils/schema-validators";
import type { LogFilters } from "../store/filter-store";
import qs from "qs";

export const useLogQuery = (filters: LogFilters) => {
  return useQuery<MonitoringLog[]>({
    queryKey: ["logs", filters],
    queryFn: async () => {
      const queryString = qs.stringify(filters, { skipNulls: true });
      const res = await axiosClient.get(`/logs/all?${queryString}`);
      return res.data.logs;
    },
  });
};

// export const useLogQuery = () => {
//   return useQuery<MonitoringLog[]>({
//     queryKey: ["logs"],
//     queryFn: async () => {
//       const res = await axiosClient.get("/logs/all");
//       return res.data.logs;
//     },
//   });
// };

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
