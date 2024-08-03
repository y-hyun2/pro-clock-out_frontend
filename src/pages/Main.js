import React from "react";
import MainPage from "../components/main/MainPage";
import Character from "../components/main/Character";

const Main = () => {
  return (
    <>
      <MainPage />;
      <Character userName="000" daysTogether={100} />;
    </>
  );
};

export default Main;
