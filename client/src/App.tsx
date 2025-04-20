import { ThemeProvider } from "@/components/theme-provider"
import Login from "@/pages/login"
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
      <div id="login"  className="absolute inset-0 flex items-center justify-center z-10"><Login></Login></div>

    </ThemeProvider>
  )
}

export default App
