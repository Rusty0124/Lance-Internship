import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NFTSkeleton from "./NFTSkeleton";
import NewItemCarousel from "./NewItemCarousel";
import AOS from "aos";

async function getNFTs() {
  try {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
    );
    return response.data;
    // Data is already parsed and ready inside response.data
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

const NewItems = () => {
  const [NFTNew, setNFTNew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getNFTs().then(setNFTNew);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isLoading) AOS.refresh();
  }, [isLoading]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-in" className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <div style={{ display: "flex", gap: 16 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{ flex: "1 1 0", minWidth: 0 }}
                  data-aos="fade-in"
                  data-aos-offset="100"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-delay="200"
                >
                  <NFTSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div
              data-aos="fade-in"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-delay="200"
            >
              <NewItemCarousel items={NFTNew} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
