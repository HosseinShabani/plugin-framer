import { QUERY_KEYS } from "@/constants/keys";
import { useAuthStore } from "@/context/auth";
import { IAction } from "@/types/action";
import { HookApiOptions } from "@/types/api";
import { ILicense } from "@/types/license";
import { supabase } from "@/utils/supabase";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

type Parameters = { options?: HookApiOptions; license: ILicense | null };
type Return = { data: IAction[]; sum: number; totalTokens: number };

export const getActionsQueryOptions = ({ options, license }: Parameters) => {
  
  return queryOptions({
    queryKey: [QUERY_KEYS.actions, license?.license as string],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("actions")
        .select("*")
        .eq("license", license?.license as string);
      if (error) {
        throw error;
      }
      // Sum all values
      const sum = data?.reduce((acc, item) => acc + (item.value || 0), 0) ?? 0;
      const totalTokens = (license?.tokens ?? 0) - sum; 
  return {
        data: data ?? [],
        sum,
        totalTokens,
      };
    },
    enabled: !!license?.license,
    staleTime: Infinity,
    ...options,
  });
};

// normal
export const useGetActions = (props: Omit<Parameters, "license">) => {
  const { license: authLicense } = useAuthStore(useShallow((state) => state));
  
  return useQuery<Return>(getActionsQueryOptions({
    ...props,
    license: authLicense,
  }));
};
