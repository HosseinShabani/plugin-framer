import { useAppStore } from "@/context/app";
import { useImageConfigStore } from "@/context/image-config";
import { useImageStore } from "@/context/images";
import { useShallow } from "zustand/shallow";
import { Icon } from "./ui/Icon";
import { Button } from "./ui/button";
import { supabase } from "@/utils/supabase";

const UserPromptInput = () => {
  const [text, style, go_fast, num_outputs, aspect_ratio, format, handleText] = useImageConfigStore(
    useShallow((state) => [
      state.text,
      state.style,
      state.go_fast,
      state.num_outputs,
      state.aspect_ratio,
      state.output_format,
      state.handleText,
    ])
  );
  const [toggleLoading, handleError] = useAppStore(
    useShallow((state) => [state.toggleLoading, state.handleError])
  );
  const [handleImages] = useImageStore(useShallow((state) => [state.handleImages]));

  const handleGenerate = async () => {
    toggleLoading();
    handleError("");

    try {
      // const res = await supabase.from("images").select("*");
      // console.log(res);

      let data = new FormData();
      data.append("user_prompt", text);
      data.append("style", style);
      data.append("go_fast", String(go_fast));
      data.append("aspect_ratio", aspect_ratio);
      data.append("output_format", format);
      data.append("output_quality", "80");
      data.append("num_outputs", String(num_outputs));

      const res = await supabase.functions.invoke("clever-task", {
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      // const res = await supabase.functions.invoke("hello-farnood", {
      //   body: { name: "farnood" },
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "POST",
      // });
      // console.log(res);
    } catch (err) {
      handleError(err instanceof Error ? err.message : "Failed to generate images");
    } finally {
      toggleLoading();
    }
  };

  return (
    <div className="bg-framer-text/15 relative mt-2 min-h-14 w-full rounded-2xl p-1 transition-all duration-200 focus-within:bg-[linear-gradient(91.83deg,rgba(248,109,190,0.49)_5.83%,rgba(156,56,236,0.49)_44.85%,rgba(83,100,231,0.49)_77.37%,rgba(230,67,46,0.49)_98.87%)]">
      <div className="bg-framer-bg-tertiary flex h-full w-full items-center rounded-xl pr-2 pl-[11px]">
        <Icon name="image-add" className="stroke-framer-text/50 min-h-4 min-w-4" />
        <input
          type="text"
          placeholder="Imagine something. Anything..."
          className="h-full w-full border-none px-2 outline-0"
          onChange={(e) => handleText(e.target.value)}
          value={text}
        />

        <Button
          leftIcon={!text ? <Icon name="magic-wand" className="size-3 fill-current" /> : null}
          rightIcon={
            text ? (
              <div className="bg-primary-900 flex h-6 items-center justify-center gap-0.5 rounded-[38px] px-1.5 text-[10px]">
                <Icon name="magic-wand" className="fill-primary-300 size-[10px]" />
                25
              </div>
            ) : null
          }
          disabled={!text}
          onClick={handleGenerate}
          className="h-8 gap-1 rounded-[46px] pr-1 pl-2.5 text-xs font-semibold"
          color={!!text ? "primary" : "gray"}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default UserPromptInput;
