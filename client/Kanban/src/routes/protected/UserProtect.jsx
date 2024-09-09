import { Navigate } from "react-router-dom";

function UserProtect(props) {
  if (localStorage.getItem("KarbanToken")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default UserProtect;
