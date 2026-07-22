import React, { useState, useEffect } from "react";
import NFTSkeleton from "./NFTSkeleton.jsx";
import axios from "axios";
import CustomArrows from "./HotCollectionsCarousel.jsx";
import AOS from "aos";

async function getNFTs() {
  try {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    return response.data;
    // Data is already parsed and ready inside response.data
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

function HotCollections() {
  const [NFTCollections, setNFTCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getNFTs().then(setNFTCollections);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isLoading) AOS.refresh();
  }, [isLoading]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in">
              <h2>Hot Collections</h2>
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
              <CustomArrows items={NFTCollections} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HotCollections;
