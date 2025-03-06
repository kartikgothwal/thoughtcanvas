"use client";
import { GetRequestHandler } from "@/axios/GetRequestHandler";
import { PatchRequestHandler } from "@/axios/PatchRequestHandler";
import { PostRequestHandler } from "@/axios/PostRequestHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useGetQueries = (queryKey: string, endpoint: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => GetRequestHandler(endpoint),
  });
};

export const useMutationQueries = (queryKey: string, endpoint: string) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: unknown) => PostRequestHandler(endpoint, data),
  });
};

export const usePatchMutationQueries = (queryKey: string, endpoint: string) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: unknown) => PatchRequestHandler(endpoint, data),
  });
};
