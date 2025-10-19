import ImageSpeed from "../image-options/speed";
import { Dropdown, DropdownTriggerButton } from "../ui/dropdown";
import { Icon } from "../ui/Icon";

const ModelDropdown = () => {
  return (
    <Dropdown
      side="bottom"
      offset={8}
      align="left"
      contentClassName="!left-4 !right-4"
      trigger={(isOpen) => {
        return (
          <DropdownTriggerButton
            rightIcon={<Icon name="chevron-down" className="size-2 stroke-current" />}
            className="w-[72px] gap-1 px-0"
            isOpen={isOpen}
          >
            <span className="text-xs font-semibold select-none">Model</span>
          </DropdownTriggerButton>
        );
      }}
    >
      {(_toggleDropdown) => (
        <div className="px-3 pb-3">
          <ImageSpeed />
        </div>
      )}
    </Dropdown>
  );
};

export default ModelDropdown;
