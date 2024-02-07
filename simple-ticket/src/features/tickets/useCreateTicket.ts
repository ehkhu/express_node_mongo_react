import { useToast } from "@/components/ui/use-toast";
import { storeTicket } from "@/services/apiTickets";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTicket() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createTicket, isPending: isCreating } =useMutation({
    mutationFn: (newTicket: any) => {
      console.log('use create ticket',newTicket);
      return storeTicket(newTicket);
    },onSuccess:()=>{
      toast({
        title: "Create ticket",
        description: "New ticket successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
  return {createTicket,isCreating};
}
