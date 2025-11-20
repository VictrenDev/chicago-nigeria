import { create } from "zustand";
import { callApi } from "../libs/helper/callApi";
import { ApiResponse, IUser } from "../types";
import { useShallow } from "zustand/shallow";
import { innaccessibleByAuthUsers } from "../constants";

type Session = {
  user: IUser | null;
  loading: boolean;
  isFirstMount: boolean;
  actions: {
    clearSession: () => void;
    updateUser: (data: IUser) => void;
    getSession: (isInitialLoad?: boolean) => Promise<void>;
  };
};

export type SelectorFn<TStore, TResult> = (state: TStore) => TResult;

const initialState = {
  user: null,
  loading: true,
  isFirstMount: false,
};

export const initSession = create<Session>()((set, get) => ({
  ...initialState,
  actions: {
    getSession: async (isInitialLoad = false) => {
      console.log(" <====  🛡️ Getting Session  ===> ");
      if (typeof isInitialLoad === "boolean") {
        set({ isFirstMount: true });
      }

      const { data } = await callApi<ApiResponse<IUser>>(
        `/api/v1/auth/session`
      );

      set({ ...(data?.data && { user: data.data }), loading: false });

      console.log(data?.data);
    },

    updateUser: (data: IUser) => set({ user: data }),

    clearSession: () => {
      const currentPageUrl =
        typeof window !== "undefined" ? window.location.pathname : "";

      set({ user: null, loading: false });

      if (
        currentPageUrl !== "/signin" &&
        currentPageUrl !== "/signup" &&
        !get().isFirstMount
      ) {
        console.log("logging out, redirecting to login page");
        window.location.replace("/signin");
      }
    },
  } satisfies Session["actions"],
}));

export const useSession = <TResult>(selector: SelectorFn<Session, TResult>) => {
  return initSession(useShallow(selector));
};
