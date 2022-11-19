import React, { useEffect, useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import StoreCard from "../Components/StoreCard";

function SellerStores({ seller, store }) {
  console.log("Seller", seller);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, [store]);

  const fetchStores = async () => {
    try {
      const response = await Axios.get(`/api/stores/getStores/${seller._id}`);
      console.log("Response", response);
      setStores(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (stores.length <= 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-center text-2xl  text-gray-500">No Store Present</p>
      </div>
    );
  } else {
    return (
      <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:p-12 p-8 gap-8">
        {stores.map(store => (
          <StoreCard store={store} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    seller: state.seller,
    store: state.store.data,
  };
};

export default connect(mapStateToProps, null)(SellerStores);
