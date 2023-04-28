import Layout from '../../components/layout';
import AdminUsers from '../../components/admin/usersComp';

export default function Page() {
    return (
        <div className="admin_page">
            <AdminUsers />
        </div>
    )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}