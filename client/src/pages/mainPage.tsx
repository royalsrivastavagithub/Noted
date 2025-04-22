import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {




  return (
    <div id="mainPage">
    <SidebarProvider>
      <AppSidebar />
      <main>
        {children}
      </main>
    </SidebarProvider>
    
    </div>
  )
}
