import { useLogin } from "@/hooks/use-login";
import { Icon } from "../icon";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import logo from "@/assets/img/icon.svg";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/context/auth";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";
import { PAGE_URL } from "@/constants/page-url";

type Props = {
  show: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<Props> = ({ onClose, show }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const { handleLicense } = useAuthStore(useShallow((state) => state));

  const handleGetLicense = () => {
    window.open(import.meta.env.VITE_API_LEMON_CHECKOUT, "_blank");
  };

  const loginMutation = useLogin();

  const handleLogin = () => {
    loginMutation.mutate(
      { license: text },
      {
        onSuccess: (res) => {
          handleLicense(res.data);
          toast.success("Login Successful");
          navigate(PAGE_URL.GENERATE);
          onClose();
          setText("");
        },
        onError: (error) => {
          console.log(error);
          toast.error("Invalid license key");
        },
      },
    );
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[350px] border-none"
      >
        <DialogHeader>
          <DialogTitle>
            <div className="mx-auto mb-5 flex w-[221px] flex-col items-center justify-center">
              <img
                className="h-[51px] w-[51px] rounded-2xl"
                src={logo}
                alt="logo"
              />

              <h3 className="mt-2 text-center text-xl font-semibold">
                Welcome to EFEX!
              </h3>
              <h5 className="text-framer-text/60 text-center text-xs font-medium">
                Enter your license key
              </h5>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70dvh]">
          <div className="focus-within:border-framer-text bg-framer-bg my-2 flex h-9 w-full items-center rounded-lg border border-transparent px-2.75">
            <Icon name="lock" className="size-3.5 stroke-stone-400" />
            <input
              type="text"
              placeholder="Enter your license key"
              className="h-full w-full border-none bg-transparent px-2 outline-0"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <Button
            onClick={handleLogin}
            loading={loginMutation.isPending}
            fullWidth
            className="text-xs"
            disabled={!text}
          >
            Login
          </Button>

          <div className="mt-7">
            <p className="text-framer-text/60 text-center text-xs font-medium">
              Don't have a license?
            </p>
            <div
              onClick={handleGetLicense}
              className="flex cursor-pointer items-baseline justify-center gap-1 hover:underline"
            >
              <p className="text-framer-text mt-1 text-xs font-medium">
                Get Yours Now
              </p>
              <Icon
                name="arrow-up-right"
                className="stroke-framer-text/70 size-2"
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
