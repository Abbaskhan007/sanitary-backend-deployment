import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorBox from "../Components/ErrorBox";
import { UPDATE_PROFILE } from "../Redux/Constants";
import { BiPencil } from "react-icons/bi";
import url from "../Constants";

function UserInfoScreen({ userData, updateProfile }) {
  
  const { userId } = useParams();
  const [user, setUser] = useState(userData);
  console.log("Before*****************", userData,"____", user)
  const [name, setName] = useState(user.name || "");
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [address, setAddress] = useState(user.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);



  const getUserData = async () => {
    const { data } = await Axios.get(`${url}/users/getInfo/${userId}`);
    console.log("UseEffect Data", data);
    setUser(data);
  };

  const imageChangeHandler = async e => {
    setLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "sanitary");
    data.append("folder", "users");
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
      data
    );
    setProfileImage(response.data.url);
    setLoading(false);
  };

  const onSubmit = () => {
    setErrorMsg(null);
    if (!password) {
      updateProfile({
        _id: user._id,
        name,
        email,
        phoneNumber,
        profileImage,
        address,
      });
    } else {
      if (newPassword !== confirmPassword) {
        setErrorMsg("New Password is not equal to Confirm New Password");
      } else if (newPassword.length < 6 || confirmPassword.length < 6) {
        setErrorMsg("New Password is not equal to Confirm New Password");
      } else {
        updateProfile({
          _id: user._id,
          name,
          email,
          phoneNumber,
          profileImage,
          address,
          password: password,
          hashPassword: user.password,
          newPassword,
        });
      }
    }
  };

  const openImageSelecter = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    getUserData();
  }, [userData]);
  console.log(user, name, email);
  return (
    <div className="flex flex-1 flex-col justify-center h-full w-full sm:p-20 p-8">
      {errorMsg && <ErrorBox variant="fail" message={errorMsg} />}
      <div className="flex items-center space-x-8 relative ">
        <img
          onClick={openImageSelecter}
          className="w-32 h-32 rounded-full "
          src={profileImage || "https://wallpaperaccess.com/full/2213424.jpg"}
        />
        <BiPencil
          onClick={openImageSelecter}
          className="absolute bg-violet-500 p-1 rounded-full cursor-pointer  left-[78px] bottom-6 text-white"
          size={22}
        />
        <input
          ref={imageRef}
          className="hidden"
          type="file"
          onChange={imageChangeHandler}
        />
        <div >
          <h3 className="text-2xl font-medium">{user.name}</h3>
          <h6 className="text-sm text-gray-500">Newyork, USA</h6>
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-col my-4">
          <label className="text-sm my-1 text-gray-500">Name</label>
          <input
            onChange={e => setName(e.target.value)}
            className="outline-none border border-gray-300 px-4 py-1 rounded-md bg-gray-100 sm:w-[400px] "
            value={name}
            placeholder="Enter User Name"
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-sm my-1 text-gray-500">Email</label>
          <input
            onChange={e => setEmail(e.target.value)}
            className="outline-none border border-gray-300 px-4 py-1 rounded-md bg-gray-100 sm:w-[400px] "
            value={email}
            placeholder="Enter User Email"
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-sm my-1 text-gray-500">Phone Number</label>
          <input
            onChange={e => setPhoneNumber(e.target.value)}
            className="outline-none border border-gray-300 px-4 py-1 rounded-md bg-gray-100 sm:w-[400px] "
            value={phoneNumber}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-sm my-1 text-gray-500">Address</label>
          <input
            onChange={e => setAddress(e.target.value)}
            className="outline-none border border-gray-300 px-4 py-1 rounded-md bg-gray-100 sm:w-[400px] "
            value={address}
            placeholder="Enter Your Address"
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-sm my-1 text-gray-500">
            Enter Current Password
          </label>
          <input
            onChange={e => setPassword(e.target.value)}
            className="outline-none border border-gray-300 px-4 py-1 rounded-md bg-gray-100 sm:w-[400px] "
            value={password}
            placeholder="Enter Your Current Password"
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-sm my-1 text-gray-500">New Password</label>
          <input
            onChange={e => setNewPassword(e.target.value)}
            className="outline-none border border-gray-300 px-4 py-1 rounded-md bg-gray-100 sm:w-[400px] "
            value={newPassword}
            placeholder="Enter New Password"
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-sm my-1 text-gray-500">
            Confirm New Password
          </label>
          <input
            onChange={e => setConfirmPassword(e.target.value)}
            className="outline-none border border-gray-300 px-4 py-1 rounded-md bg-gray-100 sm:w-[400px] "
            value={confirmPassword}
            placeholder="Confirm Your Password"
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={loading}
        className={`text-lg disabled:opacity-40 disabled:cursor-wait cursor-pointer
        bg-violet-500 rounded-md text-center text-white w-44 p-2 `}
      >
        Save Changes
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: async userData => {
      const { data } = await Axios.post(`${url}/users/updateProfile`, userData);
      console.log("Updated user profile data", data);
      dispatch({
        type: UPDATE_PROFILE,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen);
