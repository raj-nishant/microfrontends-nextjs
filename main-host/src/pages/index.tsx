import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("header/Header"), {
  ssr: false,
});
const Body = dynamic(() => import("body/Body"), {
  ssr: false,
});
const Login = dynamic(() => import("login/Login"), {
  ssr: false,
});

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsLoggedIn(!!username);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <>
      <Header />
      <Body />
    </>
  );
}
