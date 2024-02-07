import { useToast } from "@/components/ui/use-toast";
import { reviewTicket } from "@/services/apiTickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useApproveTicket() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: approveTicket, isPending: isDeleting } = useMutation({
    mutationFn: ({id,info}:any) => {
      return reviewTicket(id,info);
    },onSuccess:()=>{
      toast({
        title: "Approve Ticket",
        description: "Ticket have move.",
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
  return {approveTicket,isDeleting};
}