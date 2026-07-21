import { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
      )
      .then((res) => {
        setItem(res.data);
        setisLoading(false);
      });
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <div
                    className="skeleton-box"
                    style={{ width: "100%", height: 400 }}
                  />
                ) : (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {isLoading ? (
                    <div
                      className="skeleton-box"
                      style={{ width: 220, height: 28 }}
                    />
                  ) : (
                    <h2>{item.title}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {isLoading ? (
                        <span
                          className="skeleton-box"
                          style={{ width: 30, height: 14 }}
                        />
                      ) : (
                        item.views
                      )}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {isLoading ? (
                        <span
                          className="skeleton-box"
                          style={{ width: 30, height: 14 }}
                        />
                      ) : (
                        item.likes
                      )}
                    </div>
                  </div>
                  {isLoading ? (
                    <div
                      className="skeleton-box"
                      style={{ width: "100%", height: 60 }}
                    />
                  ) : (
                    <p>{item.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        {isLoading ? (
                          <>
                            <div
                              className="skeleton-box"
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                              }}
                            />
                            <div
                              className="skeleton-box"
                              style={{ width: 100, height: 14, marginLeft: 8 }}
                            />
                          </>
                        ) : (
                          <>
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      {isLoading ? (
                        <>
                          <div
                            className="skeleton-box"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                            }}
                          />
                          <div
                            className="skeleton-box"
                            style={{ width: 100, height: 14, marginLeft: 8 }}
                          />
                        </>
                      ) : (
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    {isLoading ? (
                      <div
                        className="skeleton-box"
                        style={{ width: 60, height: 20 }}
                      />
                    ) : (
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{item.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
