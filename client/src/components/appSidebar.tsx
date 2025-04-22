import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from '@/redux/authSlice'; // Adjust path as needed
import { clearUserInfo } from '@/redux/infoSlice';
import { useDispatch } from "react-redux";

export function AppSidebar() {
  const notes = useSelector((state: RootState) => state.notes.notes)
  const username = useSelector((state: RootState) => state.info.username);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserInfo());
  };
  //console.log(notes)
  return (
    <Sidebar>
      <SidebarHeader>
        <div className=" p-4 gap-4 flex items-center justify-between">
          <div className="rounded-xs text-white font-bold bg-blue-600 p-2  flex-1 flex items-center justify-center">
            NOTED
          </div>
          <ModeToggle></ModeToggle>
        </div>

        <div className="bg-blue-600 dark:bg-blue-800 rounded-xs  p-2 flex items-center justify-between">
          <div className="rounded-xs text-white dark:text-white font-bold   flex-1 flex items-center justify-center">
            {username}
          </div>
          <div className="rounded-xs text-white font-bold  pr-2 ">
            <Button className="bg-red-500 hover:bg-red-400" onClick={handleLogout}variant="default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </Button>
          </div>
          
        </div>
        <hr className="bg-gray-500" />
        <div className="notes">
  {notes.map((note,  _id) => (
    <button
      key={ _id}
      className=" truncate w-full text-left p-3 mb-2 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-blue-800 rounded-md"
    >
      {note.title}
    </button>
  ))}
</div>

      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
