import React from 'react'
import {
    // ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    OnChangeFn,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import {
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import columns from "@/components/data-table/columns"
import { apiGetStats, apiDownloadFiles } from '@/api/api'
import {
    // Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ReloadIcon,
    ChevronDownIcon,
    DownloadIcon,
} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useContext } from 'react';
import { RefetchContext } from '@/context/refetch.context';
// import { useEffect } from 'react';


type Sessions = {
    date: string;
    sessions: number;
};

export type TableData = {
    created_at: Date;
    updated_at: Date;
    sl_name: string;
    sessions: Sessions[];
    total_sessions: number;
    isNew: boolean;
    url: string;
    url_status_code: number;
    createdByUser: {
        username: string;
        user_id: string;
    };
    updatedByUser: {
        username: string;
        user_id: string;
    };
};

const fetchSize = 50

function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// const searchFieldsMapping = {
//     "sl_name": "sl_name",
//     "android_dp": "android_dp, android_apps_dp",
//     "android_app": "android_app",
//     "ios_dp": "ios_dp",
//     "ios_apps_dp": "ios_apps_dp",
//     "web_link_desk": "web_link_desk",
// };


const DataTable = () => {
    //we need a reference to the scrolling element for logic down below
    const tableContainerRef = React.useRef<HTMLDivElement>(null)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<{ [key: string]: boolean; }>({ "created_at": false, "createdByUser.username": false });
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { refetchTrigger } = useContext(RefetchContext);


    // const handleToggleSearchFields = (field: string) => {
    //     const newSearchFields = new Set(searchFields);
    //     if (newSearchFields.has(field)) {
    //         newSearchFields.delete(field);
    //     } else {
    //         newSearchFields.add(field);
    //     }
    //     setSearchFields(newSearchFields);
    // };


    //react-query has a useInfiniteQuery hook that is perfect for this use case
    const { data, fetchNextPage, isFetching, refetch, isRefetching } =
        useInfiniteQuery({
            queryKey: ['records', sorting, debouncedSearchTerm],
            queryFn: async ({ pageParam = 0 }) => {
                const start = pageParam * fetchSize;
                const sortField = sorting.length ? sorting[0].id : undefined;
                const sortOrder = sorting.length ? (sorting[0].desc ? 'desc' : 'asc') : undefined;
                const fetchedData = await apiGetStats(start, fetchSize, sortField, sortOrder, debouncedSearchTerm);
                return fetchedData;
            },
            initialPageParam: 0,
            getNextPageParam: (_lastGroup, groups) => groups.length,
            refetchOnWindowFocus: false,
            placeholderData: keepPreviousData,
        });


    //flatten the array of arrays from the useInfiniteQuery hook
    const flatData = React.useMemo(
        () => data?.pages?.flatMap(page => page.data) ?? [],
        [data]
    )
    const totalDBRowCount = data?.pages?.[0]?.totalCount ?? 0
    const totalFetched = flatData.length

    //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = React.useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                if (
                    scrollHeight - scrollTop - clientHeight < 500 &&
                    !isFetching &&
                    totalFetched < totalDBRowCount
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
    );
    React.useEffect(() => {
        if (debouncedSearchTerm !== '') {
            refetch();
        }
    }, [debouncedSearchTerm, refetch]);

    React.useEffect(() => {
        refetch();
    }, [refetchTrigger]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isFetching) {
                refetch();
            }
        }, 20000); // Refetch every 10 seconds
    
        return () => clearInterval(intervalId);
    }, [refetch]);








    //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    React.useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current)
    }, [fetchMoreOnBottomReached])

    const table = useReactTable({
        data: flatData,
        columns,
        state: {
            sorting,
            rowSelection,
            columnVisibility,
        },
        enableRowSelection: true, //enable row selection for all rows
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        manualSorting: true,
    })


    //scroll to top of table when sorting changes
    const handleSortingChange: OnChangeFn<SortingState> = updater => {
        setSorting(updater)
        if (!!table.getRowModel().rows.length) {
            rowVirtualizer.scrollToIndex?.(0)
        }
    }

    //since this table option is derived from table row model state, we're using the table.setOptions utility
    table.setOptions(prev => ({
        ...prev,
        onSortingChange: handleSortingChange,
    }))

    const { rows } = table.getRowModel()

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 48, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef.current,
        //measure dynamic row height, except in firefox because it measures table border height incorrectly
        measureElement:
            typeof window !== 'undefined' &&
                navigator.userAgent.indexOf('Firefox') === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5,
    })


    function getDownloadSlNames() {
        const selectedRowData = Object.keys(rowSelection).map((rowId) => {
            const rowIndex = table.getRowModel().rows.findIndex(row => row.id === rowId);
            return rowIndex > -1 ? table.getRowModel().rows[rowIndex].original : null;
        }).filter(row => row !== null);
        const selectedSlNames = selectedRowData.map(row => row.sl_name);
        return selectedSlNames;
    }

    function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
        let timeout: NodeJS.Timeout | null = null;
        return function (this: unknown, ...args: Parameters<T>) {
            const context = this;
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }



    const debouncedFetchMore = React.useCallback(debounce(fetchMoreOnBottomReached, 100), [fetchMoreOnBottomReached]);

    return (

        <div className="rounded-md overflow-auto" style={{ padding: "0.5rem" }}>
            <div className="flex items-center justify-between pb-4 space-x-3" >
                <div className="flex flex-1 items-center space-x-2">

                    <Input
                        placeholder="Поиск..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="max-w-sm"
                    />
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Поля <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {Object.keys(searchFieldsMapping).map((fieldKey) => (
                                <DropdownMenuCheckboxItem
                                    key={fieldKey}
                                    checked={searchFields.has(fieldKey)}
                                    onCheckedChange={(value) => handleToggleSearchFields(fieldKey)}
                                >
                                    {searchFieldsMapping[fieldKey as keyof typeof searchFieldsMapping]}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={() => {
                            if (!rowSelection) {
                                return;
                            }
                            apiDownloadFiles(getDownloadSlNames());
                        }}
                    >
                        <DownloadIcon />
                    </Button>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Поля <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(column => column.getCanHide() && !['actions', 'select',].includes(column.id)).map(column => {
                                const displayName = column.columnDef?.header?.toString() || '';

                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {displayName}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" onClick={() => {
                    rowVirtualizer.scrollToIndex?.(0)
                    refetch()
                }}>
                    <ReloadIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className=" overflow-hidden">
                <div
                    className=" block max-w-full border rounded-sm"
                    onScroll={e => debouncedFetchMore(e.target as HTMLDivElement)}
                    ref={tableContainerRef}
                    style={{
                        overflow: 'auto', //our scrollable table container
                        position: 'relative', //needed for sticky header
                        height: '600px', //should be a fixed height
                    }}
                >
                    {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
                    <table
                        style={{
                            width: "100%",
                            tableLayout: "auto",
                            borderCollapse: "collapse",
                            borderSpacing: 0,
                        }}

                    >
                        <TableHeader className="sticky top-0 z-10 bg-white">
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow
                                    key={headerGroup.id}
                                    className='flex justify-between w-full border-b '

                                >
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                style={{
                                                    width: header.getSize(),
                                                }}
                                                className='pl-0'

                                            >

                                                {header.column.id !== 'select' && header.column.id !== 'actions' ? (
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => {
                                                            const currentSort = header.column.getIsSorted();
                                                            const newSort = currentSort === 'asc' ? 'desc' : 'asc';
                                                            setSorting([{ id: header.column.id, desc: newSort === 'desc' }]);
                                                        }}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        <CaretSortIcon />

                                                    </Button>
                                                ) : (
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                                position: 'relative', //needed for absolute positioning of rows
                            }}
                        >
                            {rowVirtualizer.getVirtualItems().map(virtualRow => {
                                const row = rows[virtualRow.index] as Row<TableData>
                                return (
                                    <TableRow
                                        data-index={virtualRow.index} //needed for dynamic row height measurement
                                        ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                                        key={row.id}
                                        style={{
                                            position: 'absolute',
                                            transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                                        }}
                                        className='flex justify-between w-full'

                                    >
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    style={{
                                                        width: cell.column.getSize(),
                                                    }}
                                                    className='ml-1 py-1 flex items-center justify-start'
                                                >
                                                    {isFetching && !isRefetching ? (
                                                        <Skeleton className="h-6 m-2 w-full" />
                                                    ) : (
                                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                                    )}


                                                </TableCell>
                                            )
                                        })}

                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DataTable