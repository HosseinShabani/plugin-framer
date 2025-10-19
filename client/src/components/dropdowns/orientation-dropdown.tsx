import { Dropdown, DropdownTriggerButton } from "../ui/dropdown";
import { Icon } from "../ui/Icon";
import ImageOrientation from "../image-options/orientation";

const OrientationDropdown = () => {
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
            className="w-[111px] gap-1 px-0"
            isOpen={isOpen}
          >
            <span className="text-xs font-semibold select-none">Orientation</span>
          </DropdownTriggerButton>
        );
      }}
    >
      {(_toggleDropdown) => (
        <div className="px-3 pb-3">
          <ImageOrientation />
        </div>
      )}
    </Dropdown>
  );
};

export default OrientationDropdown;
