import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth, fireDB } from "../../fireabase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      setLoading(false);
      return;
    }

    const auth = getAuth();
    try {
      // Check if user already exists
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const userRef = collection(fireDB, "users");
        const newUser = {
          name: name,
          uid: user.uid,
          email: user.email,
          time: Timestamp.now(),
        };
        await addDoc(userRef, newUser);
        toast.success("Signup Successful");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      // Handle specific error codes
      if (error.code === "auth/email-already-in-use") {
        toast.error("You already have an account");
      } else {
        console.error(error);
        toast.error("Failed to register user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        <div className="bg-gray-800 px-10 py-10 rounded-xl">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Signup
            </h1>
          </div>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center mb-3">
            <button
              onClick={signup}
              className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
            >
              Signup
            </button>
          </div>
          <div>
            <h2 className="text-white">
              Have an account{" "}
              <Link className="text-red-500 font-bold" to={"/vjyothi-ecommerce/login"}>
                Login
              </Link>
            </h2>
            <Link className="text-white mt-3 underline" to={"/vjyothi-ecommerce/"}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
