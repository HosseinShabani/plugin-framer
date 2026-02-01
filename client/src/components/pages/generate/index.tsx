import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LogoTitle from "./logo-title";
import GiftSection from "./gift-section";
import UserPromptInput from "./user-prompt-input";
import { Icon } from "@/components/icon";
import ChooseAiModal from "@/components/modals/choose-ai-modal";
import { useGetAiModels } from "@/hooks/use-get-ai-models";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormInputs } from "@/components/form";
import { useShallow } from "zustand/shallow";
import { useAiModalStore } from "@/context/ai-modal";
import LoadingSkeleton from "./loading-skeleton";
import { useEffect } from "react";
import { AIModel } from "@/types/ai-model";
import { useReplicateGenerate } from "@/hooks/use-replicate-generate";
import { useAuthStore } from "@/context/auth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/keys";

const removeEmptyFields = (data: FieldValues): FieldValues => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== ""),
  );
};

const GeneratePage = () => {
  const queryClient = useQueryClient();
  const { ai, setAi, toggle } = useAiModalStore(useShallow((state) => state));
  const { license } = useAuthStore(useShallow((state) => state));

  const { data, isSuccess } = useGetAiModels({});
  const replicateGenerateMutation = useReplicateGenerate();

  useEffect(() => {
    if (!isSuccess) return;

    let selectedAi: AIModel | null;

    if (!ai || !data.some((item) => item.id === ai?.id)) {
      selectedAi = data[0];
    } else {
      selectedAi = data.find((model) => model.id === ai.id) ?? null;
    }

    if (!selectedAi) return;

    if (ai?.id !== selectedAi.id) {
      setAi(selectedAi);
    }
  }, [isSuccess, data, ai?.id]);

  const form = useForm({
    values: {
      ...ai?.default_values,
    },
  });

  const value = Math.floor(Math.random() * (19 - 8 + 1) + 8)

  const onSubmit = (data: FieldValues) => {
    const filteredData = removeEmptyFields(data);
    if (!license?.license) {
      toast.error("Please login to generate");
      return;
    }
    if (!ai?.name) {
      toast.error("Please select an AI model");
      return;
    }

    replicateGenerateMutation.mutate(
      {
        modelName: ai.name,
        input: filteredData,
        license: license?.license,
        value: value,
      },
      {
        onSuccess: (_res) => {
          // console.log(res);
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.actions] });
          // res.json().then((result) => {
          //   console.log(result);
          // });
        },
      },
    );
  };

  if (!isSuccess) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <ChooseAiModal />

      <div className="">
        <LogoTitle />
        <GiftSection />

        {ai && !!Object.keys(ai).length
          ? (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6">
                <UserPromptInput form={form} />

                <FormInputs inputs={ai.inputs.fields} form={form} />

                {ai.advance.fields.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="advance-settings">
                      <hr className="border-framer-text/20" />
                      <AccordionTrigger>
                        <span className="text-framer-text-secondary text-sm font-medium">
                          Advance Setting
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <FormInputs
                          inputs={ai.advance.fields}
                          form={form}
                        />
                      </AccordionContent>
                      <hr className="border-framer-text/20" />
                    </AccordionItem>
                  </Accordion>
                )}
              </div>

              <div className="mt-10 flex">
                <Button
                  size="lg"
                  // disabled={!form.watch(ai.prompt.name)}
                  className="gap-1"
                  fullWidth
                  type="submit"
                  loading={replicateGenerateMutation.isPending}
                >
                  <Icon
                    name="magic-wand"
                    className="fill-primary-foreground size-2.5"
                  />
                  <span>Generate</span>
                </Button>
              </div>

              <div className="flex justify-end">
                <div className="bg-framer-bg-secondary mt-3.5 flex items-center gap-1 rounded-full px-2 py-0.5">
                  <Icon
                    name="magic-wand"
                    className="fill-secondary size-2.5"
                  />
                  <span>{value} credits will be charged</span>
                </div>
              </div>
            </form>
          )
          : (
            <Button
              variant="contained"
              type="button"
              onClick={toggle}
              color="primary"
              fullWidth
            >
              Select AI
            </Button>
          )}
      </div>
    </>
  );
};

export default GeneratePage;
