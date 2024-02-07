import { Outlet } from "react-router-dom";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import useAuth from "@/hooks/auth";

function AppLayout() {
  const { user } = useAuth();
  return (
    <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav user={user} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <main><Outlet/></main>
        </div>
      </div>
  );
}

export default AppLayout;