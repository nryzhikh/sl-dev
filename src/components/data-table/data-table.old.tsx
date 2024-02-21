// import * as React from "react";
// import {
//   ColumnFiltersState,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   // Table,
//   // TableBody,
//   TableCell,
//   TableHead,
//   // TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   ReloadIcon,
//   ChevronDownIcon,
//   DownloadIcon,
// } from "@radix-ui/react-icons";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { columns } from "@/components/data-table/columns";
// import { apiGetStats } from "@/api/api";

// export type titleData = {
//   created_at: string;
//   updated_at: string;
//   sl_name: string;
//   version: string;
//   sessions: number;
//   total_sessions: number;
//   displayName?: string;
// };
// import { TableVirtuoso } from 'react-virtuoso';
// import { apiDownloadFiles } from "@/api/api";
// import { useMemo } from 'react';









// function useDebounce(value: any, delay: number) {
//   const [debouncedValue, setDebouncedValue] = React.useState(value);

//   React.useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }


// export function DataTable() {
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [data, setData] = React.useState<titleData[]>([]);
//   const [isFetching, setIsFetching] = React.useState(false);
//   const [sorting, setSorting] = React.useState<SortingState>([
//     {
//       id: 'created_at',
//       desc: true,
//     }
//   ]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] = React.useState<{ [key: string]: boolean; }>({ sessions: false, "created_at": false });
//   const [rowSelection, setRowSelection] = React.useState<{
//     [key: string]: boolean;
//   }>({});
//   const [selectedKeysData, setSelectedKeysData] = React.useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = React.useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);



//   const table = useReactTable({
//     data: data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onRowSelectionChange: setRowSelection,
//     onColumnVisibilityChange: setColumnVisibility,
//     state: {
//       sorting,
//       columnFilters,
//       rowSelection,
//       columnVisibility,
//     },
//   });

//   useMemo(() => {
//     const selectedKeys = Object.keys(rowSelection).filter(
//       (key) => rowSelection[key]
//     );
//     const selectedRows = data.filter((row) =>
//       selectedKeys.includes(data.indexOf(row).toString())
//     );
//     const KeysData = selectedRows.map((row) => row.sl_name);

//     setSelectedKeysData(KeysData);
//   }, [rowSelection, data]);


//   const fetchMoreData = React.useCallback(async () => {
//     if (isFetching) return; // Don't fetch more data if we're already fetching

//     const sort = sorting[0];
//     const sortField = sort ? sort.id : undefined;
//     const sortOrder = sort ? sort.desc ? 'desc' : 'asc' : undefined;

//     try {
//       setLoading(true);
//       setIsFetching(true);
//       const newData = await apiGetStats(data.length, 100, sortField, sortOrder, debouncedSearchTerm);
//       setData(oldData => [...oldData, ...newData.data]); // Append new data
//     } catch (error) {
//       console.error('Error fetching more data:', error);
//     } finally {
//       setIsFetching(false);
//       setLoading(false);

//     }
//   }, [data.length, sorting, isFetching]);

//   React.useEffect(() => {
//     refreshData();
//   }, [sorting, debouncedSearchTerm]);

//   async function refreshData(): Promise<void> {
//     const sort = sorting[0];
//     const sortField = sort ? sort.id : 'updated_at';
//     const sortOrder = sort && sort.desc ? 'desc' : 'asc';

//     try {
//       setLoading(true);
//       const newData = await apiGetStats(0, 100, sortField, sortOrder, debouncedSearchTerm); // Fetch new data from the database
//       console.log(newData);
//       setData(newData.data);
//     } catch (error) {
//       console.error('Error refreshing data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   React.useEffect(() => {
//     refreshData();
//   }, []);


//   console.log(selectedKeysData)

//   React.useEffect(() => {
//     if (debouncedSearchTerm) {
//       table.getColumn("combinedSearchField")?.setFilterValue(debouncedSearchTerm);
//     }
//   }, [debouncedSearchTerm]);

//   const columnDisplayNameMap: { [key: string]: string } = {
//     created_at: 'Создан',
//     updated_at: 'Обновлен',
//     sl_name: 'Ссылка',
//     total_sessions: 'Переходов за 7 д.',
//   };

//   return (
//     <>
//       <div className="rounded-md" style={{ padding: "0.5rem" }}>
//         <div className="flex items-center justify-between pb-4 space-x-3" >
//           <div className="flex flex-1 items-center space-x-2">

//             <Input
//               placeholder="Поиск..."
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//               className="max-w-sm"
//             />
//             <Button
//               variant="outline"
//               className="ml-auto"
//               onClick={() => {
//                 if (selectedKeysData.length === 0) {
//                   return;
//                 }
//                 apiDownloadFiles(selectedKeysData);
//               }}
//             >
//               <DownloadIcon />
//             </Button>
//           </div>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Поля <ChevronDownIcon className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter(column => column.getCanHide() && !['sessions', 'LastModified', 'Действия'].includes(column.id))
//                 .map(column => {
//                   const displayName = columnDisplayNameMap[column.id] || column.id;

//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                     >
//                       {displayName}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Button variant="ghost" onClick={() => refreshData()}>
//             <ReloadIcon className="h-4 w-4" />
//           </Button>
//         </div>
//         <div style={{ height: "0.5rem" }} />

//         <TableVirtuoso
//           style={{ height: "760px" }}

//           className="rounded-md border"
//           totalCount={table.getRowModel().rows.length}
//           endReached={fetchMoreData}
//           components={{
//             Table: ({ style, ...props }) => (
//               <table
//                 {...props}
//                 style={{
//                   ...style,
//                   width: "100%",
//                   tableLayout: "auto",
//                   borderCollapse: "collapse",
//                   borderSpacing: 0
//                 }}
//               />
//             ),
//             TableRow: (props) => {
//               const index = props["data-index"];
//               const row = table.getRowModel().rows[index];

//               if (loading) {
//                 return (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} className="h-24 text-center">
//                       <div className="flex items-center justify-center space-x-1 my-2 mx-2">
//                         <Skeleton className="h-10 w-full" />
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               } else {
//                 return (
//                   <TableRow {...props} >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id} className="text-left ">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               }
//             }
//           }}
//           fixedHeaderContent={() => {
//             return table.getHeaderGroups().map((headerGroup) => (
//               <TableRow
//                 key={headerGroup.id}
//                 style={{ position: 'sticky', top: 0, background: "white", margin: 0, zIndex: 20 }}
//               >
//                 {headerGroup.headers.map((header) => (
//                   <TableHead
//                     key={header.id}
//                     colSpan={header.colSpan}

//                   >
//                     {header.isPlaceholder ? null : (
//                       <div
//                         {...{
//                           style: header.column.getCanSort()
//                             ? { cursor: "pointer", userSelect: "none" }
//                             : {},
//                           onClick: header.column.getToggleSortingHandler()
//                         }}
//                         className="items-start justify-start text-start"
//                       >
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </div>
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ));
//           }}
//         />

//       </div>
//     </>


//   );
// }

