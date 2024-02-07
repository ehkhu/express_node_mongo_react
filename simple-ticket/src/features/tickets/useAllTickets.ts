// import { getTickets } from "@/services/apiTickets";

import { getAllTickets } from "@/services/apiTickets";
import { useQuery} from "@tanstack/react-query";

export function useAllTickets(){
  const {
      isLoading,
      data:allTickets,
      error,
    } = useQuery({
      queryKey: ["allTickets"],
      queryFn:getAllTickets,
    });
      return{isLoading,allTickets,error}
}