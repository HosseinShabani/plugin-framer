import { cn } from "@/utils/cn";
import ImageAspectRatio from "../image-options/aspect-ratio";
import ImageNumber from "../image-options/number";
import ImageOutputFormat from "../image-options/output-format";
import ImageSpeed from "../image-options/speed";
import ImageStyles from "../image-options/style";
import { Dropdown, DropdownTriggerButton } from "../ui/dropdown";
import { Icon } from "../ui/Icon";
import { useState } from "react";
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
const AdvancedDropdown = () => {
  const [tab, setTab] = useState(TAB_ITEMS[0].id);

  return (
    <Dropdown
      side="bottom"
      offset={8}
      align="left"
      contentClassName="!left-4 !right-4 "
      trigger={(isOpen) => {
        return (
          <DropdownTriggerButton
            leftIcon={<Icon name="gear" className="size-4 stroke-current" />}
            className="w-[111px] gap-1"
            isOpen={isOpen}
          >
            <span className="text-xs font-semibold select-none">Advanced</span>
          </DropdownTriggerButton>
        );
      }}
    >
      {(_toggleDropdown) => (
        <div className="p-2">
          <div className="bg-framer-bg scrollArea flex w-full flex-nowrap gap-2 overflow-x-auto rounded-[8px] p-1 text-nowrap">
            {TAB_ITEMS.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex h-8 cursor-pointer items-center justify-center rounded-md px-3 transition-all duration-500 select-none",
                    item.id === tab
                      ? "bg-framer-text-tertiary text-framer-text-reversed"
                      : "text-framer-text-secondary"
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
  );
};

export default AdvancedDropdown;
