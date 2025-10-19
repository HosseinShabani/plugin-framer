import { Modal } from "@/components/ui/modal";
import logo from "@/assets/img/icon.svg";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";

type LoginModalProps = {
  show: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose, show }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-[317px] px-6 py-10">
        <div className="mx-auto mb-5 flex w-[221px] flex-col items-center justify-center">
          <img className="h-[51px] w-[51px] rounded-2xl" src={logo} alt="logo" />

          <h3 className="mt-2 text-center text-xl font-semibold">Welcome to EFEX!</h3>
          <h5 className="text-framer-text/60 text-center text-xs font-medium">
            Enter your license key
          </h5>
        </div>

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

        <div className="mt-7">
          <p className="text-framer-text/60 text-center text-xs font-medium">
            Don't have a license?
          </p>
          <div className="flex cursor-pointer items-baseline justify-center gap-1 hover:underline">
            <p className="text-framer-text mt-1 text-xs font-medium">Get Yours Now</p>
            <Icon name="arrow-up-right" className="size-2 stroke-framer-text/70" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
