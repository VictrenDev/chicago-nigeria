import { Listing } from "@/app/services";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useListing = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["marketplace-posts"],
    queryFn: async () => await Listing.getAllListing(),
    initialPageParam: 0,
    getNextPageParam: (data) =>
      data && data?.data?.data?.meta?.page! < data?.data?.data?.meta.totalPages!
        ? data?.data?.data?.meta?.page! + 1
        : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  };
};
