import useSWR from "swr";
import axios from "axios";
import { Player } from "@/types";
import { PUBLIC_API } from "@/api";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const usePlayers = () => {
  const { data, error } = useSWR<Player[]>(`${PUBLIC_API}/players`, fetcher);

  return {
    players: data,
    isLoading: !error && !data,
    isError: error,
  };
};
