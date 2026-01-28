import giftImg from "@/assets/img/gift.svg";
import { Icon } from "@/components/icon";

const GiftSection = () => {
  return (
    <div className="mt-2.5 mb-[18px]">
      <div className="bg-primary-400 hover:bg-primary-900 z-20 mt-2 flex h-[58px] cursor-pointer items-center gap-1 rounded-[112px] px-2 transition-all select-none">
        <img src={giftImg} alt="Get 1,000 Free Credits!" className="h-[70px] w-[70px]" />

        <div className="flex flex-col">
          <span className="text-framer-text-reversed/80 text-sm font-semibold">
            Get 1,000 Free Credits!
          </span>
          <span className="text-framer-text-reversed/50 text-[10px] font-medium">
            Claim your first 1,000 credits — free for new users!
          </span>
        </div>

        <Icon name="arrow-up-right" className="mr-6 ml-auto stroke-white" />
      </div>
    </div>
  );
};

export default GiftSection;
