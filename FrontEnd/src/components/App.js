import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingPage from "./Loading";
import Mainpage from "./Mainpage";
import SignIn from "./LogIn";
import SignUp from "./sign_up";
import Fetch from "./Fetch";
import History from "./History";
import Feedback from "./Feedback";
import About from "./About";
import Edit from "./Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoadingPage />,
  },
  {
    path: "/main",
    element: <Mainpage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/fetch",
    element: <Fetch />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
};

export default App;
