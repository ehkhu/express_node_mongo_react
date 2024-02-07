import { useToast } from "@/components/ui/use-toast";
import { updateTicket } from "@/services/apiTickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditTicket() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editTicket, isPending: isUpdating } =useMutation({
    mutationFn: ({ticket,id}:any) => {
      console.log('use ticket ticket',ticket,id);
      return updateTicket(ticket,id);
    },onSuccess:()=>{
      toast({
        title: "Update Ticket",
        description: "Ticket successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
  return {editTicket,isUpdating};
}