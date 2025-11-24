/* eslint-disable @typescript-eslint/no-namespace */
import { callApi } from "../libs/helper/callApi";
import { ApiResponse, IListing, PaginatedData } from "../types";

export namespace Listing {
  export const getAllListing = (params?: Record<string, unknown>) => {
    const queryString = params
      ? new URLSearchParams(
          params as unknown as Record<string, string>
        ).toString()
      : "";

    return callApi<ApiResponse<PaginatedData<IListing>>>(
      `/api/v1/listing?${queryString}`
    );
  };
}
