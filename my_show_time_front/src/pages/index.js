import Home_content from "@/components/home_content.js";
import Layout from "../components/layout";

export default function Page() {
  return (
    <div>
      <link href="/dist/output.css" rel="stylesheet"/>
      <Home_content />
    </div>
  );
}

Page.getLayout = function getLayout() {
  return <Layout />;
};
