import Layout from "../../components/layout";
import React, { useState } from "react";
import Concert from "../../components/admin/unitConcertComp";
import TicketsList from "../../components/admin/ticketsListComp";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookie from "js-cookie";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const userInfo = Cookie.get("userInfo");
    const isAdmin = Cookie.get("isAdmin");
    if (!userInfo && isAdmin !== "true") {
      router.push("/");
    }
  }, []);

  return (
    <div className="admin_concertUnit">
      <Concert />

      <TicketsList />
    </div>
  );
}

Page.getLayout = function getLayout() {
  return <Layout />;
};
