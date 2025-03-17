import { create } from "zustand";
import { getRoute } from "@/service/api";
import { RouteResponse } from "@/types/type";

interface RouteState {
  routeData: RouteResponse | null;
  loading: boolean;
  fetchRoute: (coordinates: [number, number][]) => Promise<void>;
}

export const useRouteStore = create<RouteState>((set) => ({
  routeData: null,
  loading: false,

  fetchRoute: async (coordinates) => {
    set({ loading: true });
    try {
      const data = await getRoute(coordinates);
      set({ routeData: data });
    } catch (error) {
      console.error("Error fetching route:", error);
      set({ routeData: null });
    } finally {
      set({ loading: false });
    }
  },
}));
