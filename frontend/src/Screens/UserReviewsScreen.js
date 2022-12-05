import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ReviewBox from "../Components/ReviewBox";
import url from "../Constants";

function UserReviewsScreen({ user }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const { data } = await Axios.post(`${url}/orders/getReviews`, {
      customerId: user._id,
    });
    console.log("data of reviews", data);
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="sm:p-8 p-4">
      <h2 className="text-lg font-medium text-center my-4">
        {user.name} Review
      </h2>
      {reviews.map(review => (
        <ReviewBox review={review} />
      ))}
    </div>
  );
}
//....

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(UserReviewsScreen);
