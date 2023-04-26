import Layout from '../../components/layout';
import AdminCategories from '../../components/admin/categories';

export default function Page() {
    return (
        <div>
            <AdminCategories />
        </div>
    )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}