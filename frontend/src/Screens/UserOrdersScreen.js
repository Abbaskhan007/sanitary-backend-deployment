import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ViewOrderScreen from "./ViewOrderScreen";
import { connect } from "react-redux";

function UserOrdersScreen({ navigation, user, admin }) {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [model, setModel] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    let url;
    if (admin) {
      url = `/api/orders/getOrders/${activeTab}`;
    } else {
      url = `/api/orders/myOrders/${user}?status=${activeTab}`;
    }

    try {
      const { data } = await Axios.get(url);
      setOrders(data);
      console.log("Data of orders", data);
      setOrders(data);
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const tableHeader = [
    "Order ID",
    "Customer",
    "Product",
    "Price",
    "Order Date",
    "Delivery Date",
    "Status",
    "Payment",
    "View Order",
  ];
  console.log("Active Tab", activeTab);
  console.log("Order Id", orderId);
  console.log("Orders__________", orders);
  return (
    <div className="sm:px-12 sm:py-8 w-[300px] sm:w-[450px] md:w-[570px] lg:w-[800px] p-4 pt-8 mx-auto  overflow-hidden h-[calc(100vh-100px)]">
      <div className="flex flex-row items-center justify-between  sm:px-6 mb-6 ">
        {model && <ViewOrderScreen orderId={orderId} setModel={setModel} />}
        <h6
          className={` ${
            activeTab === "all"
              ? "border-b-4 border-b-violet-500"
              : "border-b-4 border-b-transparent"
          }  `}
          onClick={() => setActiveTab("all")}
        >
          All
        </h6>
        <h6
          className={`${
            activeTab === "Delivered"
              ? "border-b-4 border-b-violet-500"
              : "border-b-4 border-b-transparent"
          }  `}
          onClick={() => setActiveTab("Delivered")}
        >
          Delivered
        </h6>
        <h6
          className={`${
            activeTab === "Pending"
              ? "border-b-4 border-b-violet-500"
              : "border-b-4 border-b-transparent"
          }  `}
          onClick={() => setActiveTab("Pending")}
        >
          Pending
        </h6>
        <h6
          className={`${
            activeTab === "Cancelled"
              ? "border-b-4 border-b-violet-500"
              : "border-b-4 border-b-transparent"
          }  `}
          onClick={() => setActiveTab("Cancelled")}
        >
          Cancelled
        </h6>
      </div>
      {orders.length > 0 ? (
        <div className={`overflow-x-scroll`}>
          <table className="">
            <thead class="border-b bg-gray-200">
              <tr>
                {tableHeader.map(item => (
                  <th
                    scope="col"
                    class="sm:text-sm text-xs font-medium text-gray-900 px-5 py-3 text-left whitespace-nowrap"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id}
                  </td>
                  <td class="text-sm flex flex-row items-center text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                    <img
                      className="rounded-full w-10 h-10 mr-2"
                      src={order.customerId.profileImage}
                    />
                    {order.customerId.name}
                  </td>
                  <td class="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <img
                      className="rounded-md"
                      src={order.productId.images[0].url}
                    />
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.paymentMethod === "bank" ? "Rs. " : "Eth: "}
                    {order.amount}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.createdAt}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.deliveredAt ?? "Not Delivered"}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <p
                      className={`py-[6px] px-[10px] font-medium rounded-md ${
                        order.status === "Cancelled"
                          ? "bg-red-200 text-red-600"
                          : order.status === "Delivered"
                          ? "bg-green-200 text-green-600"
                          : "bg-orange-200 text-orange-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.paymentMethod}
                  </td>
                  <td className="whitespace-nowrap ">
                    <p
                      onClick={() => {
                        setOrderId(order._id);
                        setModel(true);
                      }}
                      className="bg-gray-200 px-4 text-sm text-gray-600 font-semibold py-2 rounded-md cursor-pointer mr-4"
                    >
                      View Order
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex -mt-12 h-full items-center justify-center">
          <p className="text-red-400 text-xl font-semibold">
            No Order Available
          </p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user._id,
  };
};

export default connect(mapStateToProps)(UserOrdersScreen);
