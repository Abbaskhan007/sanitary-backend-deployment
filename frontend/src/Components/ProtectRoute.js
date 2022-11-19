import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
const Protected = ({ user, children, actor, role = false }) => {
  console.log("User ()()()()() *****************************" ,actor, user[actor]);
  if (!role && !user?.name) {
    return <Navigate to="/" replace />;
  }
  if (role && !user[actor]) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(Protected);
