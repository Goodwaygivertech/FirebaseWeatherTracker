import React from "react";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Weather from "./components/Weather";
import Users from "./components/Users";

export default function App() {
  return (
    <>
      <Nav></Nav>
      <Login></Login>
      <Users></Users>
      <Weather></Weather>
    </>
  );
}
