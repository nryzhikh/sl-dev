import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "./LoginForm"

type CardProps = React.ComponentProps<typeof Card>

function CardsContainer({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex items-center justify-center h-[70vh]",
                className
            )}
            {...props}
        />
    );
}

const LoginContainer = ({ className, ...props }: CardProps) => {


    return (
        <CardsContainer>
            <Card className={cn("w-[380px]", className)} {...props}>
                <CardHeader className="text-left ml-3">
                    <CardTitle>Smartlink</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <LoginForm />
                </CardContent>
                <CardFooter />
            </Card>
        </CardsContainer>
    )
}

export default LoginContainer