import { AddTicket } from "@/features/tickets/AddTicket";
import TicketsTable from "@/features/tickets/TicketsTable";
import useAuth from "@/hooks/auth";


function Tickets(){
    const { user } = useAuth();
    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
                <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Tickets
                </h2>
                <div className="flex items-center space-x-2">
                    <h2>Welcome, {user?.name}!</h2>
                </div>
                </div>
                <div className="flex justify-between">
                {user?.role === 'staff' ? <AddTicket /> : ""}
                {/* <Button variant="secondary">Export csv</Button> */}
                </div>
                <TicketsTable></TicketsTable>
            </div>
        </>
    )
}
export default Tickets;