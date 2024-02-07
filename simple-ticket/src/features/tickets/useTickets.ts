// import { getTickets } from "@/services/apiTickets";
import { getTickets } from "@/services/apiTickets";
import { useQuery } from "@tanstack/react-query";
// import { useSearchParams} from 'next/navigation';

export function useTickets(){
  const {
      isLoading,
      data:tickets,
      error,
    } = useQuery({
      queryKey: ["tickets"],
      queryFn:() => getTickets(),
    });
      return{isLoading,tickets,error}
}