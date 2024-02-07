

import { getTicket } from "@/services/apiTickets";
import { useQuery} from "@tanstack/react-query";

export function useTicket(id:any){
  const {
      isLoading,
      data:ticket,
      error,
    } = useQuery({
      queryKey: ["ticket",id],
      queryFn:() =>  getTicket({id}),
    });
    return {isLoading,ticket,error}
}