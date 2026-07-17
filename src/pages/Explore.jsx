import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";
import NFTSkeleton from "../components/home/NFTSkeleton";

async function getExploreNFTs() {
  try {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    );
    return response.data;
    // Data is already parsed and ready inside response.data
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

const Explore = () => {
  const [NFTData, setNFTData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getExploreNFTs().then((data) => {
      setNFTData(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 16,
                  }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <NFTSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <ExploreItems items={NFTData} />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
