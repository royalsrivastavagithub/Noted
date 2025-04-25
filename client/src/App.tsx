import { ThemeProvider } from "@/components/theme-provider"
import Login from "@/pages/login"
import { useSelector } from 'react-redux';
import { RootState } from './redux/store'; // adjust path
import Main from './pages/mainPage'; // adjust path

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
      
      {isLoggedIn ? <Main children /> : <div id="login"  className="absolute inset-0 flex items-center justify-center z-10"><Login></Login></div>}

    </ThemeProvider>
  )
}

export default App
