import { PatchRequestHandler } from "@/axios/PatchRequestHandler";
import { getURL } from "@/utils";
import { getCookies } from "@/utils/Cookies";
import { useMutation } from "@tanstack/react-query";

const useResetPassword = (queryKey: string) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: async (data: unknown) =>
      PatchRequestHandler(getURL(queryKey), data, await getCookies("token")),
  });
};

export default useResetPassword;
