import dynamic from "next/dynamic";

const Header = dynamic(() => import("header/Header"), {
  ssr: false,
});
const Body = dynamic(() => import("body/Body"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}
