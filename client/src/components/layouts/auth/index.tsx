import { PAGE_URL } from "@/constants/page-url";
import { useAuthStore } from "@/context/auth";
import { Navigate, Outlet } from "react-router";
import { useShallow } from "zustand/shallow";

const AuthLayout = () => {
  const { license } = useAuthStore(useShallow((state) => state));
  if (license?.license) {
    return <Navigate to={PAGE_URL.GENERATE} replace />;
  }

  return <Outlet />;
};
export default AuthLayout;
