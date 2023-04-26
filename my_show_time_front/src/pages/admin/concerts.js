import Layout from '../../components/layout';
import AdminConcerts from '../../components/admin/concerts';

export default function Page() {
    return (
        <div>
            <AdminConcerts />
        </div>
    )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}