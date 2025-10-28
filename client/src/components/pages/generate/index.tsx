import GiftSection from "@/components/pages/generate/gift-section";
import UserPromptInput from "@/components/user-prompt-input";
import LogoTitle from "./logo-title";
import AiModelModal from "@/components/modals/ai-model-modal";
import { useShallow } from "zustand/shallow";
import { useAiStore } from "@/context/ai";
import { AI_MODEL_COMPONENTS } from "@/constants/ai";

const GeneratePage = () => {
  const { aiModel } = useAiStore(useShallow((state) => state));

  const Component = AI_MODEL_COMPONENTS[aiModel.name];

  return (
    <>
      <AiModelModal />

      <div className="pb-14">
        <LogoTitle />
        <GiftSection />
        <UserPromptInput />

        {/* ai model */}
        <div className="mt-[28px]" />
        <Component />
      </div>
    </>
  );
};

export default GeneratePage;
