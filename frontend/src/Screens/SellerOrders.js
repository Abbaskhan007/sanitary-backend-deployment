import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import ViewOrderScreen from "./ViewOrderScreen";
import { IoCreateOutline } from "react-icons/io5";
import Menu from "../Components/Menu";
import moment from "moment";
function SellerOrders({ seller }) {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [model, setModel] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const MENU = ["Pending", "EnRoute", "Delivered", "Cancelled"];

  const tableHeader = [
    "Order ID",
    "Customer",
    "Product",
    "Price",
    "Order Date",
    "Delivery Date",
    "Status",
    "Payment",
    "Update Order",
    "View Order",
  ];

  const fetchOrders = async () => {
    const { data } = await Axios.get(
      `/api/orders/sellerOrders/${seller}?status=${activeTab}`
    );
    setOrders(data);
  };

  const updateOrderStatus = async (orderId, status, storeId) => {
    const { data } = await Axios.put("/api/orders/updateOrder", {
      orderId,
      status,
      storeId,
    });
    setSelectedMenu(status);
    setShowMenu(false);
    console.log("Order Data", data);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab, selectedMenu]);
  console.log("Orders", orders);

  return (
    <div className="sm:px-12 sm:py-8 w-[300px] sm:w-[450px] md:w-[570px] lg:w-[800px] p-4 pt-8 mx-auto  overflow-x-hidden h-[calc(100vh-100px)]">
      <div className="flex flex-row items-center justify-between  sm:px-6 mb-6">
        {model && (
          <ViewOrderScreen
            sellerView={true}
            orderId={orderId}
            setModel={setModel}
          />
        )}
        <h6
          className={` ${
            activeTab === "all"
              ? "border-b-4 border-b-violet-500"
              : "border-b-4 border-b-transparent"
          }  `}
          onClick={() => setActiveTab("all")}
        >
          All Orders
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
        <div
          className={`md:w-[500px] lg:w-[800px] xl:w-[1000px]  overflow-x-scroll`}
        >
          <table>
            <thead class="border-b bg-gray-200">
              <tr>
                {tableHeader.map(item => (
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left whitespace-nowrap"
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
                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.deliveredAt
                      ? moment(order.deliveredAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )
                      : "Not Delivered"}
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
                  <td className="flex justify-center whitespace-nowrap ">
                    <div className="relative ">
                      <IoCreateOutline
                        onClick={() => {
                          setShowMenu(order._id);
                        }}
                        className="cursor-pointer"
                        size={24}
                        color="#8b5cf6"
                      />
                      {showMenu === order._id && (
                        <Menu
                          items={MENU}
                          activeMenu={order.status}
                          orderId={order._id}
                          storeId={order.productId.store}
                          updateOrderStatus={updateOrderStatus}
                        />
                      )}
                    </div>
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
        <div className="flex  h-full items-center justify-center">
          <p className="text-red-400 text-xl font-semibold">
            No Order Available
          </p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  console.log("State", state.seller._id);
  return {
    seller: state.seller._id,
  };
};

export default connect(mapStateToProps)(SellerOrders);
