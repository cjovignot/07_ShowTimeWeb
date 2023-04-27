import Layout from '../../components/layout';
import AdminInfos from '../../components/admin/infosComp';


export default function Page() {
  return (
    <div>
        <AdminInfos />
    </div>
  )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}