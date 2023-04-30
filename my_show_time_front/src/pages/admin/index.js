import Layout from "../../components/layout";
import AdminInfos from "../../components/admin/infosComp";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
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
    <div className="admin_index">
      <AdminInfos />
    </div>
  );
}

Page.getLayout = function getLayout() {
  return <Layout />;
};
