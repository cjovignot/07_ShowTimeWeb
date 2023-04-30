import Layout from "../../components/layout";
import AdminConcerts from "../../components/admin/concertsComp";
import Crud from "../../components/admin/crudConcertComp";
import React, { useState } from "react";
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

  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }
  return (
    <div className="admin_crud_concert">
      <div
        style={{
          display: showMe ? "block" : "none",
        }}
      >
        <Crud />
      </div>

      <AdminConcerts />
    </div>
  );
}

Page.getLayout = function getLayout() {
  return <Layout />;
};
