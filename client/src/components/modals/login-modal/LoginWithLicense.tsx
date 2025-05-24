import { Button } from "@/components/ui/button";
import { DividerWithText } from "@/components/ui/dividerWithText";
import Icon from "@/components/ui/Icon";

const LoginWithLicense = () => {
  return (
    <div>
      <div className="focus-within:border-framer-text bg-framer-bg my-2 flex h-9 w-full items-center rounded-lg border border-transparent px-2.75">
        <Icon name="lock" className="size-3.5 stroke-stone-400" />
        <input
          type="text"
          placeholder="Enter your license key"
          className="h-full w-full border-none bg-transparent px-2 outline-0"
        />
      </div>

      <Button fullWidth className="text-xs">
        Login
      </Button>

      <DividerWithText text="Or" className="mt-4 mb-2.5" />

      <Button
        color="gray"
        fullWidth
        className="text-xs font-semibold"
        leftIcon={<Icon name="google" className="size-3.5" />}
      >
        Sign in with Google
      </Button>

      <div className="mt-7">
        <p className="text-framer-text-tertiary text-center text-xs font-medium">
          Don't have a license?
        </p>
        <div className="flex cursor-pointer items-baseline justify-center gap-1 hover:underline">
          <p className="text-framer-text mt-1 text-xs font-medium">Get Yours Now</p>
          <Icon name="arrow-up-right" className="size-2 stroke-white" />
        </div>
      </div>
    </div>
  );
};

export default LoginWithLicense;
