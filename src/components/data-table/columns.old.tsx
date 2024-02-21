// import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { CaretSortIcon } from "@radix-ui/react-icons";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import MenuDropdown from "@/components/data-table/menu-dropdown";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { titleData } from "./data-table.old";
// import DetailsPopoverContent from "./details-popover";
// import { SparkAreaChart } from "@tremor/react";

// const formatDate = (date: Date) => {
//   const currentDate = new Date();
//   const isToday = removeTime(date).getTime() === removeTime(currentDate).getTime();
//   return format(date, isToday ? "HH:mm:ss" : "dd.MM.yyyy");
// };

// const removeTime = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

// const emptyData = () => {
//   const data = [];
//   const today = new Date();

//   for (let i = 7; i >= 0; i--) {
//     const date = new Date();
//     date.setDate(today.getDate() - i);

//     const formattedDate = date.toISOString().split('T')[0];

//     data.push({
//       date: formattedDate,
//       sessions: 0
//     });
//   }

//   return data;
// }


// export const columns: ColumnDef<titleData>[] = [


//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="ml-2"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="ml-2"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },


//   {
//     accessorKey: "created_at",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         className="px-2"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Создан
//         <CaretSortIcon />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const createDate = new Date(row.getValue("created_at")) as Date;
//       return <div className="w-[50px]">{createDate ? formatDate(createDate) : 'н/д'}</div>;
//     },

//   },

//   {
//     accessorKey: "updated_at",

//     header: ({ column }) => (
//       <div>
//         <Button
//           variant="ghost"
//           className="px-2"

//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Обновлен
//           <CaretSortIcon />
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => {
//       const createDate = new Date(row.getValue("updated_at")) as Date;
//       return <div className="w-[50px]">{createDate ? formatDate(createDate) : 'н/д'}</div>;
//     },
//   },



//   {
//     accessorKey: "sl_name",
//     header: ({ column }) => {
//       return (
//         <div className="w-[400px]">
//           <Button
//             variant="ghost"
//             className="px-2"

//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Ссылка
//             <CaretSortIcon />
//           </Button>
//         </div>
//       );
//     },
//     cell: ({ row }) => {

//       const sl_name = row.getValue("sl_name") as string;

//       return (
//         // <Badge variant="secondary" >
//         //   sberbank.com/sms/{sl_name}
//         // </Badge>
//         <div >
//           <Popover >
//             <PopoverTrigger asChild>
//               <Button variant="secondary" className="font-semibold rounded-lg" > sberbank.com/sms/{sl_name}</Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-full">
//               <DetailsPopoverContent sl_name={sl_name} />
//             </PopoverContent>
//           </Popover>
//         </div>
//       );

//     },
//   },
//   {
//     accessorKey: "total_sessions",
//     header: ({ column }) => {
//       return (
//         <div className="sticky top-0 z-20 bg-white flex justify-end items-center pr-4">
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="bg-white justify-end"
//           >
//             Переходов за 7д.
//             <CaretSortIcon />
//           </Button>
//         </div>
//       );
//     },
//     cell: ({ row }) => {
//       const total_sessions_last_7_days = row.getValue("total_sessions") as string;

//       return (
//         <div className="flex justify-end">
//           <div className="flex justify-start items-center w-[220px]">
//             <SparkAreaChart
//               data={row.getValue("sessions") || emptyData()}
//               categories={["sessions", total_sessions_last_7_days] || 0}
//               index={"date"}
//               colors={["green", "#10b981"]}
//               className="h-10 w-36 text-sm text-muted-foreground"
//               noDataText="н/д"
//               curveType="linear"
//               showAnimation={true}
//               animationDuration={500}
//             />
//             <Label className="ml-2 text-sm text-muted-foreground">
//               {(total_sessions_last_7_days || 0).toLocaleString()}
//             </Label>
//           </div>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "Actions",
//     id: "Действия",
//     header: () => {
//       return (
//         <div className="w-0" />
//       );
//     },


//     cell: ({ row }) => {

//       const sl_name = row.getValue("sl_name") as string;


//       return (
//         <div className="flex w-[20px] justify-end items-center">
//           <MenuDropdown slName={sl_name} />
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "sessions",
//   }

// ];




