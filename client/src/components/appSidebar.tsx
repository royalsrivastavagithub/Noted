import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className=" p-4 gap-4 flex items-center justify-between">
          <div className="rounded-xs text-white font-bold bg-blue-600 p-2  flex-1 flex items-center justify-center">
            NOTED
          </div>
          <ModeToggle></ModeToggle>
        </div>

        <div className="bg-blue-900 rounded-xs  p-2 flex items-center justify-between">
          <div className="rounded-xs dark:text-white font-bold   flex-1 flex items-center justify-center">
            Username
          </div>
          <div className="rounded-xs text-white font-bold  pr-2 ">
            <Button variant="destructive">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </Button>
          </div>
        </div>
        <hr className="bg-gray-500" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
