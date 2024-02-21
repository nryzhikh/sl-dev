import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { loginFormDefaultValues, loginFormSchema, LoginFormSchemaValues } from "./LoginFormSchema"
import { Loader2 } from "lucide-react"
import { AuthContext } from "@/context/auth.context"
import { apiLogin } from "@/api/api"

function handleLoginError(errorMessage: string): void {
    toast({
        variant: "destructive",
        title: "Ошибка авторизации",
        description: (
            <div >
                <p className="pl-2">{errorMessage}</p>
            </div>
        ),
    });
}

export function LoginForm() {
    const form = useForm<LoginFormSchemaValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: loginFormDefaultValues,
        mode: "onChange",
    })

    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);


    const onSubmit = async (data: LoginFormSchemaValues) => {
        if (authContext) {
            setLoading(true);
            try {
                const response = await apiLogin(data);
                authContext.setUser(response.data);
                setLoading(false);
            } catch (error) {
                if (error) {
                    handleLoginError((error as { response: { data: { message: string } } }).response.data.message);
                    setLoading(false);
                }
            }
        }
    };
    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field, fieldState }) => (
                            <>
                                <FormItem>
                                    <div className=" ml-1 flex justify-between items-end">
                                        <div>
                                            <FormMessage className="text-xs">
                                                <FormLabel className="text-muted-foreground text-xs">
                                                    Логин
                                                </FormLabel>
                                            </FormMessage>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className={` ${fieldState.error
                                                    ? "focus-visible:ring-0 border-destructive"
                                                    : ""
                                                }`}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <>
                                <FormItem>
                                    <div className=" ml-1 flex justify-between items-end">
                                        <div>
                                            <FormMessage className="text-xs">
                                                <FormLabel className="text-muted-foreground text-xs">
                                                    Пароль
                                                </FormLabel>
                                            </FormMessage>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Input
                                            type="password"

                                            {...field}
                                            className={
                                                fieldState.error
                                                    ? "focus-visible:ring-0 border-destructive"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <div className=" flex justify-end">
                        <Button
                            type="submit"
                            className="mt-5 text-center justify-center w-full"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-14" />
                                </>
                            ) : (
                                "Войти"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
