import React from 'react';
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export function PrivacyPolicy() {
  React.useEffect(async () => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Header />

      <div className="w-75 pt-4 pb-3" style={{ margin: "0 auto" }}>
        <h1 style={{ fontWeight: "bold" }}> Privacy Policy </h1>
        <p className="text-justify">
          This privacy policy will help you understand how uses and protects the data you provide to us when you visit and use.
          We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.
        </p>
        <h4 style={{ fontWeight: "bold" }}> Safeguarding and Securing the Data </h4>
        <p className="text-justify">
          Name is committed to securing your data and keeping it confidential. It has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.
        </p>
        <h4 style={{ fontWeight: "bold" }}> Our Cookie Policy </h4>
        <p className="text-justify">
          Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you spend the most time on, and websites you visit).
          The data we collect by using cookies is used to customize our website to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.
          Please note that cookies don't allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.
        </p>
      </div>

      <Footer />
    </>
  )
}