import useSWR from "swr";
import axios from "axios";

import { Nation } from "@/types";
import { PUBLIC_API } from "@/api";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useNations = () => {
  const { data, error } = useSWR<Nation[]>(`${PUBLIC_API}/nations`, fetcher);

  return {
    nations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
