import { SwitchInput } from "@/components/ui/switch-input";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { useShallow } from "zustand/react/shallow";
const EnhancePromptSwitch = () => {
  const { enhance_prompt, handleEnhancePrompt } = useSeeDream4Store(useShallow((state) => state));

  return (
    <SwitchInput
      helperText="Enhancement for higher quality results, this will take longer to generate."
      label="Enhance Prompt"
      checked={enhance_prompt}
      onChange={handleEnhancePrompt}
    />
  );
};

export default EnhancePromptSwitch;
