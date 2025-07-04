import { create } from "zustand";

export type LogFilters = {
  level?: string;
  message?: string;
  resourceId?: string;
  traceId?: string;
  spanId?: string;
  commit?: string;
  timestamp_start?: string;
  timestamp_end?: string;
};

interface FilterState {
  filters: LogFilters;
  setFilters: (filters: Partial<LogFilters>) => void;
  clearFilters: () => void;
}

export const useLogFilterStore = create<FilterState>((set) => ({
  filters: {},
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  clearFilters: () => set({ filters: {} }),
}));
