// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";

import { useCreateTicket } from "./useCreateTicket";
import { useEditTicket } from "./useEditTicket";


const formSchema = z.object({
  title: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().max(180, {
    message: "Description must be at least 180 characters.",
  }),
});

export function CreateTicketForm({ ticketToEdit = {}}) {
  const { toast } = useToast();
  // const [errors, setErrors] = useState<any>({});

  //for edit 
  let idToUpdate = 0;
  let editValues:any = ticketToEdit;
  const isEditSession = Boolean(editValues._id);
  if(isEditSession){
    idToUpdate = editValues._id;
    editValues = {
      ...editValues,
    };
    console.log(editValues)
  }

  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditSession ? editValues : {
      title: "",
      description:""
    },
  });
  const {createTicket,isCreating} = useCreateTicket();
  const {editTicket,isUpdating} = useEditTicket();
  const isWorking:boolean= isCreating || isUpdating;
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //mutation.mutate(value);
    if(isEditSession){
      editTicket({ticket:values,id:idToUpdate},{onSuccess:()=>{
        // setErrors({});
      },
      onError: (err) => onError(err)
      });
    }else{
      createTicket(values,{onSuccess:()=>{
        form.reset();
        // setErrors({});
      },
      onError: (err) => onError(err)
      });
    }
  }
  
  function onError(errors: any) {
    if (errors.response && errors.response.status === 422) {
      // Validation errors
      // setErrors(errors.response.data.error.errors);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.response.data.error.message,
      });
    } else {
      // Handle other types of errors
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.message,
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Title</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Ticket Title" {...field} />
                </FormControl>
                <FormMessage className="col-span-3"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Description</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage className="col-span-3"/>
              </FormItem>
            )}
          />


          <Button type="submit" disabled={isWorking}>
            {isWorking ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>{" "}
                Processing...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
