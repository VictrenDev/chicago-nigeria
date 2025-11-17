// store/useSession.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { callApi } from "../libs/helper/callApi";
import { ApiResponse, IUser } from "../types";
import { useShallow } from "zustand/shallow";
import { innaccessibleByUsers } from "../constants";

type Session = {
	user: IUser | null;
	loading: boolean;
	hasCheckedAuth: boolean;
	isFirstMount: boolean;
	actions: {
		clearSession: () => void;
		updateUser: (data: IUser) => void;
		getSession: (isInitialLoad?: boolean) => Promise<void>;
		fetchFullUserProfile: () => Promise<IUser>;
	};
};

export type SelectorFn<TStore, TResult> = (state: TStore) => TResult;

const initialState = {
	user: null,
	loading: true,
	hasCheckedAuth: false,
	isFirstMount: false,
};

export const useSession = create<Session>()(
	persist(
		(set, get) => ({
			...initialState,
			actions: {
				getSession: async (isInitialLoad = false) => {
					const currentUser = get().user;

					if (isInitialLoad) {
						set({ isFirstMount: true });
					}

					if (!currentUser) {
						set({ loading: true });
					}

					try {
						console.log("🔍 Checking session...");
						const { data, error } = await callApi<any>(`/auth/session`);

						if (error) {
							console.log("🔐 No valid session found");
							set({
								user: null,
								loading: false,
								hasCheckedAuth: true,
							});
							return;
						}

						console.log("📦 Raw API response:", data);

						// TEMPORARY DEBUG - Remove after fixing
						console.log("🔍 FULL RESPONSE STRUCTURE DEBUG:");
						console.log("- data:", data);
						console.log("- data.status:", data?.status);
						console.log("- data.data:", data?.data);
						console.log("- data.data.user:", data?.data?.user);
						console.log("- data.user:", data?.user);
						console.log("- data.message:", data?.message);
						console.log("- typeof data.data:", typeof data?.data);
						console.log("- is data.data an object?", typeof data?.data === 'object');
						console.log("- data.data keys:", data?.data ? Object.keys(data.data) : 'no data');

						let userData = null;

						if (data) {
							// Try ALL possible response structures
							if (data.data?.user) {
								userData = data.data.user;
								console.log("✅ Found user data at: data.data.user");
							} else if (data.user) {
								userData = data.user;
								console.log("✅ Found user data at: data.user");
							} else if (data.data) {
								userData = data.data;
								console.log("✅ Found user data at: data.data");
							} else {
								userData = data;
								console.log("✅ Found user data at: data");
							}
							
							console.log("👤 Final extracted user data:", userData);
						}

						// Check if we have valid user data with _id
						if (userData && userData._id) {
							console.log("✅ Valid user data found with _id:", userData._id);
							set({
								user: userData,
								loading: false,
								hasCheckedAuth: true,
							});
							console.log("🎉 Session loaded successfully!");
						} else if (userData && userData.user && userData.user._id) {
							// Handle double-nested case: { user: { user: { _id: ... } } }
							console.log("✅ Found double-nested user data with _id:", userData.user._id);
							set({
								user: userData.user,
								loading: false,
								hasCheckedAuth: true,
							});
							console.log("🎉 Session loaded successfully!");
						} else {
							console.log("❌ No valid user data found in response. UserData:", userData);
							console.log("❌ userData has _id?", userData?._id);
							console.log("❌ userData has id?", userData?.id);
							console.log("❌ userData keys:", userData ? Object.keys(userData) : 'no userData');
							set({
								user: null,
								loading: false,
								hasCheckedAuth: true,
							});
						}
					} catch (error) {
						console.error("❌ Session check failed:", error);
						set({
							user: null,
							loading: false,
							hasCheckedAuth: true,
						});
					}
				},

				fetchFullUserProfile: async (): Promise<IUser> => {
					const currentUser = get().user;

					if (!currentUser?._id) {
						console.log("❌ No user ID available to fetch profile");
						throw new Error("No user ID available");
					}

					try {
						if (!get().loading) {
							set({ loading: true });
						}
						
						console.log("🔄 Fetching full user profile for:", currentUser._id);

						const { data, error } = await callApi<ApiResponse<IUser>>(`/api/v1/users/${currentUser._id}`);

						if (error) {
							throw new Error(error.message);
						}

						if (data?.data) {
							console.log("✅ Full user profile loaded:", data.data);
							set({
								user: data.data,
								loading: false,
							});
							return data.data;
						} else {
							throw new Error("No user data received");
						}
					} catch (error) {
						console.error("❌ Failed to fetch user profile:", error);
						set({ loading: false });
						throw error;
					}
				},

				updateUser: (data: IUser) => set({ user: data }),

				clearSession: () => {
					const currentState = get();
					const currentPageUrl = typeof window !== "undefined" ? window.location.pathname : "";

					set({
						user: null,
						loading: false,
						hasCheckedAuth: true,
					});

					if (
						currentPageUrl &&
						!innaccessibleByUsers.includes(currentPageUrl) &&
						!currentState.isFirstMount
					) {
						console.log("logging out, redirecting to login page");
						window.location.replace("/signin");
					}
				},
			},
		}),
		{
			name: "session-storage",
			partialize: (state) => ({
				user: state.user,
				hasCheckedAuth: state.hasCheckedAuth,
			}),
			version: 1,
			migrate: (persistedState: any, version: number) => {
				if (version === 0) {
					return { 
						...persistedState, 
						loading: false 
					};
				}
				return persistedState;
			},
		},
	),
);

export const useSessionState = <TResult>(
	selector: SelectorFn<Session, TResult>,
) => {
	return useSession(useShallow(selector));
};