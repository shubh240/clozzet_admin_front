import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../redux/authSlice"; // adjust path

const useVerifyAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/auth/verify`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200 && res.data.auth) {
          dispatch(setAuthStatus({ status: true, userData: res.data.user }));
        } else {
          dispatch(setAuthStatus({ status: false, userData: null }));
        }
      } catch (err) {
        console.error("Verification failed", err);
        dispatch(setAuthStatus({ status: false, userData: null }));
      }
    };

    verifyAuth();
  }, [dispatch]);
};

export default useVerifyAuth;
