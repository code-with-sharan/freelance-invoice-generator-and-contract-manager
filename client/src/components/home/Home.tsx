import { signOut } from "firebase/auth";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const Home = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Welcome Home
      <Button className="cursor-pointer" onClick={handleSignout}>
        Signout
      </Button>
    </div>
  );
};

export default Home;
