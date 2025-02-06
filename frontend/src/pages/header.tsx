import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import ToastMessage from "./toastmessage";
import { motion, AnimatePresence } from "framer-motion";



function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signUp");
  const { login, logout, user } = useAuth();

  // Close modal when clicking outside
  const handleBackgroundClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <>

      <header className="bg-white p-4">
        <nav className="bg-gray-300 flex items-center justify-between shadow-lg rounded-xl px-6 py-3">
          <div className="flex items-center" style={{ width: "300px", height: "78px" }}>
            <img
              src="/logo.gif"
              alt="Logo"
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer w-full h-full"
            />
          </div>
          <ul className="flex space-x-6">
            <li><Link to="/home" className="text-gray-700 hover:text-gray-800 text-lg w-32 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition">Home</Link></li>
            <li><Link to="/upload" className="text-gray-700 hover:text-gray-800 text-lg w-32 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition">Upload</Link></li>
            <li><Link to="/explorer" className="text-gray-700 hover:text-gray-800 text-lg w-32 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition">Explorer</Link></li>
            <li>
              {user ? (
                <button onClick={logout} className="text-gray-700 hover:text-gray-800 text-lg w-32 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition">Logout</button>
              ) : (
                <button onClick={() => setIsPopupOpen(true)} className="text-gray-700 hover:text-gray-800 text-lg w-32 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition">Sign Up</button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <AnimatePresence>

      {isPopupOpen && (
        < motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm"
        // initial={{ y: 50, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // exit={{ rotateY: 90, opacity: 1 }} // Flip on close  
        // transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
        onClick={handleBackgroundClick}>
          <motion.div className="bg-gray-300 p-6 rounded-xl shadow-xl max-w-md w-full relative" 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }} // Flip on close
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
          onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsPopupOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
              <IoClose className="text-2xl" />
            </button>
            <div className="flex justify-center mb-4">
              <button onClick={() => setActiveTab("signIn")} className={`text-lg px-6 py-2 rounded-lg transition duration-300 cursor-pointer ${activeTab === "signIn" ? "bg-white font-bold border-b-2 border-indigo-300" : "text-gray-600"}`}>Sign In</button>
              <button onClick={() => setActiveTab("signUp")} className={`text-lg px-6 py-2 rounded-lg transition duration-300 cursor-pointer ${activeTab === "signUp" ? "bg-white font-bold border-b-2 border-indigo-300" : "text-gray-600"}`}>Sign Up</button>
            </div>
            {activeTab === "signUp" ? <SignUpForm login={login} /> : <SignInForm login={login} />}
             {/* Social Logins */}
             <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">Or continue with</p>
              <div className="flex justify-center gap-4 mt-2">
                <motion.button className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-md hover:bg-gray-200 transition"
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{  opacity: 0 }} // Flip on close
                 transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
                >
                  <FcGoogle className="text-2xl" /> Google
                </motion.button>
                <motion.button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{  opacity: 0 }} // Flip on close
                 transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
                >
                  <FaFacebook className="text-2xl" /> Facebook
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );

function SignUpForm({ login }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", {
        name,
        email,
        password,
      });
    
      console.log("Signup Success:", response.data);
      login(response.data.user);
      setIsPopupOpen(false);
      
      ToastMessage(`${response.data.user.name}-${response.data.message}`, "success");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Handle errors returned from the backend
        if (error.response) {
          console.error("Backend Error:", error.response.data.error);
         
          ToastMessage(`${error.response.data.error}`, "warning");
          // alert(error.response.data.error || "Signup failed. Please try again.");
        } else if (error.request) {
          // No response from server
          console.error("No response received:", error.request);
         
          ToastMessage("No response from the server. Please check your internet connection.", "error");
        } else {
          // Other errors (e.g., client-side issues)
          console.error("Error setting up request:", error.message);
          
          ToastMessage("Something went wrong. Please try again.", "error");
        }
      } else {
        console.error("Unexpected Error:", error);
        
        ToastMessage("An unexpected error occurred. Please try again.", "error");
      }
    }
    
  };

  return (
    <motion.form onSubmit={handleSignUp} className="mt-4 space-y-4"
    initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{  opacity: 0 }} // Flip on close
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
          >
      <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg">Sign Up</button>
    </motion.form>
  );
}

function SignInForm({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
     
        email,
        password,
      });
    
      console.log("Signup Success:", response.data);
      let user = {
        name: response.data.user.name,
        email: response.data.user.email,
      };
      login(user);
      setIsPopupOpen(false);
      
      ToastMessage(`${response.data.user.name}-${response.data.message}`, "success");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Handle errors returned from the backend
        if (error.response) {
          console.error("Backend Error:", error.response.data.error);
          ToastMessage(`${error.response.data.error}`, "warning");
          
          // alert(error.response.data.error || "Signup failed. Please try again.");
        } else if (error.request) {
          // No response from server
          console.error("No response received:", error.request);
         
          ToastMessage("No response from the server. Please check your internet connection.", "error");
        } else {
          // Other errors (e.g., client-side issues)
          console.error("Error setting up request:", error.message);
          
          ToastMessage("Something went wrong. Please try again.", "error");

        }
      } else {
        console.error("Unexpected Error:", error);
        ToastMessage("An unexpected error occurred. Please try again.", "error");
      }
    }
  };

  return (
    <motion.form onSubmit={handleSignIn} className="mt-4 space-y-4"
    initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{  opacity: 0 }} // Flip on close
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg">Sign In</button>
    </motion.form>
  );
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    ToastMessage("Logged out successfully", "success");
    

  };



  return { user, login, logout };
}
}

export default Header;
