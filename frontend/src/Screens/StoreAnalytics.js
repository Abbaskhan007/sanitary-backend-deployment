// import React from "react";
// import { useParams } from "react-router-dom";

// export default function StoreAnalytics() {
//   const { id } = useParams();
//   console.log("Id", id);
//   return <div>StoreAnalytics</div>;
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import Axios from "axios";
import DateRange from "../Components/DateRange";
import { MdCancel } from "react-icons/md";

export default function StoreAnalytics() {
  const { id } = useParams();
  const [sales, setSales] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [showDate, setShowDate] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [methodType, setMethodType] = useState({
    bank: 0,
    blockchain: 0,
  });
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

  const onDateSearch = async () => {
    const { data } = await Axios.get(
      `/api/orders/storeDateSale/${id}?startDate=${startDate.toISOString()}&&endDate=${endDate.toISOString()}`
    );

    console.log("Data------", data);
    //setTotalSales(data.totalSales[0].sales);
    const ctgInside = {
      Basins: 0,
      Sinks: 0,
      "Bath Tubs": 0,
      Showers: 0,
      Urinals: 0,
      "Squat Toilets": 0,
      "Toilet Seats": 0,
      Mirrors: 0,
    };
    const paymentInside = { bank: 0, blockchain: 0 };
    let total = 0;
    data.paymentSales.map(item => {
      if (item._id.method === "blockchain") {
        //categories[item._id.method] = item.sales * etheriumValue;
        paymentInside[item._id.method] = item.sales * etheriumValue;
        total += item.sales * etheriumValue;
      } else {
        paymentInside[item._id.method] = item.sales;
        //categories[item._id.method] = item.sales;
        total += item.sales;
      }
    });

    data.bankOrders.map(item => {
      ctgInside[item.productId.category] =
        ctgInside[item.productId.category] + item.amount;
    });
    data.blockchainOrders.map(item => {
      ctgInside[item.productId.category] =
        ctgInside[item.productId.category] + item.amount * etheriumValue;
    });

    setMethodType(paymentInside);
    setTotalSales(total);
    setCategories(ctgInside);

    //console.log("Data -----------", data.totalSales[0].sales, data);
  };

  const fetchSales = async () => {
    console.log("---------total sales", totalSales);

    const { data } = await Axios.get(
      `/api/orders/storeSale/${id}?startDate=${startDate.toISOString()}&&endDate=${endDate.toISOString()}`
    );

    console.log("Data --------", data);
    let total = 0;
    const sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const blockchainSale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const bankSales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const ctgInside = {
      Basins: 0,
      Sinks: 0,
      "Bath Tubs": 0,
      Showers: 0,
      Urinals: 0,
      "Squat Toilets": 0,
      "Toilet Seats": 0,
      Mirrors: 0,
    };
    const typeInside = { bank: 0, blockchain: 0 };

    const bankSalesPerMonth = data.bankSales.map(item => {
      sales[item._id.month - 1] = sales[item._id.month - 1] + item.sales;
      bankSales[item._id.month - 1] = item.sales;
      total += item.sales;
    });

    const blockchainSalesPerMonth = data.blockchainSales.map(item => {
      sales[item._id.month - 1] =
        sales[item._id.month - 1] + item.sales * etheriumValue;
      blockchainSale[item._id.month - 1] = item.sales * etheriumValue;
      total += item.sales * etheriumValue;
      // totalSales = totalSales + item.sales * etheriumValue;
    });
    setTotalSales(total);
    data.bankOrders.map(item => {
      typeInside[item.paymentMethod] =
        typeInside[item.paymentMethod] + item.amount;
      ctgInside[item.productId.category] =
        ctgInside[item.productId.category] + item.amount;
    });
    data.blockchainOrders.map(item => {
      typeInside[item.paymentMethod] =
        typeInside[item.paymentMethod] + item.amount * etheriumValue;
      ctgInside[item.productId.category] =
        ctgInside[item.productId.category] + item.amount * etheriumValue;
    });

    setSales(sales.slice(0, 12));
    setBlockchainSales(blockchainSale.slice(0, 12));
    setBankSales(bankSales.slice(0, 12));
    setCategories(ctgInside);
    setMethodType(typeInside);
  };

  const convertToEtherium = async () => {
    const { data } = await Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=pkr&ids=ethereum"
    );
    setEtheriumValue(data[0].current_price);
  };

  console.log("Sales Total", totalSales);

  useEffect(() => {
    if (etheriumValue > 0 && !showDate) {
      fetchSales();
    }
  }, [etheriumValue, showDate]);

  useEffect(() => {
    convertToEtherium();
  }, []);

  useEffect(() => {
    if (showDate) {
      onDateSearch();
    }
  }, [startDate, endDate, showDate]);

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

  const piePaymentlabels = ["Blockchain", "Bank"];

  const piePaymentData = {
    labels: piePaymentlabels,
    datasets: [
      {
        label: "Payment Method",
        backgroundColor: ["#8b5cf6", "#ec4899"],

        data: Object.values(methodType),
      },
    ],
  };

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
        label: "Categories Sale",
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

  console.log("Id", id);
  return (
    <div className="py-8 px-12">
      <h3 className="text-5xl font-light text-center my-8">Analytics</h3>
      <div className="flex items-center justify-center space-x-8">
        <div className="w-48 py-6 space-y-2  shadow-lg shadow-gray-400 flex flex-col justify-center items-center border border-gray-300  rounded-lg">
          <h5 className="text-2xl ">Total Sales</h5>
          <h6 className="text-lg text-gray-400">
            Rs. {totalSales?.toFixed(0)}
          </h6>
        </div>
        <div className="w-48 py-6 space-y-2 shadow-lg shadow-gray-400 flex flex-col justify-center items-center border border-gray-300 rounded-lg">
          <h5 className="text-2xl ">Previous Month</h5>
          <h6 className="text-lg text-gray-400">
            Rs. {sales[(currentMonth - 1) % 12].toFixed(0)}
          </h6>
        </div>
      </div>

      {showDate ? (
        <>
          <p className=" flex justify-center my-4">
            <MdCancel
              onClick={() => setShowDate(false)}
              className="text-blue-500 cursor-pointer"
              size={32}
            />
          </p>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <h3 className="text-4xl font-light mb-6 mt-16">
            Each Category Sales
          </h3>
          <div className="max-w-2xl mx-auto">
            <Pie data={pieData} />
          </div>
          <h3 className="text-4xl font-light mb-6 mt-16">
            Payment Method Sales
          </h3>
          <div className="max-w-2xl mx-auto">
            <Pie data={piePaymentData} />
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => setShowDate(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold ml-auto self-end cursor-pointer w-36 text-center mt-4"
          >
            Filtered Date
          </div>
          <h3 className="text-4xl font-light my-6">Total Sales</h3>
          <div className="max-w-5xl mx-auto">
            <Line data={data} />
          </div>

          <h3 className="text-4xl font-light mb-6 mt-16">
            Each Category Sales
          </h3>
          <div className="max-w-2xl mx-auto">
            <Pie data={pieData} />
          </div>
          <h3 className="text-4xl font-light mb-6 mt-16">
            Payment Method Sales
          </h3>
          <div className="max-w-2xl mx-auto">
            <Pie data={piePaymentData} />
          </div>
        </>
      )}
    </div>
  );
}
