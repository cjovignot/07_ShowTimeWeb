import Layout from '../../components/layout';
import AdminInfos from '../../components/admin/infosComp';


export default function Page() {
  return (
    <div className="admin_index">
        <AdminInfos />
    </div>
  )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}