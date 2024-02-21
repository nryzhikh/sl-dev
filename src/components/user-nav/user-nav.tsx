import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext, useState } from 'react';
import { AuthContext } from "@/context/auth.context"
import { Loader2 } from "lucide-react";
import { apiLogout } from "@/api/api";
import { LockOpen2Icon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";

export function UserNav() {

  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleCheckedChange = () => {
    if (authContext) {
      authContext.setNoValidation(!authContext.noValidation);
    }
  };

  const handleLogout = async () => {
    if (authContext?.user) {
      setLoading(true);
      try {
        await apiLogout();
      } catch (error) {
        console.log(error);
      }
      authContext.setUser(null);
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="border-none rounded-full w-9 h-9 mb-1">
            <LockOpen2Icon className="w-5 h-5 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {useContext(AuthContext)?.user?.username}
              </p>
                {(
                  useContext(AuthContext)?.user?.username === "admin" ||
                  useContext(AuthContext)?.user?.username === "kazmin" ||
                  useContext(AuthContext)?.user?.username === "zosimenko"
                ) ? (
                  <p>Админстратор </p>
                ) : (
                  <p>Пользователь </p>
                )}
            </div>
          </DropdownMenuLabel>
          {(
            useContext(AuthContext)?.user?.username === "admin" ||
            useContext(AuthContext)?.user?.username === "kazmin" ||
            useContext(AuthContext)?.user?.username === "zosimenko"
          ) && (
              <>
                <DropdownMenuSeparator />
                <div className="flex justify-between text-sm m-2 font">
                  Валидация формы
                  <Switch
                    checked={!useContext(AuthContext)?.noValidation}
                    onCheckedChange={handleCheckedChange}
                  />
                </div>
              </>
            )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-14" />
              </>
            ) : (
              "Выход"
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
