import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStores } from "../redux/storeSlice";

function useGetStores() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchStores = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/store/all`
        );
        console.log("Fetched response is", res);
        dispatch(setStores(res.data));
        console.log("Dispatched setStores with:", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
  }, [dispatch]);
}

export default useGetStores;
