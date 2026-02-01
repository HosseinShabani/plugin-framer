import { framer } from "framer-plugin";

framer.showUI({
  position: "top right",
  width: 593,
  height: 725,
});

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { lazy, Suspense } from "react";
import { PAGE_URL } from "./constants/page-url";
import AppLayout from "./components/layouts/app";
import GeneratePage from "./components/pages/generate";
import LoginPage from "./components/pages/login";
import AuthLayout from "./components/layouts/auth";

const lazyLoadRoutes = (folderName: string) => {
  const LazyElement = lazy(() =>
    import(`./components/pages/${folderName}/index.tsx`)
  );

  // Return the component directly so that React Router can treat it as a valid component type.
  return () => (
    <Suspense fallback={"Loading..."}>
      <LazyElement />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        Component: GeneratePage,
        path: PAGE_URL.GENERATE,
      },
      {
        Component: lazyLoadRoutes("gallery"),
        path: PAGE_URL.GALLERY,
      },
      {
        Component: lazyLoadRoutes("explore"),
        path: PAGE_URL.EXPLORE,
      },
      {
        Component: lazyLoadRoutes("saved"),
        path: PAGE_URL.SAVED,
      },
      {
        Component: lazyLoadRoutes("profile"),
        path: PAGE_URL.PROFILE,
      },
    ],
  },
  {
    element: <AuthLayout />,
    path: "/",
    children: [
      {
        Component: LoginPage,
        path: PAGE_URL.LOGIN,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
