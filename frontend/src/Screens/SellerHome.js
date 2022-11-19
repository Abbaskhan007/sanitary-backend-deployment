import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FETCH_SELLER_DATA } from "../Redux/Constants";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import Axios from "axios";

function SellerHome({ user, fetchSellerData, seller }) {
  console.log("Seller-----", seller);
  const [sales, setSales] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [totalSales, setTotalSales] = useState(0);
  const [categories, setCategories] = useState({
    Basins: 0,
    Sinks: 0,
    "Bath Tubs": 0,
    Showers: 0,
    Urinals: 0,
    "Squat Toilets": 0,
    "Toilet Seats": 0,
    Mirrors: 0,
  });
  const [blockchainSale, setBlockchainSales] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [bankSales, setBankSales] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [etheriumValue, setEtheriumValue] = useState(0);

  const currentMonth = new Date().getMonth();

  const fetchSales = async () => {
    const { data } = await Axios.get(`/api/seller/getSales/${seller}`);

    const bankSalesPerMonth = data.bankSales.map(item => {
      sales[item._id.month - 1] = sales[item._id.month - 1] + item.sales;
      bankSales[item._id.month - 1] = item.sales;
      setTotalSales(prev => prev + totalSales + item.sales);
    });

    const blockchainSalesPerMonth = data.blockchainSales.map(item => {
      sales[item._id.month - 1] =
        sales[item._id.month - 1] + item.sales * etheriumValue;
      blockchainSale[item._id.month - 1] = item.sales * etheriumValue;
      setTotalSales(prev => prev + item.sales * etheriumValue);
      // totalSales = totalSales + item.sales * etheriumValue;
    });
    data.bankOrders.map(item => {
      categories[item.productId.category] =
        categories[item.productId.category] + item.amount;
    });
    data.blockchainOrders.map(item => {
      categories[item.productId.category] =
        categories[item.productId.category] + item.amount * etheriumValue;
    });

    setSales(sales.slice(0, 12));
    setBlockchainSales(blockchainSale.slice(0, 12));
    setBankSales(bankSales.slice(0, 12));
  };

  const convertToEtherium = async () => {
    const { data } = await Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=pkr&ids=ethereum"
    );
    setEtheriumValue(data[0].current_price);
  };

  useEffect(() => {
    if (etheriumValue > 0) fetchSales();
  }, [etheriumValue]);
  useEffect(() => {
    convertToEtherium();
  }, []);

  const months = [
    { month: "Jan", num: 0 },
    { month: "Feb", num: 1 },
    { month: "Mar", num: 2 },
    { month: "Apr", num: 3 },
    { month: "May", num: 4 },
    { month: "Jun", num: 5 },
    { month: "Jul", num: 6 },
    { month: "Aug", num: 7 },
    { month: "Sep", num: 8 },
    { month: "Oct", num: 9 },
    { month: "Nov", num: 10 },
    { month: "Dec", num: 11 },
  ];

  const labels = [];

  for (var i = 0; i < 12; i++) {
    labels.push(months[(currentMonth + i) % 12]);
  }

  const data = {
    labels: labels.map(item => item.month),
    datasets: [
      {
        label: "Total Sales",
        backgroundColor: "#e11d48",
        borderColor: "#e11d48",
        borderWidth: 4,
        data: labels.map(item => sales[item.num]),
      },
      {
        label: "Blockchain Sales",
        backgroundColor: "#a78bfa",
        borderColor: "#a78bfa",
        data: labels.map(item => blockchainSale[item.num]),
      },
      {
        label: "Bank Sales",
        backgroundColor: "#22c55e",
        borderColor: "#22c55e",
        data: labels.map(item => bankSales[item.num]),
      },
    ],
  };

  useEffect(() => {
    fetchSellerData(user);
  }, []);

  const pielabels = [
    "Basins",
    "Sinks",
    "Bath Tubs",
    "Showers",
    "Urinals",
    "Squat Toilets",
    "Toilet Seats",
    "Mirrors",
  ];
  const pieData = {
    labels: pielabels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#14b8a6",
          "#06b6d4",
          "#8b5cf6",
          "#ec4899",
        ],

        data: Object.values(categories),
      },
    ],
  };

  return (
    <div className="py-8 px-12">
      <div className="flex items-center justify-center space-x-8">
        <div className="w-48 py-6 space-y-2  shadow-lg shadow-gray-400 flex flex-col justify-center items-center border border-gray-300  rounded-lg">
          <h5 className="text-2xl ">Total Sales</h5>
          <h6 className="text-lg text-gray-400">Rs. {totalSales.toFixed(0)}</h6>
        </div>
        <div className="w-48 py-6 space-y-2 shadow-lg shadow-gray-400 flex flex-col justify-center items-center border border-gray-300 rounded-lg">
          <h5 className="text-2xl ">Previous Month</h5>
          <h6 className="text-lg text-gray-400">
            Rs. {sales[(currentMonth -1) % 12].toFixed(0)}
          </h6>
        </div>
      </div>
      <h3 className="text-5xl font-light text-center my-8">Analytics</h3>
      <h3 className="text-4xl font-light my-6">Total Sales</h3>
      <div className="max-w-5xl mx-auto">
        <Line data={data} />
      </div>

      <h3 className="text-4xl font-light mb-6 mt-16">Each Category Sales</h3>
      <div className="max-w-2xl mx-auto">
        <Pie data={pieData} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user._id,
    seller: state.seller._id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSellerData: async user => {
      try {
        const response = await Axios.get(`/api/seller/getSeller/${user}`);
        console.log("Response", response);
        dispatch({ type: FETCH_SELLER_DATA, payload: response.data });
      } catch (err) {
        alert(err.message);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);

