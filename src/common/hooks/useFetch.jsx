import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // TODO:  Encapsulate this in services

  async function fetchData() {
    const { data } = await axios.get(
      url
    );
    setData(data);
  }

  return {
    data ,
    setData
  };
};

export default useFetch;
