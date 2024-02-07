import { Button } from "@/components/ui/button";
import { useTicket } from "./useTicket";
import { useParams } from "react-router-dom";
import { useMoveBack } from "@/hooks/useMoveBack";


function TicketDetail(){
  const moveBack = useMoveBack();
  const { ticketId } = useParams();
  const { isLoading, ticket } = useTicket(ticketId);
  
  if (isLoading) return "loading...";
    return(<div className="max-w-xl mx-auto mt-10 bg-white shadow-md overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6 flex justify-between">
      <h2 className="text-lg leading-6 font-medium text-gray-900">Ticket Details</h2>
      <Button onClick={moveBack}>
          &larr; Go back
        </Button>
    </div>
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Title</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{ticket.data.ticket.title}</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Description</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{ticket.data.ticket.description}</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{ticket.data.ticket.status.replace('_',' ').toUpperCase()}</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Created By</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{ticket.data.ticket.createdBy.name}</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Assign To</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{ticket.data.ticket.assignedTo.name}</dd>
        </div>
        <div>
        <div >
      <h2 className="text-lg font-semibold my-4 pl-2">Comments</h2>
      <ul>
        {ticket.data.ticket.comments.map((comment:any) => (
          <li key={comment._id} className="border-gray-200  p-4 mb-4 border-b">
            <div className="flex justify-between">
              <div className="font-semibold">{comment.user.name}</div>
              <div className="text-gray-500 text-sm">{comment.timestamp.split('T')[0]}</div>
            </div>
            <div className="mt-2">{comment.message}</div>
          </li>
        ))}
      </ul>
    </div>
      </div>
        {/* Add more ticket details as needed */}
      </dl>
    </div>
  </div>);
}

export default TicketDetail;
