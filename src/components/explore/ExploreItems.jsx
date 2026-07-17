import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../home/Countdown";
import { useState } from "react";

const ExploreItems = ({ items }) => {
  const [sortOrder, setSortOrder] = useState("");
  const PAGE_SIZE = 8;
  const PAGE_Additon = 4; // however many you want to reveal per click
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "price_low_to_high") return a.price - b.price;
    if (sortOrder === "price_high_to_low") return b.price - a.price;
    if (sortOrder === "likes_high_to_low") return b.likes - a.likes;
    return 0; // "Default" — leave order unchanged
  });
  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {sortedItems
        .slice(0, visibleCount)
        .map(
          (
            {
              id,
              authorId,
              authorImage,
              nftImage,
              nftId,
              title,
              price,
              likes,
              expiryDate,
            },
            index,
          ) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {expiryDate === null ? (
                  " "
                ) : (
                  <div className="de_countdown">
                    <Countdown expiryTime={expiryDate} />
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{title}</h4>
                  </Link>
                  <div className="nft__item_price">{price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          <button
            type="button"
            className="btn-main lead"
            onClick={() => setVisibleCount((prev) => prev + PAGE_Additon)}
          >
            Load more
          </button>
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
