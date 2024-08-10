import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Landing";
import LoadingPage from "./LoadingPage";
import ContentDash from "../DashBoard/ContentDash";
import AccountDash from "../DashBoard/AccountDash";
import FeedDash from "../DashBoard/FeedDash";
import AccountHistoryDash from "../DashBoard/AccountHistoryDash";
import MainLanding from "../Welcome/MainLanding.js";

const SignIn = lazy(() => import("./LogIn"));
const Decaptive = lazy(() => import("./Decaptive"));
const SignUp = lazy(() => import("./sign_up"));
const Fetch = lazy(() => import("./Fetch"));
const History = lazy(() => import("./History"));
const Feedback = lazy(() => import("./Feedback"));
const About = lazy(() => import("./About"));
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
    path: "main",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Decaptive />
      </Suspense>
    ),
  },
  {
    path: "fetch",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Fetch />
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
    path: "/about",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <About />
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
    path: "/mainDash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <ContentDash />
      </Suspense>
    ),
  },
  {
    path: "accdash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AccountDash />
      </Suspense>
    ),
  },
  {
    path: "feeddash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <FeedDash />
      </Suspense>
    ),
  },
  {
    path: "accounthistorydash",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AccountHistoryDash />
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
