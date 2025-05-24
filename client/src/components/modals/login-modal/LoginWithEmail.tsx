import { useAuthStore } from "@/context/auth";
import { useShallow } from "zustand/shallow";
import Icon from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { DividerWithText } from "@/components/ui/dividerWithText";

const LoginWithEmail = () => {
  const [email, handleEmail, handleStep] = useAuthStore(
    useShallow((state) => [state.email, state.handleEmail, state.handleStep])
  );

  return (
    <div>
      <div className="focus-within:border-framer-text bg-framer-bg my-2 flex h-9 w-full items-center rounded-lg border border-transparent px-2.75">
        <Icon name="lock" className="size-3.5 stroke-stone-400" />
        <input
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          type="email"
          placeholder="Enter your Email"
          className="h-full w-full border-none bg-transparent px-2 outline-0"
        />
      </div>

      <Button fullWidth className="text-xs" onClick={() => handleStep("enterCode")}>
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
    </div>
  );
};

export default LoginWithEmail;
