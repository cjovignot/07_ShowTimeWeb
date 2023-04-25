import Navbar from '../components/navbar';
import Footer from '../components/Footer'

export default function Layout({ children }) {
    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
    )
  }