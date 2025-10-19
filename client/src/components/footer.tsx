import { numberWithCommasEn } from "@/utils/number-with-commas-en";
import { Button } from "./ui/button";
import { Dropdown, DropdownTriggerButton } from "./ui/dropdown";
import { Icon } from "./ui/Icon";
import LoginModal from "./modals/login-modal";
import { useAuthStore } from "@/context/auth";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "@/context/app";
import { cn } from "@/utils/cn";

const SECTION_ITEMS = [
  {
    id: 1,
    icon: <Icon name="magic-wand" className="size-4 fill-current" />,
  },
  {
    id: 2,
    icon: <Icon name="grid" className="size-4 fill-current" />,
  },
  {
    id: 3,
    icon: <Icon name="bookmark-filled" className="size-4 fill-current" />,
  },
];

const AppSections = () => {
  const [sectionId, handleSection] = useAppStore(
    useShallow((state) => [state.sectionId, state.handleSection])
  );
  return (
    <div className="bg-framer-bg-tertiary border-framer-text-tertiary/50 flex h-12.5 w-[132px] items-center justify-around gap-2 rounded-4xl border px-2">
      {SECTION_ITEMS.map((item) => {
        return (
          <div
            key={item.id}
            className={cn(
              "h-8 w-8 cursor-pointer place-content-center place-items-center rounded-full transition-all duration-500",
              item.id === sectionId ? "bg-framer-text-tertiary" : "text-framer-text-tertiary"
            )}
            onClick={() => handleSection(item.id)}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
};

const UserActions = () => {
  const [isLoggedIn] = useAuthStore(useShallow((state) => [state.isLoggedIn]));

  const [showModal, setShowModal] = useState("");

  const closeModal = () => {
    setShowModal("");
  };

  const handleLoginModal = () => {
    setShowModal("login");
  };

  if (!isLoggedIn) {
    return (
      <>
        <Button
          variant="outlined"
          color="gray"
          className="z-30 h-12.5 w-[124px] select-none"
          leftIcon={<Icon name="user-filled" className="fill-framer-text/60 size-4" />}
          rightIcon={<Icon name="chevron-up" className="stroke-framer-text size-2" />}
          onClick={handleLoginModal}
        >
          Login
        </Button>

        <LoginModal show={showModal === "login"} onClose={closeModal} />
      </>
    );
  }

  return (
    <Dropdown
      side="top"
      offset={8}
      align="center"
      trigger={(isOpen) => {
        return (
          <DropdownTriggerButton
            isOpen={isOpen}
            className="h-12.5 w-[130px] select-none"
            leftIcon={<Icon name="user-filled" className="size-4 fill-stone-400" />}
            rightIcon={<Icon name="chevron-up" className="size-2 stroke-current" />}
          >
            <div className="flex items-center">
              <Icon name="magic-wand" className="size-3 fill-current" />

              <span className="ml-1 text-sm font-semibold">{numberWithCommasEn(1000)}</span>
            </div>
          </DropdownTriggerButton>
        );
      }}
    >
      {(_toggleDropdown) => (
        <div className="grid w-[157px] py-3.5">
          <div className="mb-2 flex flex-col">
            <span className="text-framer-text/70 px-3.5 text-[10px] font-medium">Plugin</span>

            <Button
              variant="ghost"
              color="gray"
              fullWidth
              leftIcon={<Icon name="headphone" className="stroke-framer-text size-3" />}
              rightIcon={
                <Icon name="arrow-up-right" className="stroke-framer-text ml-auto size-2" />
              }
              className="h-6 rounded-none text-xs font-medium"
            >
              Support
            </Button>

            <Button
              variant="ghost"
              color="gray"
              fullWidth
              leftIcon={<Icon name="magic-wand" className="fill-framer-text size-3" />}
              className="h-6 justify-start rounded-none text-xs font-medium"
            >
              More Credit
            </Button>
          </div>

          <div className="mt-1 flex flex-col">
            <span className="text-framer-text/70 px-3.5 text-[10px] font-medium">Account</span>

            <Button
              variant="ghost"
              color="gray"
              fullWidth
              leftIcon={<Icon name="logout" className="stroke-framer-text size-3" />}
              className="h-6 justify-start rounded-none text-xs font-medium"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </Dropdown>
  );
};

const Footer = () => {
  return (
    <div className="mt-auto flex items-center justify-center gap-1">
      <AppSections />
      <UserActions />
    </div>
  );
};

export default Footer;
