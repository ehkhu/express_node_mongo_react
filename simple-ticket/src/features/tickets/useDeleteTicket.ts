import { useToast } from "@/components/ui/use-toast";
import { destoryTicket } from "@/services/apiTickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTicket() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteTicket, isPending: isDeleting } = useMutation({
    mutationFn: (ticketId: any) => {
      return destoryTicket(ticketId);
    },onSuccess:()=>{
      toast({
        title: "Delete Ticket",
        description: "Ticket successfully delete",
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
  return {deleteTicket,isDeleting};
}