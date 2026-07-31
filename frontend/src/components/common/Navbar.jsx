import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";
import toast from "react-hot-toast";

function Navbar(){
    const{user,logout}=useAuth;
      const navigate = useNavigate();

    const handleLogout=async()=>{
        try{
            await logoutUser();
            logout();
             toast.success("Logged out successfully");
      navigate("/login");
        }
        catch (error) {
      toast.error("Logout failed");
    }
    }
return(
    <nav className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
        <Link to="/dashboard" className="text-2xl font-bold text-cyan-400">
        AI Interview</Link>

        <div className="flex items-center gap-4">
            <span className="text-white">
                Hi,{user?.name || "User"}
            </span>

            <button onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
            >Logout</button>
        </div>
    </nav>
    
)
}
export default Navbar;