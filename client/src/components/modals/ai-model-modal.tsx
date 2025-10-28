import { Modal } from "@/components/ui/modal";
import { Icon } from "@/components/ui/Icon";
import { AI_MODELS } from "@/constants/ai";
import { IAiModel } from "@/types/ai-model";
import { Badge } from "@/components/ui/badge";
import { useAiStore } from "@/context/ai";
import { useShallow } from "zustand/shallow";
import { cn } from "@/utils/cn";

const AiModelCard = ({
  model,
  onClick,
}: {
  model: IAiModel;
  onClick: (model: IAiModel) => void;
}) => {
  const { aiModel } = useAiStore(useShallow((state) => state));
  const isSelected = aiModel?.name === model.name;
  return (
    <div
      onClick={() => onClick(model)}
      className="cursor-pointer pb-1 transition-all duration-200 hover:brightness-75"
    >
      <div
        className={cn(
          "h-[162px] w-[135px] overflow-hidden rounded-xl border-[3px] border-transparent",
          isSelected && "border-secondary"
        )}
      >
        <img src={model.img} alt="model" className="h-full w-full object-cover" />
      </div>

      <h4
        className={cn(
          "mt-1.5 text-sm font-medium",
          isSelected ? "text-framer-text" : "text-framer-text/70"
        )}
      >
        {model.name}
      </h4>
      <h5
        className={cn(
          "mt-0.5 mb-2 text-xs font-medium",
          isSelected ? "text-framer-text-tertiary" : "text-framer-text-tertiary/70"
        )}
      >
        {model.firm}
      </h5>
      <div className="flex gap-0.5">
        {model.badges.map((badge, i) => (
          <Badge
            key={badge}
            text={badge}
            color={isSelected ? (i % 2 === 0 ? "primary" : "secondary") : "default"}
          />
        ))}
      </div>
    </div>
  );
};

const AiModelModal = () => {
  const { handleAiModel, toggleModal, showModal } = useAiStore(useShallow((state) => state));

  const handleClick = (model: IAiModel) => {
    handleAiModel(model);
    toggleModal();
  };

  return (
    <Modal show={showModal} onClose={toggleModal}>
      <div className="w-[509px] px-[22px] pt-[22px]">
        <Icon
          onClick={toggleModal}
          name="x"
          className="stroke-framer-text float-right cursor-pointer hover:brightness-50"
        />

        <h3 className="mt-2.5 text-center text-lg font-semibold">Switch Model</h3>
        <div className="no-scroll-bar mt-6 grid max-h-[75dvh] grid-cols-3 gap-5 overflow-y-scroll pb-5">
          {AI_MODELS.map((model) => (
            <AiModelCard key={model.name} model={model} onClick={handleClick} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AiModelModal;
