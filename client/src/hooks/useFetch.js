import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url, dependencies = []) {
  let [data, setData] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await axios.get(url);
        setData(res.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, ...dependencies]);

  return [data, setData, error, loading];
}

export { useFetch };
