import React from "react";
import HeroBanner from "../components/HeroBanner";
import DealOfDaySection from "../components/DealOfDaySection";
import TopStoresSection from "../components/TopStoresSection";
import CategoriesSection from "../components/CategoriesSection";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      

      <main className="flex-grow">
        <HeroBanner/>
      </main>
      <DealOfDaySection/>
      <TopStoresSection/>
      <CategoriesSection/>

      
    </div>
  );
}

export default Home;
