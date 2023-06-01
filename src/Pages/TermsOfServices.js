import React from 'react';
import Footer from "../Components/Footer";
import Header from "../Components/Header";


export function TermsOfServices() {
  React.useEffect(async () => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Header />

      <div className="w-75 pt-4 pb-3" style={{ margin: "0 auto" }}>
        <h1 style={{ fontWeight: "bold" }}> Terms of Services </h1>
        <p className="text-justify">
          This privacy policy will help you understand how uses and protects the data you provide to us when you visit and use.
          We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.
        </p>
        <h4 style={{ fontWeight: "bold" }}> Conditions of Use </h4>
        <p className="text-justify">
          We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a purchase, you accept the following conditions. This is why we urge you to read them carefully.
          You are not allowed to download or modify it. This may be done only with written consent from us.
        </p>
        <h4 style={{ fontWeight: "bold" }}> Applicable Law </h4>
        <p className="text-justify">
          By visiting this website, you agree that the laws of the your location, without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between name and you, or its business partners and associates.
          When you post your content, you grant name non-exclusive, royalty-free and irrevocable right to use, reproduce, publish, modify such content throughout the world in any media.
        </p>
      </div>

      <Footer />
    </>
  )
}