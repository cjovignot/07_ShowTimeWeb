import Layout from '../../components/layout';
import AdminAdmins from '../../components/admin/admins';

export default function Page() {
    return (
        <div>
            <AdminAdmins />
        </div>
    )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}