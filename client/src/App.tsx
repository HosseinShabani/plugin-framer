import { framer } from "framer-plugin";
import logo from "@/assets/img/icon.svg";
import realisticImg from "@/assets/img/realistic-image.webp";
import giftImg from "@/assets/img/gift.svg";
import { useState } from "react";
import { cn } from "./utils/cn";
import { IMAGE_STYLES } from "./constants/image-styles";
import { Dropdown, DropdownTriggerButton } from "./components/ui/dropdown";
import { ORIENTATIONS } from "./constants/orientation";
import { numberWithCommasEn } from "./utils/numberWithCommasEn";
import { ASPECT_RATIO } from "./constants/aspect-ratio";
import { IMAGE_SPEED } from "./constants/image-speed";
import { OUTPUT_FORMAT } from "./constants/output-format";
import { IMAGE_COUNT } from "./constants/image-count";
import { useShallow } from "zustand/shallow";
import { useImageConfigStore } from "./context/image-config";
import { useAppStore } from "./context/app";
import { generateImagesWithoutAnalysis } from "./services/apiService";
import { useImageStore } from "./context/images";
import { SortedImageGallery } from "./components/SortedImageGallery";
import Icon from "./components/ui/Icon";
import { Button } from "./components/ui/button";
import LoginModal from "./components/modals/login-modal";
import { useAuthStore } from "./context/auth";
import EditProfileModal from "./components/modals/EditProfileModal";

framer.showUI({
  position: "top right",
  width: 430,
  height: 621,
});

const LogoTitle = () => {
  const [images] = useImageStore(useShallow((state) => [state.images]));

  if (images.length) {
    return;
  }

  return (
    <div className="mt-14 mb-3 flex flex-col items-center justify-center gap-2">
      <img
        className="h-[73px] w-[73px] rounded-2xl shadow-[_-27.26px_5.93px_80.6px_11.85px_rgba(7,33,151,0.8)]"
        src={logo}
        alt="logo"
      />

      <h3 className="text-center text-2xl font-semibold">
        Imagine something. <br /> Anything...
      </h3>
    </div>
  );
};

const ImageStyles = () => {
  const [style, handleStyle] = useImageConfigStore(
    useShallow((state) => [state.style, state.handleStyle])
  );

  return (
    <>
      <span className="text-[10px] font-medium text-[#8B8B8B]">Styles:</span>

      <div className="scrollArea mt-2.5 flex w-full flex-nowrap gap-2 overflow-x-auto pb-1 text-nowrap">
        {IMAGE_STYLES.map((st) => {
          return (
            <div
              key={st}
              className={cn(
                "cursor-pointer items-center justify-center rounded-md p-1 select-none",
                st === style
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "text-[#8B8B8B]"
              )}
              onClick={() => handleStyle(st)}
            >
              <div className="h-10 w-[66px]">
                <img
                  className="border-framer-text-tertiary h-full w-full rounded-lg border"
                  src={realisticImg}
                  alt={st}
                />
              </div>

              <span className="text-[10px] font-medium">{st}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ImageAspectRatio = () => {
  const [aspect_ratio, handleAspectRatio] = useImageConfigStore(
    useShallow((state) => [state.aspect_ratio, state.handleAspectRatio])
  );

  return (
    <>
      <span className="text-[10px] font-medium text-[#8B8B8B]">Aspect Ratio:</span>

      <div className="mt-2.5 grid grid-cols-8 gap-2">
        {ASPECT_RATIO.map((ar) => {
          return (
            <div
              key={ar}
              className={cn(
                "flex h-7 w-7 cursor-pointer items-center justify-center rounded-md",
                ar === aspect_ratio
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-[#8B8B8B]"
              )}
              onClick={() => handleAspectRatio(ar)}
            >
              <span className="text-[10px] font-medium">{ar}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ImageSpeed = () => {
  const [go_fast, handleGoFast] = useImageConfigStore(
    useShallow((state) => [state.go_fast, state.handleGoFast])
  );

  return (
    <>
      <span className="text-[10px] font-medium text-[#8B8B8B]">Speed:</span>

      <div className="mt-2.5 grid grid-cols-4 gap-4">
        {IMAGE_SPEED.map((sp) => {
          return (
            <div
              key={sp.title}
              className={cn(
                "flex h-7 w-full cursor-pointer items-center justify-center rounded-md",
                sp.value === go_fast
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-[#8B8B8B]"
              )}
              onClick={() => handleGoFast(sp.value)}
            >
              <span className="text-[12px] font-medium">{sp.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ImageOutputFormat = () => {
  const [format, handleOutPutFormat] = useImageConfigStore(
    useShallow((state) => [state.output_format, state.handleOutPutFormat])
  );

  return (
    <>
      <span className="text-[10px] font-medium text-[#8B8B8B]">Output Format:</span>

      <div className="mt-2.5 grid grid-cols-4 gap-4">
        {OUTPUT_FORMAT.map((fmt) => {
          return (
            <div
              key={fmt}
              className={cn(
                "flex h-7 w-full cursor-pointer items-center justify-center rounded-md",
                fmt === format
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-[#8B8B8B]"
              )}
              onClick={() => handleOutPutFormat(fmt)}
            >
              <span className="text-[12px] font-medium">{fmt}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ImageNumber = () => {
  const [number, handleNumOutPut] = useImageConfigStore(
    useShallow((state) => [state.num_outputs, state.handleNumOutPut])
  );

  return (
    <>
      <span className="text-[10px] font-medium text-[#8B8B8B]">Number of Images:</span>

      <div className="mt-2.5 grid grid-cols-4 gap-4">
        {IMAGE_COUNT.map((count) => {
          return (
            <div
              key={count}
              className={cn(
                "flex h-7 w-full cursor-pointer items-center justify-center rounded-md",
                count === number
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-[#8B8B8B]"
              )}
              onClick={() => handleNumOutPut(count)}
            >
              <span className="text-[12px] font-medium">{count}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ImageOrientation = () => {
  const [orientation, setOrientation] = useState(ORIENTATIONS[0].title);

  const handleOrientationClick = (title: string) => {
    setOrientation(title);
  };

  return (
    <>
      <span className="text-[10px] font-medium text-[#8B8B8B]">Orientation:</span>

      <div className="mt-2.5 flex w-full flex-nowrap gap-2 overflow-x-auto text-nowrap">
        {ORIENTATIONS.map((orient) => {
          return (
            <div
              key={orient.title}
              onClick={() => handleOrientationClick(orient.title)}
              className={cn(
                "flex min-w-12 cursor-pointer items-center gap-1 rounded-4xl p-2.5 text-center",
                orient.title === orientation
                  ? "bg-framer-text-secondary/20 text-framer-text"
                  : "bg-framer-bg text-[#8B8B8B]"
              )}
            >
              {!!orient.classname && <div className={cn("rounded-xs border", orient.classname)} />}
              <span className="m-auto text-[10px] font-medium">{orient.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

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
    <div className="bg-framer-bg-secondary flex h-12.5 w-[132px] items-center justify-around gap-2 rounded-4xl px-2">
      {SECTION_ITEMS.map((item) => {
        return (
          <div
            key={item.id}
            className={cn(
              "h-8 w-8 cursor-pointer place-content-center place-items-center rounded-full",
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

const UserSection = () => {
  const [isLoggedIn] = useAuthStore(useShallow((state) => [state.isLoggedIn]));

  const [showModal, setShowModal] = useState("");

  const closeModal = () => {
    setShowModal("");
  };

  const handleLoginModal = () => {
    setShowModal("login");
  };
  const handleEditProfileModal = () => {
    setShowModal("editProfile");
  };

  if (!isLoggedIn) {
    return (
      <>
        <Button
          variant="contained"
          color="gray"
          className="z-30 h-12.5 w-[124px] select-none"
          leftIcon={<Icon name="user-filled" className="size-4 fill-stone-400" />}
          rightIcon={<Icon name="chevron-up" className="size-2 stroke-current" />}
          onClick={handleLoginModal}
        >
          Login
        </Button>

        <LoginModal show={showModal === "login"} onClose={closeModal} />
      </>
    );
  }

  return (
    <>
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
        {(toggleDropdown) => (
          <div className="grid w-[157px] py-3.5">
            <div className="mb-2 flex flex-col gap-1">
              <span className="text-framer-text-tertiary px-3.5 text-[10px] font-medium">
                Plugin
              </span>

              <Button
                variant="ghost"
                color="gray"
                fullWidth
                leftIcon={<Icon name="headphone" className="size-3 stroke-white" />}
                rightIcon={<Icon name="arrow-up-right" className="ml-auto size-2 stroke-white" />}
                className="h-6 rounded-none text-xs font-medium"
              >
                Support
              </Button>

              <Button
                variant="ghost"
                color="gray"
                fullWidth
                leftIcon={<Icon name="magic-wand" className="size-3 fill-white" />}
                className="h-6 justify-start rounded-none text-xs font-medium"
              >
                More Credit
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-framer-text-tertiary px-3.5 text-[10px] font-medium">
                Account
              </span>

              <Button
                variant="ghost"
                color="gray"
                fullWidth
                leftIcon={<Icon name="gear" className="size-3 stroke-white" />}
                className="h-6 justify-start rounded-none text-xs font-medium"
                onClick={() => {
                  handleEditProfileModal();
                  toggleDropdown();
                }}
              >
                Edit Profile
              </Button>

              <Button
                variant="ghost"
                color="gray"
                fullWidth
                leftIcon={<Icon name="logout" className="size-3 stroke-white" />}
                className="h-6 justify-start rounded-none text-xs font-medium"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </Dropdown>

      <EditProfileModal show={showModal === "editProfile"} onClose={closeModal} />
    </>
  );
};

const UserTextInputSection = () => {
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
      const images = await generateImagesWithoutAnalysis(
        text,
        style,
        go_fast,
        "1", // megapixels,
        num_outputs,
        aspect_ratio,
        format
      );

      // Save images to local storage
      handleImages(images);
    } catch (err) {
      handleError(err instanceof Error ? err.message : "Failed to generate images");
    } finally {
      toggleLoading();
    }
  };

  return (
    <div className="relative mt-2 h-13 w-full rounded-xl bg-[#FFFFFF26] p-1 transition-all duration-200 focus-within:bg-[linear-gradient(91.83deg,rgba(248,109,190,0.49)_5.83%,rgba(156,56,236,0.49)_44.85%,rgba(83,100,231,0.49)_77.37%,rgba(230,67,46,0.49)_98.87%)]">
      <div className="bg-framer-bg-secondary flex h-full w-full items-center rounded-lg px-2.75">
        <Icon name="image-add" className="size-6 stroke-stone-400" />
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
              <div className="flex h-6 w-9 items-center justify-center gap-0.5 rounded-4xl bg-[#14143A]">
                <Icon name="magic-wand" className="fill-primary-300 size-3" />
                25
              </div>
            ) : null
          }
          disabled={!text}
          onClick={handleGenerate}
          className="h-8 gap-0.5 px-1 text-xs font-semibold"
          color={!!text ? "primary" : "gray"}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

const GiftSection = () => {
  const [images] = useImageStore(useShallow((state) => [state.images]));

  if (images.length) {
    return;
  }
  return (
    <div className="bg-primary-400 hover:bg-primary-900 z-20 mt-2 flex h-[58px] cursor-pointer items-center gap-1 rounded-[112px] px-2 transition-all select-none">
      <img src={giftImg} alt="Get 1,000 Free Credits!" className="h-[70px] w-[70px]" />

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[#DBDBDB]">Get 1,000 Free Credits!</span>
        <span className="text-[10px] font-medium text-[#FFFFFF5C]">
          Claim your first 1,000 credits — free for new users!
        </span>
      </div>

      <Icon name="arrow-up-right" className="mr-6 ml-auto stroke-white" />
    </div>
  );
};

const TAB_ITEMS = [
  {
    id: 0,
    title: "Style",
    component: <ImageStyles />,
  },
  {
    id: 1,
    title: "Aspect Ratio",
    component: <ImageAspectRatio />,
  },
  {
    id: 2,
    title: "Speed",
    component: <ImageSpeed />,
  },
  {
    id: 3,
    title: "Output Format",
    component: <ImageOutputFormat />,
  },
  {
    id: 4,
    title: "Number of Images",
    component: <ImageNumber />,
  },
];

export function App() {
  const [tab, setTab] = useState(TAB_ITEMS[0].id);
  const [images] = useImageStore(useShallow((state) => [state.images]));

  // const [generatedImages, setGeneratedImages] = usePluginStorage<GeneratedImage[]>(
  //   `${projectName}-${IMAGE_KEY}`,
  //   []
  // );

  return (
    <>
      <div className="h-screen bg-black/40 bg-[url(./assets/img/bg.png)] bg-cover bg-blend-overlay">
        <div className="from-framer-bg/10 to-framer-bg/70 fixed inset-0 bg-linear-to-b" />
        <div className="flex h-full flex-col px-4 pb-11">
          <LogoTitle />

          <UserTextInputSection />

          <div className="mt-2 flex gap-1.5">
            {/* advanced */}
            <Dropdown
              side="bottom"
              offset={8}
              align="left"
              contentClassName="!left-[35px] !right-[35px]"
              trigger={(isOpen) => {
                return (
                  <DropdownTriggerButton
                    leftIcon={<Icon name="gear" className="size-4 stroke-current" />}
                    className="w-[111px] gap-1"
                    isOpen={isOpen}
                  >
                    <span className="select-none">Advanced</span>
                  </DropdownTriggerButton>
                );
              }}
            >
              {(toggleDropdown) => (
                <div className="p-2">
                  <div className="bg-framer-bg scrollArea flex w-full flex-nowrap gap-2 overflow-x-auto rounded-[8px] p-1 text-nowrap">
                    {TAB_ITEMS.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "flex h-8 cursor-pointer items-center justify-center rounded-md px-3 select-none",
                            item.id === tab ? "bg-framer-text-tertiary" : "text-[#646464]"
                          )}
                          onClick={() => setTab(item.id)}
                        >
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                      );
                    })}
                  </div>

                  {TAB_ITEMS[tab].component}
                </div>
              )}
            </Dropdown>

            {/* model */}
            <Dropdown
              side="bottom"
              offset={8}
              align="left"
              contentClassName="!left-[35px] !right-[35px]"
              trigger={(isOpen) => {
                return (
                  <DropdownTriggerButton
                    rightIcon={<Icon name="chevron-down" className="size-2 stroke-current" />}
                    className="w-[72px] gap-1 px-0"
                    isOpen={isOpen}
                  >
                    <span className="select-none">Model</span>
                  </DropdownTriggerButton>
                );
              }}
            >
              {(toggleDropdown) => (
                <div className="p-3.5">
                  <ImageSpeed />
                </div>
              )}
            </Dropdown>

            {/* styles */}
            <Dropdown
              side="bottom"
              offset={8}
              align="left"
              contentClassName="!left-[35px] !right-[35px]"
              trigger={(isOpen) => {
                return (
                  <DropdownTriggerButton
                    rightIcon={<Icon name="chevron-down" className="size-2 stroke-current" />}
                    className="w-[67px] gap-1 px-0"
                    isOpen={isOpen}
                  >
                    <span className="select-none">Style</span>
                  </DropdownTriggerButton>
                );
              }}
            >
              {(toggleDropdown) => (
                <div className="p-3.5">
                  <ImageStyles />
                </div>
              )}
            </Dropdown>

            {/* Orientation */}
            <Dropdown
              side="bottom"
              offset={8}
              align="left"
              contentClassName="!left-[35px] !right-[35px]"
              trigger={(isOpen) => {
                return (
                  <DropdownTriggerButton
                    rightIcon={<Icon name="chevron-down" className="size-2 stroke-current" />}
                    className="w-[111px] gap-1 px-0"
                    isOpen={isOpen}
                  >
                    <span className="select-none">Orientation</span>
                  </DropdownTriggerButton>
                );
              }}
            >
              {(toggleDropdown) => (
                <div className="p-3.5">
                  <ImageOrientation />
                </div>
              )}
            </Dropdown>
          </div>

          <GiftSection />

          <SortedImageGallery images={images} />

          <div className="mt-auto flex items-center justify-center gap-1">
            {/* <AppSections /> */}
            <UserSection />
          </div>
        </div>
      </div>
    </>
  );
}
