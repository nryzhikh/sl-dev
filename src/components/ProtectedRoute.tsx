import { useContext } from "react"
import { AuthContext } from "@/context/auth.context"
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react"



const ProtectedRoute = () => {
    const authContext = useContext(AuthContext);

    if (authContext?.loading) {
        return <div className="flex items-center justify-center h-[80vh]" >
            <Loader2 className="animate-spin w-14" />
        </div>;
    }

    if (!authContext?.user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;