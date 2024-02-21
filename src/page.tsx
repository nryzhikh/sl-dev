import DataTable from "@/components/data-table/DataTable";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SmartlinkForm } from "@/components/form/Form.tsx";
import { Separator } from "@/components/ui/separator"
import { UserNav } from "./components/user-nav/user-nav";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/context/auth.context"
import { useContext } from "react";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()



function CardsContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

export default function CardsPage() {


  return (
    <>
    <div className="py-1">
      <div className="container flex justify-between sm:flex-row">
        <h2 className="text-lg font-semibold mt-1">Smartlink</h2>
        <UserNav />
      </div>
      </div>
      <Separator className="absolute inset-x-0 w-[calc(100vw)]" />
      <div className=" items-start justify-center gap-6 rounded-lg py-4 md:grid grid-cols-12">
        <div className=" items-start gap-6 sm:col-span-12 lg:col-span-6 xl:col-span-4 md:col-span-12 mt-2 order-1 lg:order-2">
          <CardsContainer>
            <Card className="text-left rounded-md max-w-[600px]">
              <div style={{ position: 'relative' }}>

                <CardHeader>
                  <CardTitle className="text-md text-left">
                    Создание ссылки
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 ">
                  <SmartlinkForm />
                </CardContent>
                {!useContext(AuthContext)?.user && (
                  <div
                    className=" rounded-lg absolute top-0 left-0 right-0 bottom-0 bg-slate-300 bg-opacity-50 flex items-center justify-center text-white z-10"
                  >
                    <Alert className="w-100">
                      <AlertDescription>
                        Авторизуйтесь, чтобы создать ссылку.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            </Card>
          </CardsContainer>

        </div>
        <div
          className=" items-start gap-4 sm:col-span-12 lg:col-span-6 xl:col-span-8 mt-2 md:col-span-12 order-2 lg:order-1"
          id="DataTableDiv"
        >
          <CardsContainer>
            <Card className="text-left rounded-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-md ml-2 mb-0 pb-0 text-left ">
                  Список
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {/* <DataTable/> */}
                <QueryClientProvider client={queryClient}>

                <DataTable />
                </QueryClientProvider>

              </CardContent>
            </Card>
          </CardsContainer>
        </div>
      </div>
      <Toaster />
    </>
  );
}
