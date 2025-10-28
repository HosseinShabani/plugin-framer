import bg3 from "@/assets/img/bg3.svg";
import { Icon } from "@/components/ui/Icon";

const ProfilePage = () => {
  return (
    <div>
      <div
        className={`min-h-[114px] w-full bg-cover bg-center bg-no-repeat pt-[21px] pr-[32px] pl-[60px]`}
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="flex items-center justify-between">
          <div className="">
            <div className="font-semibold text-black">Credits</div>
            <div className="flex items-center gap-1">
              <Icon name="magic-wand" className="size-6 fill-white" />
              <div className="text-5xl font-semibold text-white">1,000</div>
            </div>
          </div>
          <div className="flex h-[34px] w-[83px] cursor-pointer items-center justify-center rounded-4xl bg-black text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:brightness-75">
            Upgrade
          </div>
        </div>
      </div>

      <div className="tex-framer-text-secondary mt-8 text-xs font-medium">Plugin</div>
      <hr className="border-framer-text-tertiary/50 mt-3.5 mb-[18px]" />
      <div className="flex cursor-pointer items-center gap-1 rounded-lg font-medium hover:opacity-70">
        <Icon name="headphone" className="stroke-framer-text size-4" />
        Support
        <Icon name="arrow-up-right" className="stroke-framer-text ml-auto size-2" />
      </div>
      <hr className="border-framer-text-tertiary/50 my-[18px]" />
      <div className="flex cursor-pointer items-center gap-1 rounded-lg font-medium hover:opacity-70">
        <Icon name="bell" className="stroke-framer-text size-4" />
        What’s new
        <Icon name="arrow-up-right" className="stroke-framer-text ml-auto size-2" />
      </div>
      <hr className="border-framer-text-tertiary/50 mt-[18px] mb-6" />
      <div className="flex cursor-pointer items-center gap-1 rounded-lg font-medium text-red-500 hover:opacity-70">
        <Icon name="logout" className="size-4 stroke-red-500" />
        Log out
      </div>
    </div>
  );
};

export default ProfilePage;
