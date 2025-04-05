import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="flex-grow">
        <HeroBanner/>
      </main>

      <Footer />
    </div>
  );
}

export default App;
