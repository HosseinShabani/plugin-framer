import { Link, Outlet, useLocation } from "react-router";
import { Icon, IconName } from "../../icon";
import { PAGE_URL } from "@/constants/page-url";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetActions } from "@/hooks/use-get-actions";
import { numberWithCommasEn } from "@/utils/number-with-commas-en";


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
  const { data: actions, isSuccess } = useGetActions({});

  return (
    <div className="flex h-dvh w-full">
      <div className="border-r-framer-text-tertiary/50 border-t-framer-text-tertiary/50 grid h-dvh w-[139px] border-t border-r pt-[26px] pr-3 pb-6 pl-3.5">
        <div className="flex flex-col gap-2">
          {MENU_ITEMS.map((item) => (
            <Link to={item.href} key={item.href}>
              <Button
                color="gray"
                variant={location.pathname === item.href ? "contained" : "text"}
                className="gap-2 px-3"
              >
                <Icon
                  name={item.icon}
                  className="fill-framer-text size-[18px]"
                />
                <span className="mr-auto">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            variant="outline"
            loading={ !isSuccess}
            className="relative px-2.5"
            color="secondary"
            fullWidth
          >
            <Icon name="magic-wand" className="fill-secondary size-2.5" />
            {actions && (
              <span>{numberWithCommasEn(actions.totalTokens)}</span>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-pointer">
                  <Icon
                    name="circle-question"
                    className="stroke-secondary ml-auto size-4"
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent
                classNameArrow="bg-framer-bg fill-framer-bg"
                className="bg-framer-bg text-framer-text shadow-framer-text/20 shadow-md"
              >
                <span>credit amount</span>
              </TooltipContent>
            </Tooltip>
          </Button>
        </div>
      </div>
      <div className="no-scroll-bar border-t-framer-text-tertiary/50 h-dvh w-full min-w-[400px] overflow-y-auto border-t px-8 py-[26px]">
        <Outlet />
      </div>
    </div>
  );
};
export default AppLayout;
