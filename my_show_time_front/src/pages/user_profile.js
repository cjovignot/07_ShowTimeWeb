import Profile from "@/components/profile_comp";
import Profile_ticket from "@/components/user_ticketlist";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookie from "js-cookie";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const userInfo = Cookie.get("userInfo");
    if (!userInfo) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Profile />
      <Profile_ticket />
    </div>
  );
}
