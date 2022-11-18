import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePostSection from "../../components/createPostSection";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import ActivationPopup from "./activationPopup";
import "./style.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function Activation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();

  useEffect(() => {
    activateAccount();
  }, []);
  // activate user account through email verification link
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      // set verify to true
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });
      // redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="home">
      {/* if account activated successfully */}
      {success && (
        <ActivationPopup
          type="success"
          header="Account verification succeded."
          text={success}
          loading={loading}
        />
      )}
      {/* if an error occurs while activating the account */}
      {error && (
        <ActivationPopup
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      {/* default home page display */}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <CreatePostSection user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
