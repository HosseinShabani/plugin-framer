import { framer } from "framer-plugin";
import logo from "@/assets/img/icon.svg";
import imageAddIcon from "@/assets/icons/image-add.svg";
import realisticImg from "@/assets/img/realistic-image.webp";
import { useState } from "react";
import { cn } from "./utils/cn";
import { Dropdown } from "./components/ui";
import { IMAGE_STYLES } from "./constants/image-styles";
import { DropdownTriggerButton } from "./components/ui/dropdown";
import { ORIENTATIONS } from "./constants/orientation";
import { numberWithCommasEn } from "./utils/numberWithCommasEn";
import { ASPECT_RATIO } from "./constants/aspect-ratio";
import { IMAGE_SPEED } from "./constants/image-speed";
import { OUTPUT_FORMAT } from "./constants/output-format";
import { IMAGE_COUNT } from "./constants/image-count";

framer.showUI({
  position: "top right",
  width: 430,
  height: 621,
});

const ImageStyles = () => {
  const [style, setStyle] = useState(IMAGE_STYLES[0]);

  return (
    <>
      <span className="text-[10px] font-medium text-[#8B8B8B]">Styles:</span>

      <div className="mt-2.5 flex w-full flex-nowrap gap-2 overflow-x-auto text-nowrap">
        {IMAGE_STYLES.map((st) => {
          return (
            <div
              key={st}
              className={cn(
                "cursor-pointer items-center justify-center rounded-md p-1",
                st === style
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "text-[#8B8B8B]"
              )}
              onClick={() => setStyle(st)}
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
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIO[0]);

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
                ar === aspectRatio
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-[#8B8B8B]"
              )}
              onClick={() => setAspectRatio(ar)}
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
  const [speed, setSpeed] = useState(IMAGE_SPEED[0].value);

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
                sp.value === speed
                  ? "bg-framer-text-tertiary text-framer-text-reversed"
                  : "bg-framer-bg text-[#8B8B8B]"
              )}
              onClick={() => setSpeed(sp.value)}
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
  const [format, setFormat] = useState(OUTPUT_FORMAT[0]);

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
              onClick={() => setFormat(fmt)}
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
  const [number, setNumber] = useState(IMAGE_COUNT[0]);

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
              onClick={() => setNumber(count)}
            >
              <span className="text-[12px] font-medium">{count}</span>
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
    icon: (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <g clip-path="url(#clip0_15_226)">
          <path
            d="M5.47485 0.502149C5.6954 0.48269 5.90636 0.596654 6.01103 0.791823L6.94863 2.54061C7.61249 3.78658 8.75876 4.70534 10.1194 5.08199L11.5943 5.49031C11.8169 5.55191 11.9778 5.74524 11.9979 5.97526C12.018 6.20528 11.8932 6.42359 11.6847 6.52295L10.7375 6.97416C9.18518 7.71371 8.00388 9.05737 7.46917 10.6917L7.00233 12.1188C6.93343 12.3294 6.74549 12.4786 6.52472 12.4979C6.30402 12.5172 6.09298 12.403 5.98861 12.2075L5.28101 10.8831C4.47065 9.36651 3.07396 8.24841 1.41675 7.78961L0.405634 7.50968C0.183107 7.44809 0.0222383 7.25475 0.00211585 7.02476C-0.0180066 6.79477 0.106837 6.57643 0.315289 6.47707L1.26244 6.02587C2.81481 5.2863 3.99614 3.94264 4.53077 2.30833L4.99768 0.881216C5.0665 0.670741 5.25423 0.521615 5.47485 0.502149Z"
            fill="currentcolor"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 2,
    icon: (
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3.82353C0 2.00424 1.47482 0.529419 3.29411 0.529419C5.1134 0.529419 6.58822 2.00424 6.58822 3.82353C6.58822 5.64282 5.1134 7.11764 3.29411 7.11764C1.47482 7.11764 0 5.64282 0 3.82353Z"
          fill="currentcolor"
        />
        <path
          d="M9.41187 3.82353C9.41187 2.00424 10.8867 0.529419 12.706 0.529419C14.5253 0.529419 16.0001 2.00424 16.0001 3.82353C16.0001 5.64282 14.5253 7.11764 12.706 7.11764C10.8867 7.11764 9.41187 5.64282 9.41187 3.82353Z"
          fill="currentcolor"
        />
        <path
          d="M9.41187 14.1764C9.41187 12.3571 10.8867 10.8823 12.706 10.8823C14.5253 10.8823 16.0001 12.3571 16.0001 14.1764C16.0001 15.9957 14.5253 17.4705 12.706 17.4705C10.8867 17.4705 9.41187 15.9957 9.41187 14.1764Z"
          fill="currentcolor"
        />
        <path
          d="M0 14.1764C0 12.3571 1.47482 10.8823 3.29411 10.8823C5.1134 10.8823 6.58822 12.3571 6.58822 14.1764C6.58822 15.9957 5.1134 17.4705 3.29411 17.4705C1.47482 17.4705 0 15.9957 0 14.1764Z"
          fill="currentcolor"
        />
      </svg>
    ),
  },
  {
    id: 3,
    icon: (
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3125 0.124573H3.68769C1.79201 0.124573 0.23999 1.67659 0.23999 3.57227V16.1658C0.23999 17.7732 1.39292 18.4605 2.80082 17.6735L7.15756 15.2457C7.62316 14.9907 8.377 14.9907 8.83152 15.2457L13.1883 17.6735C14.6072 18.4495 15.7602 17.7732 15.7602 16.1658V3.57227C15.7602 1.67659 14.2082 0.124573 12.3125 0.124573Z"
          fill="currentcolor"
        />
      </svg>
    ),
  },
];
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
  const [text, setText] = useState("");
  const [section, setSection] = useState(SECTION_ITEMS[0].id);
  const [orientation, setOrientation] = useState(ORIENTATIONS[0].title);
  const [tab, setTab] = useState(TAB_ITEMS[0].id);

  const handleSectionClick = (id: number) => {
    setSection(id);
  };
  const handleOrientationClick = (title: string) => {
    setOrientation(title);
  };

  return (
    <div className="h-screen bg-black/40 bg-[url(./assets/img/bg.png)] bg-cover bg-blend-overlay">
      <div className="flex h-full flex-col px-9 pt-14 pb-11">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            className="h-[73px] w-[73px] rounded-2xl shadow-[_-27.26px_5.93px_80.6px_11.85px_rgba(7,33,151,0.8)]"
            src={logo}
            alt="logo"
          />

          <h3 className="text-center text-2xl font-semibold">
            Imagine something. <br /> Anything...
          </h3>
        </div>
        <div className="relative mt-5 h-13 w-full rounded-xl bg-[#FFFFFF26] p-1 transition-all duration-200 focus-within:bg-[linear-gradient(91.83deg,rgba(248,109,190,0.49)_5.83%,rgba(156,56,236,0.49)_44.85%,rgba(83,100,231,0.49)_77.37%,rgba(230,67,46,0.49)_98.87%)]">
          <div className="bg-framer-bg-secondary flex h-full w-full items-center rounded-lg px-2.75">
            <img className="h-4.5 w-4.5" src={imageAddIcon} alt="image-add" />
            <input
              type="text"
              placeholder="Imagine something. Anything..."
              className="h-full w-full border-none px-2 outline-0"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />

            <button
              className={cn(
                "flex h-8 w-[88px] min-w-[88px] items-center justify-center gap-0.5 rounded-[48px] text-xs font-semibold transition-all",
                !!text
                  ? "text-framer-text-reversed cursor-pointer bg-[#514FE8] hover:opacity-80"
                  : "bg-framer-bg-tertiary text-framer-text-tertiary"
              )}
              disabled={!text}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_15_226)">
                  <path
                    d="M5.47485 0.502149C5.6954 0.48269 5.90636 0.596654 6.01103 0.791823L6.94863 2.54061C7.61249 3.78658 8.75876 4.70534 10.1194 5.08199L11.5943 5.49031C11.8169 5.55191 11.9778 5.74524 11.9979 5.97526C12.018 6.20528 11.8932 6.42359 11.6847 6.52295L10.7375 6.97416C9.18518 7.71371 8.00388 9.05737 7.46917 10.6917L7.00233 12.1188C6.93343 12.3294 6.74549 12.4786 6.52472 12.4979C6.30402 12.5172 6.09298 12.403 5.98861 12.2075L5.28101 10.8831C4.47065 9.36651 3.07396 8.24841 1.41675 7.78961L0.405634 7.50968C0.183107 7.44809 0.0222383 7.25475 0.00211585 7.02476C-0.0180066 6.79477 0.106837 6.57643 0.315289 6.47707L1.26244 6.02587C2.81481 5.2863 3.99614 3.94264 4.53077 2.30833L4.99768 0.881216C5.0665 0.670741 5.25423 0.521615 5.47485 0.502149Z"
                    fill="currentcolor"
                  />
                </g>
              </svg>
              Generate
            </button>
          </div>
        </div>

        <div className="mt-2 flex gap-1.5">
          {/* advanced */}
          <Dropdown
            side="bottom"
            offset={8}
            align="left"
            contentClassName="!left-[35px] !right-[35px]"
            trigger={(isOpen) => {
              return (
                <DropdownTriggerButton isOpen={isOpen}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                      stroke="currentcolor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.55 11.25C14.4502 11.4762 14.4204 11.7271 14.4645 11.9704C14.5086 12.2137 14.6246 12.4382 14.7975 12.615L14.8425 12.66C14.982 12.7993 15.0926 12.9647 15.1681 13.1468C15.2436 13.3289 15.2824 13.5241 15.2824 13.7213C15.2824 13.9184 15.2436 14.1136 15.1681 14.2957C15.0926 14.4778 14.982 14.6432 14.8425 14.7825C14.7032 14.922 14.5378 15.0326 14.3557 15.1081C14.1736 15.1836 13.9784 15.2224 13.7812 15.2224C13.5841 15.2224 13.3889 15.1836 13.2068 15.1081C13.0247 15.0326 12.8593 14.922 12.72 14.7825L12.675 14.7375C12.4982 14.5646 12.2737 14.4486 12.0304 14.4045C11.7871 14.3604 11.5362 14.3902 11.31 14.49C11.0882 14.5851 10.899 14.7429 10.7657 14.9442C10.6325 15.1454 10.561 15.3812 10.56 15.6225V15.75C10.56 16.1478 10.402 16.5294 10.1207 16.8107C9.83936 17.092 9.45782 17.25 9.06 17.25C8.66218 17.25 8.28064 17.092 7.99934 16.8107C7.71804 16.5294 7.56 16.1478 7.56 15.75V15.6825C7.55419 15.4343 7.47384 15.1935 7.32938 14.9915C7.18493 14.7896 6.98305 14.6357 6.75 14.55C6.52379 14.4502 6.27286 14.4204 6.02956 14.4645C5.78626 14.5086 5.56176 14.6246 5.385 14.7975L5.34 14.8425C5.20069 14.982 5.03526 15.0926 4.85316 15.1681C4.67106 15.2436 4.47587 15.2824 4.27875 15.2824C4.08163 15.2824 3.88644 15.2436 3.70434 15.1681C3.52224 15.0926 3.35681 14.982 3.2175 14.8425C3.07804 14.7032 2.9674 14.5378 2.89191 14.3557C2.81642 14.1736 2.77757 13.9784 2.77757 13.7812C2.77757 13.5841 2.81642 13.3889 2.89191 13.2068C2.9674 13.0247 3.07804 12.8593 3.2175 12.72L3.2625 12.675C3.4354 12.4982 3.55139 12.2737 3.5955 12.0304C3.63962 11.7871 3.60984 11.5362 3.51 11.31C3.41493 11.0882 3.25707 10.899 3.05585 10.7657C2.85463 10.6325 2.61884 10.561 2.3775 10.56H2.25C1.85218 10.56 1.47064 10.402 1.18934 10.1207C0.908035 9.83936 0.75 9.45782 0.75 9.06C0.75 8.66218 0.908035 8.28064 1.18934 7.99934C1.47064 7.71804 1.85218 7.56 2.25 7.56H2.3175C2.56575 7.55419 2.8065 7.47384 3.00847 7.32938C3.21045 7.18493 3.36429 6.98305 3.45 6.75C3.54984 6.52379 3.57962 6.27286 3.5355 6.02956C3.49139 5.78626 3.3754 5.56176 3.2025 5.385L3.1575 5.34C3.01804 5.20069 2.9074 5.03526 2.83191 4.85316C2.75642 4.67106 2.71757 4.47587 2.71757 4.27875C2.71757 4.08163 2.75642 3.88644 2.83191 3.70434C2.9074 3.52224 3.01804 3.35681 3.1575 3.2175C3.29681 3.07804 3.46224 2.9674 3.64434 2.89191C3.82644 2.81642 4.02163 2.77757 4.21875 2.77757C4.41587 2.77757 4.61106 2.81642 4.79316 2.89191C4.97526 2.9674 5.14069 3.07804 5.28 3.2175L5.325 3.2625C5.50176 3.4354 5.72626 3.55139 5.96956 3.5955C6.21285 3.63962 6.46379 3.60984 6.69 3.51H6.75C6.97183 3.41493 7.16101 3.25707 7.29427 3.05585C7.42753 2.85463 7.49904 2.61884 7.5 2.3775V2.25C7.5 1.85218 7.65804 1.47064 7.93934 1.18934C8.22064 0.908035 8.60218 0.75 9 0.75C9.39782 0.75 9.77936 0.908035 10.0607 1.18934C10.342 1.47064 10.5 1.85218 10.5 2.25V2.3175C10.501 2.55884 10.5725 2.79463 10.7057 2.99585C10.839 3.19707 11.0282 3.35493 11.25 3.45C11.4762 3.54984 11.7271 3.57962 11.9704 3.5355C12.2137 3.49139 12.4382 3.3754 12.615 3.2025L12.66 3.1575C12.7993 3.01804 12.9647 2.9074 13.1468 2.83191C13.3289 2.75642 13.5241 2.71757 13.7213 2.71757C13.9184 2.71757 14.1136 2.75642 14.2957 2.83191C14.4778 2.9074 14.6432 3.01804 14.7825 3.1575C14.922 3.29681 15.0326 3.46224 15.1081 3.64434C15.1836 3.82644 15.2224 4.02163 15.2224 4.21875C15.2224 4.41587 15.1836 4.61106 15.1081 4.79316C15.0326 4.97526 14.922 5.14069 14.7825 5.28L14.7375 5.325C14.5646 5.50176 14.4486 5.72626 14.4045 5.96956C14.3604 6.21285 14.3902 6.46379 14.49 6.69V6.75C14.5851 6.97183 14.7429 7.16101 14.9442 7.29427C15.1454 7.42753 15.3812 7.49904 15.6225 7.5H15.75C16.1478 7.5 16.5294 7.65804 16.8107 7.93934C17.092 8.22064 17.25 8.60218 17.25 9C17.25 9.39782 17.092 9.77936 16.8107 10.0607C16.5294 10.342 16.1478 10.5 15.75 10.5H15.6825C15.4412 10.501 15.2054 10.5725 15.0042 10.7057C14.8029 10.839 14.6451 11.0282 14.55 11.25Z"
                      stroke="currentcolor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="ml-2 select-none">Advanced</span>
                </DropdownTriggerButton>
              );
            }}
          >
            {(toggleDropdown) => (
              <div className="p-2">
                <div className="bg-framer-bg flex w-full flex-nowrap gap-2 overflow-x-auto rounded-[8px] p-1 text-nowrap">
                  {TAB_ITEMS.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "flex h-8 cursor-pointer items-center justify-center rounded-md px-3",
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

          {/* styles */}
          <Dropdown
            side="bottom"
            offset={8}
            align="left"
            contentClassName="!left-[35px] !right-[35px]"
            trigger={(isOpen) => {
              return (
                <DropdownTriggerButton isOpen={isOpen}>
                  <span className="mr-2 select-none">Style</span>
                  <svg
                    width="8"
                    height="6"
                    viewBox="0 0 8 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L4 4.5L7 1.5"
                      stroke="currentcolor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
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
                <DropdownTriggerButton isOpen={isOpen}>
                  <span className="mr-2 select-none">Orientation</span>
                  <svg
                    width="8"
                    height="6"
                    viewBox="0 0 8 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L4 4.5L7 1.5"
                      stroke="currentcolor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </DropdownTriggerButton>
              );
            }}
          >
            {(toggleDropdown) => (
              <div className="p-3.5">
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
                        {!!orient.classname && (
                          <div className={cn("rounded-xs border", orient.classname)} />
                        )}
                        <span className="m-auto text-[10px] font-medium">{orient.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Dropdown>
        </div>

        <div className="mt-auto flex items-center justify-center gap-1">
          <div className="bg-framer-bg-secondary flex h-12.5 w-[132px] items-center justify-around gap-2 rounded-4xl px-2">
            {SECTION_ITEMS.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cn(
                    "cursor-pointer rounded-full p-1.5",
                    item.id === section ? "bg-framer-text-tertiary" : "text-framer-text-tertiary"
                  )}
                  onClick={() => handleSectionClick(item.id)}
                >
                  {item.icon}
                </div>
              );
            })}
          </div>

          <Dropdown
            side="top"
            offset={8}
            align="center"
      
            trigger={(isOpen) => {
              return (
                <div
                  role="button"
                  className="bg-framer-bg-secondary flex h-12.5 w-[130px] cursor-pointer items-center justify-center gap-2 rounded-4xl px-2 select-none"
                >
                  <svg
                    width="17"
                    height="20"
                    viewBox="0 0 17 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#888888]"
                  >
                    <path
                      d="M8.5 0.25C5.87665 0.25 3.75 2.37665 3.75 5C3.75 7.62335 5.87665 9.75 8.5 9.75C11.1234 9.75 13.25 7.62335 13.25 5C13.25 2.37665 11.1234 0.25 8.5 0.25Z"
                      fill="currentcolor"
                    />
                    <path
                      d="M5.21585 11.25C3.88709 11.25 2.65754 11.9532 1.98374 13.0984L1.32197 14.2233C0.799651 15.111 0.575601 16.1478 0.789501 17.0798C1.01276 18.0525 1.7044 18.8451 2.83631 19.1375C5.99748 19.9542 11.0028 19.9542 14.164 19.1375C15.2959 18.8451 15.9876 18.0525 16.2108 17.0798C16.4247 16.1478 16.2007 15.111 15.6784 14.2233L15.0166 13.0984C14.3428 11.9532 13.1132 11.25 11.7845 11.25H5.21585Z"
                      fill="currentcolor"
                    />
                  </svg>

                  <div className="flex items-center">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                    >
                      <g clip-path="url(#clip0_15_226)">
                        <path
                          d="M5.47485 0.502149C5.6954 0.48269 5.90636 0.596654 6.01103 0.791823L6.94863 2.54061C7.61249 3.78658 8.75876 4.70534 10.1194 5.08199L11.5943 5.49031C11.8169 5.55191 11.9778 5.74524 11.9979 5.97526C12.018 6.20528 11.8932 6.42359 11.6847 6.52295L10.7375 6.97416C9.18518 7.71371 8.00388 9.05737 7.46917 10.6917L7.00233 12.1188C6.93343 12.3294 6.74549 12.4786 6.52472 12.4979C6.30402 12.5172 6.09298 12.403 5.98861 12.2075L5.28101 10.8831C4.47065 9.36651 3.07396 8.24841 1.41675 7.78961L0.405634 7.50968C0.183107 7.44809 0.0222383 7.25475 0.00211585 7.02476C-0.0180066 6.79477 0.106837 6.57643 0.315289 6.47707L1.26244 6.02587C2.81481 5.2863 3.99614 3.94264 4.53077 2.30833L4.99768 0.881216C5.0665 0.670741 5.25423 0.521615 5.47485 0.502149Z"
                          fill="currentcolor"
                        />
                      </g>
                    </svg>

                    <span className="mr-2 ml-1 text-sm font-semibold">
                      {numberWithCommasEn(1000)}
                    </span>

                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.46">
                        <path
                          d="M7 5.5L4 2.5L1 5.5"
                          stroke="currentcolor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              );
            }}
          >
            {(toggleDropdown) => (
              <div className="p-3.5 grid w-[157px] ">
                <span className="text-[10px] font-medium text-[#8B8B8B]">Plugin</span>
                <span className="text-[10px] font-medium text-[#8B8B8B]">Account</span>
              </div>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
