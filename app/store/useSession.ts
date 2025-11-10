import { create } from "zustand";
import { callApi } from "../libs/helper/callApi";
import { ApiResponse, IUser } from "../types";
import { useShallow } from "zustand/shallow";
import { innaccessibleByUsers } from "../constants";

type Session = {
  loading: boolean;
  user: IUser | null;
  isFirstMount: boolean;
  actions: {
    clearSession: () => void;
    updateUser: (data: IUser) => void;
    getSession: (isInitialLoad?: boolean) => Promise<void>;
    // initSession: (data: User) => void;
  };
};

export type SelectorFn<TStore, TResult> = (state: TStore) => TResult;

const initialState = {
  user: null,
  loading: true,
  isFirstMount: false,
};

export const sessionStore = create<Session>();

export const initSession = sessionStore((set, get) => ({
  ...initialState,
  actions: {
    getSession: async (isInitialLoad) => {
      if (isInitialLoad) {
        set({ isFirstMount: true });
      }

      const { data } = await callApi<ApiResponse<IUser>>(
        "/api/v1/auth/session"
      );
      set({ user: data?.data, loading: false });
    },

    updateUser: (data) => set({ user: data, loading: true }),
    initSession: (data: IUser) =>
      set({ user: data, loading: true, isFirstMount: true }),
    clearSession: () => {
      set((state) => ({
        ...initialState,
        loading: false,
        isFirstMount: state.isFirstMount,
      }));

      const currentPageUrl = window?.location?.pathname;

      if (
        !innaccessibleByUsers.includes(currentPageUrl) &&
        !get().isFirstMount
      ) {
        console.log("logging out, redirecting to login page");
        window.location.replace("/signin");
      }
    },
  },
}));

export const useSession = <TResult>(selector: SelectorFn<Session, TResult>) => {
  return initSession(useShallow(selector));
};
