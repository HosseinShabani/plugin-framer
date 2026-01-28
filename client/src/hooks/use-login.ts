import { ILicense } from "@/types/license";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

type Response = {
  data: ILicense;
  message: string;
};

export const useLogin = () => {
  return useMutation<Response, Error, { license: string }>({
    mutationFn: async (body) => {
      const { data: dbData, error: dbError } = await supabase
        .from("licenses")
        .select("*")
        .eq("license", body.license)
        .maybeSingle();

      if (dbError) {
        throw dbError;
      }

      if (!dbData) {
        throw new Error("License not found");
      }

      return {
        data: dbData,
        message: "Login Successful",
      };
    },
  });
};
