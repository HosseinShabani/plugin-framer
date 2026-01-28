import { useAiModalStore } from "@/context/ai-modal";

import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useShallow } from "zustand/shallow";
import { useGetAiModels } from "@/hooks/use-get-ai-models";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { cn } from "@/utils/cn";
import { AIModel } from "@/types/ai-model";

const LoadingSkeleton = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <div key={index}>
      <Skeleton
        className="mb-1.5 h-[162px] w-full"
        style={{
          animationDelay: `-${index * 1200}ms`,
        }}
      />
      <Skeleton
        className="mb-0.5 h-[20px] w-[100px]"
        style={{
          animationDelay: `-${index * 1000}ms`,
        }}
      />
      <Skeleton
        className="mb-1.5 h-[15px] w-[40px]"
        style={{
          animationDelay: `-${index * 1000}ms`,
        }}
      />

      <Skeleton
        className="h-4 w-full"
        style={{
          animationDelay: `-${index * 1500}ms`,
        }}
      />
    </div>
  ));
};

const AiCard = ({ model }: { model: AIModel }) => {
  const { toggle, setAi, ai } = useAiModalStore(useShallow((state) => state));

  const selected = ai?.id === model.id;

  const handleClick = () => {
    setAi(model);
    toggle();
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div
        className={cn(
          "mb-1.5 h-[162px] w-full overflow-hidden rounded-lg",
          selected && "border-secondary border-[3px]"
        )}
      >
        <img
          src={model.image}
          alt={`${model.title} image`}
          className="h-full w-full object-cover transition-all duration-300 bg-framer-bg-tertiary/20 group-hover:scale-105"
        />
      </div>
      <div
        className={cn(
          "mb-0.5 text-sm",
          selected ? "text-framer-text font-semibold" : "text-framer-text-secondary font-medium"
        )}
      >
        {model.title}
      </div>
      <div
        className={cn(
          "mb-1.5 text-xs",
          selected
            ? "text-framer-text-secondary font-semibold"
            : "text-framer-text-tertiary font-medium"
        )}
      >
        {model.firm}
      </div>
      <div className="flex flex-wrap gap-0.5">
        {model.tags.map((tag, i) => (
          <Badge key={tag} color={selected ? (i % 2 === 0 ? "primary" : "secondary") : "gray"}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const ChooseAiModal: React.FC = () => {
  const { show, toggle } = useAiModalStore(useShallow((state) => state));

  const { data, isSuccess } = useGetAiModels({});

  return (
    <Dialog open={show} onOpenChange={toggle}>
      <DialogContent className="max-w-[510px] border-none">
        <DialogHeader className="my-5">
          <DialogTitle>Switch Model</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70dvh]">
          <div className="grid grid-cols-3 gap-5">
            {isSuccess ? (
              <>{data?.map((model) => <AiCard key={model.id} model={model} />)}</>
            ) : (
              <LoadingSkeleton />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseAiModal;
