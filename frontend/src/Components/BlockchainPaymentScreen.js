import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { connect } from "react-redux";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { EMPTY_CART } from "../Redux/Constants";
import url from "../Constants";

function BlockchainPaymentScreen({
  user,
  shippingAddress,
  paymentMethod,
  products,
  cart,
  emptyCart,
}) {
  const WALLET_ADDRESS = "0x917A2Eb08f1374608d8afe2Ddf32efb70144Fd75";
  const navigate = useNavigate();
  console.log("Products________", products, "cart_______", cart);
  const location = useLocation();
  const { amount } = location.state;
  const [currentAccount, setCurrentAccount] = useState("");
  const [etheriumValue, setEtheriumValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [etheriumPrice, setEtheriumPrice] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { ethereum } = window;
  console.log("------", user, shippingAddress, paymentMethod, products, cart);
  // const convertToEtherium = async amt => {
  //   Axios.get(
  //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=pkr&ids=ethereum"
  //   ).then(res => {
  //     console.log("****** res *******", res);
  //     setEtheriumPrice((amt / res.data[0].current_price).toFixed(6));
  //     return (amt / res.data[0].current_price).toFixed(6);
  //   });
  // };

  const convertToEtherium = async () => {
    const { data } = await Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=pkr&ids=ethereum"
    );
    setEtheriumValue(data[0].current_price);
    setEtheriumPrice((amount / data[0].current_price).toFixed(6));
  };

  console.log("", etheriumPrice);

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    console.log("_______________");
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      //window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          transaction => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log("Etherium contract: ", provider, signer, transactionsContract);
    return transactionsContract;
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(etheriumPrice + "");

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: WALLET_ADDRESS,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await transactionsContract.addToBlockchain(
          WALLET_ADDRESS,
          parsedAmount,
          "",
          ""
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();

        const orderData = {
          customerId: user,
          shippingAddress: shippingAddress,
          paymentMethod,

          contractAddress: transactionHash.hash,
        };

        console.log("Products", products);

        const promise = products.map(async product => {
          console.log(
            "---------- Etherium Price ********",
            convertToEtherium(product.price)
          );
          const { data } = await Axios.post(`${url}/orders/create`, {
            ...orderData,
            amount: (product.price / etheriumValue).toFixed(6),
            ...product,
          });
          console.log("Data", data);
        });
        console.log("PRomises", promise);
        Promise.all(promise).then(() => {
          console.log("-----------");
        });
        setShowModal(true);
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        //window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    convertToEtherium(amount);
    checkIfWalletIsConnect();
  }, []);

  useEffect(() => {
    if (!currentAccount) {
      console.log("Connecting Wallet");
      connectWallet();
    } else if (currentAccount && etheriumPrice > 0) {
      console.log("Sending transaction");
      sendTransaction();
    }
  }, [currentAccount, etheriumPrice]);

  const onOk = () => {
    emptyCart(user);
    navigate("/");
    setShowModal(false);
  };

  const Model = () => {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="sm:text-2xl text-xl font-semibold">
                  Order Completed
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Order Placed Successfully. Thank you for purchasing.
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onOk}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  console.log("Current Account: ", currentAccount);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex  items-center justify-center min-h-[calc(100vh-150px)]">
      {showModal && <Model />}

      <p className="text-xl font-semibold text-center">Sending Etherium</p>
    </div>
  );
}

const mapStateToProps = state => {
  const products = state.cart.cart.map(item => ({
    productId: item.product._id,
    quantity: item.quantity,
    sellerId: item.product.seller,
    storeId: item.product.store,
    price: (item.product.price + item.product.shippingPrice) * item.quantity,
  }));
  return {
    seller: state.seller,
    user: state.user.user._id,
    shippingAddress: state.cart.shipping._id,
    paymentMethod: state.cart.payment,
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: async userId => {
      console.log("Emptying Cart------");
      const { data } = await Axios.delete(`${url}/cart/emptyCart/${userId}`);
      console.log("Data of empty cart-----", data);
      dispatch({ type: EMPTY_CART });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockchainPaymentScreen);
