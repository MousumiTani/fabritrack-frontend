import React from "react";
import Steps from "../components/Steps";
import Banner from "../components/Home/Banner";
import Feedback from "../components/Home/Feedback";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Faq from "../components/Home/Faq";

import { useEffect } from "react";

const HomeLayout = () => {
  useEffect(() => {
    document.title = "FabriTrack";
  }, []);
  return (
    <div className="min-h-screen ">
      <Banner></Banner>
      <Feedback></Feedback>
      <Steps></Steps>
      <WhyChooseUs></WhyChooseUs>
      <Faq></Faq>
    </div>
  );
};

export default HomeLayout;
