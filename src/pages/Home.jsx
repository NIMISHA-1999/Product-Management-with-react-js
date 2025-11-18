import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  const[productss, setProductss] = useState('');

  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();

  

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(' https://dummyjson.com/products'); // Example API
            const jsonData = await response.json();
            setProductss(jsonData);
            console.log('jsonData:', jsonData);
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error state, e.g., setError(true)
          }
        };
        fetchData();
      }, []); // Empty dependency array means it runs once on mount
  
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
