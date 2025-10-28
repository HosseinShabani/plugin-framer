import { Button } from "./ui/button";
import { Icon } from "./ui/Icon";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useAiStore } from "@/context/ai";

const UserPromptInput = () => {
  const { aiModel, toggleModal } = useAiStore(useShallow((state) => state));
  const [text, setText] = useState("");

  const handleText = (text: string) => {
    setText(text);
  };

  return (
    <div className="bg-framer-text-tertiary/50 relative h-[114px] w-full rounded-[14px] p-[1.5px] transition-all duration-200 focus-within:bg-[linear-gradient(91.83deg,rgba(248,109,190,0.49)_5.83%,rgba(156,56,236,0.49)_44.85%,rgba(83,100,231,0.49)_77.37%,rgba(230,67,46,0.49)_98.87%)]">
      <div className="bg-framer-bg-tertiary flex h-full w-full items-center rounded-xl px-3.5 pt-2 pb-11">
        <textarea
          placeholder="e.g. A cat is sitting on a table eating fish meet. We support all languages."
          className="scrollArea h-full w-full resize-none border-none outline-0"
          onChange={(e) => handleText(e.target.value)}
          value={text}
          rows={5}
        />

        <div className="absolute bottom-3 left-3.5">
          <Button
            variant="outlined"
            rightIcon={<Icon name="chevron-down" className="stroke-framer-text size-2" />}
            className="h-[28px] text-sm"
            color="gray"
            onClick={toggleModal}
          >
            {aiModel?.name}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPromptInput;
