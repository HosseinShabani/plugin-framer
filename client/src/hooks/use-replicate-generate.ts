import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

// export const useReplicateGenerate = () => {
//   return useMutation({
//     mutationFn: (body: { modelName: string; input: any }) => {
//       return fetch(`http://localhost:3000/api/generate/gen-fake`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });
//     },
//   });
// };

export const useReplicateGenerate = () => {
  return useMutation({
    mutationFn: async (
      body: { modelName: string; input: any; license: string; value: number },
    ) => {
      const response = await supabase.functions.invoke("hello", {
        body: body,
      });
      if (response.error) {
        return response.error;
      }
      return response.data;
    },
  });
};
