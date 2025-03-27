import { PatchRequestHandler } from "@/axios/PatchRequestHandler";
import { getURL } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useResetPassword = (queryKey: string) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: unknown) => PatchRequestHandler(getURL(queryKey), data),
  });
};

export default useResetPassword;
