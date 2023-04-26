import Home_content from '@/components/home_content';
import Layout from '../components/layout'


export default function Page() {
  return (
    <div>
      <Home_content />
    </div>
  )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}