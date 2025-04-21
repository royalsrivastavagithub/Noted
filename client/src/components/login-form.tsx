import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import img from "@/assets/Noted.png";
import axios from "axios";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

// Redux imports
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/redux/authSlice"; // adjust path if needed
import { setUserInfo } from "@/redux/infoSlice";  // adjust the path as necessary
import { AppDispatch } from "@/redux/store"; // adjust the path to your store file


const handleSignup = async (
  username: string,
  password: string,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>> // Add setIsLoading here
) => {
  setMessage(null);
  setIsSuccess(false);
  setIsCreating(true); // Set loading state to true when the request starts
  console.log("disableing signup button")
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/signup`,
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Signup success:", response.data);
    setMessage("Account successfully created!");
    setIsSuccess(true);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.response?.data || error.message);
      setMessage(error.response?.data.error || error.message);
      setIsSuccess(false);
    } else {
      console.error("Unexpected error:", error);
      setMessage("Something went wrong");
      setIsSuccess(false);
    }
  } finally {
    setIsCreating(false); // Set loading state to false when the request completes (success or error)
    console.log("enabling signup button")
  }
};

const handleLogin = async (
  username: string,
  password: string,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,  // Pass the dispatch function as a parameter
  onLoginSuccess: () => void
) => {
  setMessage(null);
  setIsSuccess(false);
  setIsLoading(true);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    // Dispatch user info to Redux store
    dispatch(setUserInfo({ username: username, token: response.data.token }));
    dispatch(loginAction());  // ✅ Redux login action
    
    onLoginSuccess(); // You can call any post-login action you need here
    

  } catch (error) {
    if (axios.isAxiosError(error)) {
      setMessage(error.response?.data.error || "Login failed");
      setIsSuccess(false);
    } else {
      setMessage("Something went wrong");
      setIsSuccess(false);
    }
  } finally {
    setIsLoading(false);
  }
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch<AppDispatch>(); // 👈 Redux dispatch
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid flex-row p-0 md:grid-cols-2">
            <div id="form">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-500">
                      <h1 className="text-2xl font-bold p-1 text-white">
                        NOTED
                      </h1>
                    </div>
                    <p className="text-muted-foreground text-balance">
                      Create or Login in your NOTED account
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="w-full font-bold"
                      disabled={isLoading}
                      onClick={() =>
                        handleLogin(
                          username,
                          password,
                          setMessage,
                          setIsSuccess,
                          setIsLoading,
                          dispatch, // Passing dispatch here
                          () => dispatch(loginAction()) // ✅ Redux login action
                        )
                      }
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <Button
                      className="w-full font-bold"
                      disabled={isCreating} 
                      onClick={() =>
                        handleSignup(
                          username,
                          password,
                          setMessage,
                          setIsSuccess,
                          setIsCreating
                        )
                      }
                    >
                      {isCreating ? "Creating..." : "Create Account"}
                    </Button>
                  </div>
                </div>
              </div>
              <div id="owner" className="p-5">
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Created by : Royal Srivastava
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2">
                  <a
                    className="items-center justify-self-center"
                    href="https://github.com/royalsrivastavagithub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="font-bold" variant="link">
                      Github
                    </Button>
                  </a>
                  <a
                    className="items-center justify-self-center"
                    href="https://www.linkedin.com/in/royal-srivastava-9ab957225/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="font-bold" variant="link">
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div id="image" className="relative hidden md:block">
              <img
                src={img}
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <AlertDialog open={true}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isSuccess ? "Success" : "Error"}
                </AlertDialogTitle>
                <AlertDialogDescription>{message}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setMessage(null)}>
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
