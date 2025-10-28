import { Link, Outlet, useLocation } from "react-router";
import { Icon, IconName } from "../../ui/Icon";
import { PAGE_URL } from "@/constants/page-url";
import { Button } from "../../ui/button";

const MENU_ITEMS: { icon: IconName; label: string; href: string }[] = [
  {
    icon: "magic-wand",
    label: "Generate",
    href: PAGE_URL.GENERATE,
  },
  {
    icon: "album-image",
    label: "Gallery",
    href: PAGE_URL.GALLERY,
  },
  {
    icon: "grid",
    label: "Explore",
    href: PAGE_URL.EXPLORE,
  },

  {
    icon: "bookmark",
    label: "Saved",
    href: PAGE_URL.SAVED,
  },
  {
    icon: "user-filled",
    label: "Profile",
    href: PAGE_URL.PROFILE,
  },
];

const AppLayout = () => {
  const location = useLocation();
  return (
    <div className="flex h-dvh w-full">
      <div className="border-r-framer-text-tertiary/50 border-t-framer-text-tertiary/50 grid h-dvh w-[139px] border-t border-r pt-[26px] pr-3 pb-6 pl-3.5">
        <div className="flex flex-col gap-2">
          {MENU_ITEMS.map((item) => (
            <Link to={item.href} key={item.href}>
              <Button
                variant={location.pathname === item.href ? "contained" : "ghost"}
                color="gray"
                fullWidth
                leftIcon={<Icon name={item.icon} className="fill-framer-text size-[18px]" />}
                className="h-9 justify-normal text-sm font-semibold"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            variant="outlined"
            leftIcon={<Icon name="magic-wand" className="fill-secondary size-2.5" />}
            rightIcon={<Icon name="circle-question" className="stroke-secondary ml-auto size-4" />}
            className="justify-normal gap-1"
            color="secondary"
            fullWidth
          >
            <span className="text-sm font-semibold">1,000</span>
          </Button>
        </div>
      </div>
      <div className="no-scroll-bar border-t-framer-text-tertiary/50 w-full overflow-y-auto border-t px-8 pt-[26px]">
        <Outlet />
      </div>
    </div>
  );
};
export default AppLayout;
