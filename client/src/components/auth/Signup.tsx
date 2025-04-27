import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log(user);
      const idToken = await user.getIdToken();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          email: user.email,
          firebaseUid: user.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`, 
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }

      navigate("/login");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5 items-center justify-center">
          <p className="text-2xl font-bold">Create account</p>
          <p className="text-gray-400 text-md">
            Enter your email and password to create account!
          </p>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full cursor-pointer flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </Button>
        <hr className="w-full border-gray-600 " />

        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
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
            <p>Already have an account? </p>
            <a href="/login" className="underline">
              Sign In
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

export default Signup;
