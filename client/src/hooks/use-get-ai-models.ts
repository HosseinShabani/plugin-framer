import { QUERY_KEYS } from "@/constants/keys";
import { AIModel } from "@/types/ai-model";
import { HookApiOptions } from "@/types/api";
import { supabase } from "@/utils/supabase";
import { queryOptions, useQuery } from "@tanstack/react-query";

type Parameters = { options?: HookApiOptions };

export const getAiModelsQueryOptions = ({ options }: Parameters) => {
  return queryOptions({
    queryKey: [QUERY_KEYS.aiModels],
    queryFn: async () => {
      const { data, error } = await supabase.from("ai model").select("*");
      if (error) {
        throw error;
      }
      return data;
    },
    staleTime: Infinity,
    ...options,
  });
};

// normal
export const useGetAiModels = (props: Parameters) => {
  return useQuery<AIModel[]>(getAiModelsQueryOptions(props));
};
