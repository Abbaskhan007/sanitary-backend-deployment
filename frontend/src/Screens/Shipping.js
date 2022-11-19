import React, { useState, useEffect } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { connect } from "react-redux";
import { SAVE_SHIPPING_DETAILS } from "../Redux/Constants";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBox from "../Components/ErrorBox";
import AddressBox from "../Components/AddressBox";
import Axios from "axios";

function ShippingScreen({ user, saveShipping }) {
  const [shippingData, setShippingData] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectShippingAddress, setSelectShippingAddress] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  console.log("Params", params);

  const onSubmitHandler = () => {
    if (name && address && city && country && postalCode) {
      saveShipping({ name, address, city, country, postalCode });
      navigate("/paymentMethod");
    } else {
      setError(true);
    }
  };
  console.log("User...", user);

  const fetchAddresses = async () => {
    const { data } = await Axios.get(`api/shippingAddress/${user._id}`);
    setShippingData(data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (!user.name) {
      navigate("/login");
    }
  }, []);

  console.log(name, address, city, country, postalCode);

  return (
    <div className="sm:px-12 px-6 min-h-[calc(100vh-150px)] ">
      <CheckoutSteps step={2} />

      <div className="flex items-center justify-center">
        <div className="flex  justify-center flex-col sm:w-[500px] w-[90%]">
          {error && <ErrorBox message="Fill all the values" variant="fail" />}
          <div
            onClick={() =>
              navigate("/shippingAddressFormScreen", {
                state: { action: "new" },
              })
            }
            className="bg-violet-200 border p-[6px] rounded-md mb-8 border-violet-600 cursor-pointer"
          >
            <p className="text-violet-600 text-center text-medium font-medium">
              Add Shipping Address
            </p>
          </div>
          <div>
            {shippingData.map(item => (
              <AddressBox
                address={item}
                item={item}
                selectShippingAddress={setSelectShippingAddress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveShipping: data => {
      dispatch({
        type: SAVE_SHIPPING_DETAILS,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingScreen);
