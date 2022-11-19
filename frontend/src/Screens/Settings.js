import Axios from "axios";
import React from "react";
import { connect } from "react-redux";
import SellerForm from "../Components/SellerForm";
import WorkerForm from "../Components/WorkerForm";
import { DELETE_ACCOUNT } from "../Redux/Constants";
import { useNavigate } from "react-router-dom";

function Settings({ user, deleteAccount }) {
  const navigate = useNavigate();
  const onDelete = () => {
    deleteAccount(user._id, navigate);
  };
  return (
    <div className="p-12 flex flex-col space-y-4">
      <WorkerForm />
      <SellerForm />
      <button onClick={onDelete} className="bg-red-300 w-52 p-3 rounded-md">
        Delete Account
      </button>
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
    deleteAccount: async (id, navigate) => {
      try {
        const response = await Axios.delete(`/api/users/deleteAccount/${id}`);
        console.log("Response", response);
        if (response.status === 200) {
          dispatch({ type: DELETE_ACCOUNT, payload: id });
          alert("User Deleted Successfully");
          navigate("/");
        }
      } catch (err) {
        alert(err.message);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
