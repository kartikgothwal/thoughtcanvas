import { PatchRequestHandler } from "@/axios/PatchRequestHandler";
import { getURL } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useResetPassword = (queryKey: string, token: string) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (data: unknown) =>
      PatchRequestHandler(getURL(queryKey), data, token),
  });
};

export default useResetPassword;
