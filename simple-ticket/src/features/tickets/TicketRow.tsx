// import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { CreateTicketForm } from "./CreateTicketForm";
import { useState } from "react";
import { useDeleteTicket } from "./useDeleteTicket";
import { useToast } from "@/components/ui/use-toast";
import { CreateTicketForm } from "./CreateTicketForm";
import { Badge } from "@/components/ui/badge";
import { useApproveTicket } from "./useApproveTicket";
import useAuth from "@/hooks/auth";
import { NavLink } from "react-router-dom";


export function TicketRow({ ticket }: any) {
  
  const { user } = useAuth();
  const { toast } = useToast();
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [idToDelete, setidToDelete] = useState();
  const {
    _id: id,
    title,
    description,
    status,
    createdBy,
    assignedTo,
    createdAt,
  } = ticket;

  const { deleteTicket } = useDeleteTicket();
  const { approveTicket } = useApproveTicket();
  const handleDelete = (ticketId: any) => {
    deleteTicket(ticketId, {
      onSuccess: () => {
        //on succcess
      },
      onError: (err) => onError(err),
    });
  };
  const handleApprove = (ticketId: any) => {
    const info = {
      needsMoreInfo: false,
      message: "Submit to review",
    };
    // {ticket:values,id:idToUpdate}
    approveTicket(
      { id: ticketId, info: info },
      {
        onSuccess: () => {
          //on succcess
        },
        onError: (err) => onError(err),
      }
    );
  };
  const handleMoreInfo = (ticketId: any) => {
    const info = {
      needsMoreInfo: true,
      message: "Please Provide More Information",
    };
    // {ticket:values,id:idToUpdate}
    approveTicket(
      { id: ticketId, info: info },
      {
        onSuccess: () => {
          //on succcess
        },
        onError: (err) => onError(err),
      }
    );
  };
  function onError(errors: any) {
    // Handle other types of errors
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: errors.message,
    });
  }
  return (
    <TableRow>
      <TableCell className="py-2">
        {/* <Checkbox
        checked={Array.from(selectedIds).includes(id)}
        onCheckedChange={()=>onHandlecheck(id)}
        /> */}
      </TableCell>
      <TableCell className="py-2">{title}</TableCell>
      <TableCell className="py-2">{description}</TableCell>
      {/* <TableCell className="py-2">{status}</TableCell> */}
      <TableCell className="py-2">
        {status == "submitted" ? (
          <Badge variant="destructive">{status.replace("_", " ")}</Badge>
        ) : (
          <Badge variant="secondary">{status.replace("_", " ")}</Badge>
        )}
      </TableCell>
      <TableCell className="py-2">{createdBy.name}</TableCell>
      <TableCell className="py-2">{assignedTo.name}</TableCell>
      <TableCell className="py-2">{createdAt.split("T")[0]}</TableCell>
      <TableCell className="py-2">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem>
                <NavLink to={`/tickets/${id}`}>

                View
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DialogTrigger asChild>
                  <span className="w-full">Edit</span>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <span
                  onClick={() => {
                    setOpenDelete(true);
                    setidToDelete(id);
                  }}
                >
                  Delete
                </span>
              </DropdownMenuItem>
              {status.split("_")[0] === user?.role ? (
                <DropdownMenuItem asChild>
                  <span
                    onClick={() => {
                      setOpenApprove(true);
                      setidToDelete(id);
                    }}
                  >
                    Review
                  </span>
                </DropdownMenuItem>
              ) : (
                ""
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-md" style={{ maxWidth: 650 }}>
            <DialogHeader>
              <DialogTitle>Edit Ticket</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <CreateTicketForm ticketToEdit={ticket} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>

      {/* delete */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  handleDelete(idToDelete);
                }}
              >
                Yes, delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* approve */}
      <AlertDialog open={openApprove} onOpenChange={setOpenApprove}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve ticket?</AlertDialogTitle>
            <AlertDialogDescription>
              Approve ticket for processing next.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  handleApprove(idToDelete);
                }}
              >
                Approve
              </Button>
            </AlertDialogAction>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  handleMoreInfo(idToDelete);
                }}
              >
                Reject
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableRow>
  );
}