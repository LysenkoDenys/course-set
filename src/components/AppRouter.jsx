import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PostsIdPage from "../pages/PostIdPage";
import Loader from "./UI/Loader/Loader";
import { privateRoutes, publicRoutes } from "../router";
import { AuthContext } from "../context";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  console.log(isAuth);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          exact={route.exact}
          path={route.path}
          element={route.element}
          key={route.path}
        />
      ))}
      <Route path="/*" element={<Navigate replace to="/Posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          exact={route.exact}
          path={route.path}
          element={route.element}
          key={route.path}
        />
      ))}
      <Route path="/*" element={<Navigate replace to="/Login" />} />
    </Routes>
  );
};

export default AppRouter;
