import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Landing";
import LoadingPage from "./LoadingPage";
import ContentDash from "../DashBoard/ContentDash";
import AccountDash from "../DashBoard/AccountDash";
import FeedDash from "../DashBoard/FeedDash";
import MainLanding from "../Welcome/MainLanding.js";
import HistoryDash from "../DashBoard/AccountHistoryDash";
import DecaptiveText from "./text.js";

const SignIn = lazy(() => import("./LogIn"));
const Decaptive = lazy(() => import("./Decaptive"));
const SignUp = lazy(() => import("./sign_up"));
const Fetch = lazy(() => import("./Fetch"));
const History = lazy(() => import("./History"));
const Feedback = lazy(() => import("./Feedback"));
const Edit = lazy(() => import("./Edit"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <MainLanding />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <ContentDash />
      </Suspense>
    ),
  },
  {
    path: "/accountdash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AccountDash />
      </Suspense>
    ),
  },
  {
    path: "/mainDash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <ContentDash />
      </Suspense>
    ),
  },
  {
    path: "/feeddash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <FeedDash />
      </Suspense>
    ),
  },
  {
    path: "/HistoryDash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <HistoryDash />
      </Suspense>
    ),
  },
  {
    path: "/user",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/main",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Decaptive />
      </Suspense>
    ),
  },
  {
    path: "/text",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <DecaptiveText />
      </Suspense>
    ),
  },
  {
    path: "/fetch",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Fetch />
      </Suspense>
    ),
  },
  {
    path: "/history",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <History />
      </Suspense>
    ),
  },
  {
    path: "/feedback",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Feedback />
      </Suspense>
    ),
  },
  {
    path: "/edit",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Edit />
      </Suspense>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <SignIn />
      </Suspense>
    ),
  },

  {
    path: "/mainDash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <ContentDash />
      </Suspense>
    ),
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};

export default App;
