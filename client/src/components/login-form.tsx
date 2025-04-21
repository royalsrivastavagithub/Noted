import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import img from "@/assets/Noted.png";
import axios from "axios";
import React, { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog"; // Import the AlertDialog components

const handleSignup = async (
  username: string,
  password: string,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("Signup Clicked!");

  // Clear any previous success or error messages
  setMessage(null);
  setIsSuccess(false);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/signup`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Signup success:", response.data);
    setMessage("Account successfully created!"); // Set success message
    setIsSuccess(true); // Mark as success
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.response?.data || error.message);
      setMessage(error.response?.data.error || error.message); // Set the error message
      setIsSuccess(false); // Mark as error
    } else {
      console.error("Unexpected error:", error);
      setMessage("Something went wrong"); // Set a generic error message
      setIsSuccess(false); // Mark as error
    }
  }
};

const handleLogin = async (
  username: string,
  password: string,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>, // used for both success/error
  setIsLoggedIn: () => void
) => {
  console.log("Login Clicked!");

  // Clear any previous success or error messages
  setMessage(null);
  setIsSuccess(false);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // for httpOnly cookies
      }
    );

    setMessage("Login successful!");
    setIsSuccess(true); // Mark as success
    setIsLoggedIn(); // Mark as logged in (context will handle this)
    console.log(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setMessage(error.response?.data.error || "Login failed");
      setIsSuccess(false); // Mark as error
    } else {
      setMessage("Something went wrong");
      setIsSuccess(false); // Mark as error
    }
  }
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null); // Unified message state
  const [isSuccess, setIsSuccess] = useState<boolean>(true); // Flag to differentiate between success or error

  return (
    <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0 ">
          <CardContent className="grid flex-row p-0 md:grid-cols-2">
            <div id="form">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-500">
                      <h1 className="text-2xl font-bold p-1 text-white">NOTED</h1>
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
                      onClick={() =>
                        handleLogin(
                          username,
                          password,
                          setMessage, // unified for both errors and success
                          setIsSuccess,
                          () => {} // setIsLoggedIn() will come from context
                        )
                      }
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full font-bold"
                      onClick={() =>
                        handleSignup(username, password, setMessage, setIsSuccess)
                      }
                    >
                      Create Account
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
            <div id="image" className="relative hidden md:block ">
              <img src={img} alt="Image" className="h-full w-full object-cover" />
            </div>
          </CardContent>
        </Card>
      </div>

      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <AlertDialog open={true}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{isSuccess ? "Success" : "Error"}</AlertDialogTitle>
                <AlertDialogDescription>{message}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setMessage(null)}>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
