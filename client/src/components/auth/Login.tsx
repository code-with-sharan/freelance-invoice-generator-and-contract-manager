import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();// for google signin

  const onLoginHandler = async (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // google signin
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 items-center justify-center">
          <p className="text-2xl font-bold">Sign In</p>
          <p className="text-gray-400 text-md">
            Enter your email and password to Sign In!
          </p>
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={signInWithGoogle}
          className="w-full cursor-pointer flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
        <hr className="w-full border-gray-600 " />
        <form className="flex flex-col gap-4" onSubmit={onLoginHandler}>
          <Input
            placeholder="abc@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Input>
          <Input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Input>
          <div className="flex justify-between text-sm">
            <p>Don't have an account? </p>
            <a href="/register" className="underline">
              Sign Up
            </a>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
