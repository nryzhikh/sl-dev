import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";
import LoginContainer from "./LoginContainer";
import { Loader2 } from "lucide-react"
import { Toaster } from "@/components/ui/toaster";


const LoginPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authContext?.loading && authContext?.user) {
            navigate("/");
        }
    }, [authContext, navigate]);

    if (authContext?.loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]" >
                <Loader2 className="animate-spin w-14" />
            </div>
        );
    }

    return (
    <> 
    <LoginContainer />
    <Toaster />
    </>
    );
}

export default LoginPage;