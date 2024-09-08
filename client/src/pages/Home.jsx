import Bento from "../components/Bento/Bento";
import Categorical from "../components/Categorical/Categorical";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Testimonials from "../components/Testimonials/Testimonials";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Bento />
      <Categorical />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
