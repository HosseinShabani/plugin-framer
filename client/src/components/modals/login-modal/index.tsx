import Modal from "@/components/ui/modal";
import Tabs from "@/components/ui/tabs";
import logo from "@/assets/img/icon.svg";
import LoginWithEmail from "./LoginWithEmail";
import LoginWithLicense from "./LoginWithLicense";
import { useAuthStore } from "@/context/auth";
import { useShallow } from "zustand/shallow";
import EnterCode from "./EnterCode";

type LoginModalProps = {
  show: boolean;
  onClose: () => void;
};

const tabs = [
  {
    label: "License Key",
    content: <LoginWithLicense />,
  },
  {
    label: "Email",
    content: <LoginWithEmail />,
  },
];

const LoginModal: React.FC<LoginModalProps> = ({ onClose, show }) => {
  const [step] = useAuthStore(useShallow((state) => [state.step]));

  return (
    <Modal show={show} onClose={onClose}>
      {step === "method" ? (
        <div className="w-[317px] px-6 py-10">
          <div className="mx-auto flex w-[221px] flex-col items-center justify-center">
            <img className="h-[51px] w-[51px] rounded-2xl" src={logo} alt="logo" />

            <h3 className="mt-2 text-center text-xl font-semibold">Welcome to EFEX!</h3>
            <h5 className="text-framer-text-tertiary text-center text-xs font-medium">
              Enter your license key or email to login
            </h5>
          </div>

          <Tabs className="mt-5" tabs={tabs} />
        </div>
      ) : (
        <div className="w-[317px]">
          <EnterCode />
        </div>
      )}
    </Modal>
  );
};

export default LoginModal;
