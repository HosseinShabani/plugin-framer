import { Button } from "./button";
import { Icon } from "./Icon";

type Props = {
  credits: number;
};

export const GenerateButton = ({ credits }: Props) => {
  return (
    <div className="flex grow flex-col gap-3.5">
      <Button
        variant="contained"
        leftIcon={<Icon name="magic-wand" className="fill-current" />}
        color="primary"
        className="h-12 grow"
      >
        Generate
      </Button>
      <div className="bg-framer-text-tertiary/30 ml-auto flex h-[27px] w-fit items-center gap-1 rounded-3xl px-2 text-xs font-semibold">
        <Icon name="magic-wand" className="fill-secondary size-2.5" />
        {Math.round(credits)} credits will be charged
      </div>
    </div>
  );
};
