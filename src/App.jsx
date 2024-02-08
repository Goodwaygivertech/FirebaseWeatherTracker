import React, { useContext } from "react";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Weather from "./components/Weather";
import Users from "./components/Users";
import { UserContext } from "./components/context/ContextProvider";

export default function App() {

  const {user, setUser} = useContext(UserContext)


if(!user){
  return(
    <Login></Login>
  )
}



  return (
    <>
      <Nav></Nav>
      <Users></Users>
      <Weather></Weather>
    </>
  );
}
