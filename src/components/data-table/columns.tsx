import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import MenuDropdown from "@/components/data-table/menu-dropdown";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { TableData } from "@/components/data-table/DataTable";
import DetailsPopoverContent from "./details-popover";
import { SparkAreaChart } from "@tremor/react";
// import UrlStatusCheck from "@/components/data-table/url-status-checker";
import { Link2Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge"



const emptyData = () => {
    const data = [];
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day to start from yesterday

    for (let i = 7; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const formattedDate = date.toISOString().split('T')[0];

        data.push({
            date: formattedDate,
            sessions: 0
        });
    }

    return data;
}

const fillMissingDates = (inputData: { date: string, sessions: number }[]) => {
    const data: { date: string, sessions: number }[] = [];
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const startDate = new Date(today.getTime());
    startDate.setDate(today.getDate() - 6);

    for (let d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toISOString().split('T')[0];

        const existingData = inputData.find(item => item.date === formattedDate);

        if (existingData) {
            data.push(existingData);
        } else {
            data.push({
                date: formattedDate,
                sessions: 0
            });
        }
    }

    return data;
}

const columns: ColumnDef<TableData>[] = [
    {
        id: 'select',
        size: 30,
        header: ({ table }) => (
            <div className=" flex items-center justify-end w-full h-full">
                <Checkbox
                    checked={table.getIsAllRowsSelected() ? true : false}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllRowsSelected(value === true)}
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center w-full h-full">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(value === true)}
                />
            </div>
        ),
    },
    {
        accessorKey: "created_at",
        size: 80,
        header: "Создан",
        cell: info => {
            const date = new Date(info.row.original.created_at);
            return (
                <div className="text-sm">
                    {format(date, 'dd.MM.yyyy')}
                </div>
            );
        }
    },
    {
        accessorKey: "updated_at",
        size: 80,

        header: "Обновлен",
        cell: info => {
            const date = new Date(info.row.original.updated_at);
            return (
                <div className="text-sm">
                    {format(date, 'dd.MM.yyyy')}
                </div>
            );
        }
    },
    {
        accessorKey: "url_status_code",
        size: 150,
        header: "Статус",
        cell: info => {
            const status = info.getValue() as number;
            const url = 'https://sberbank.com/sms/' + info.row.original.sl_name;

            function renderStatus(status: number, url: string) {
                if (status > 98) {
                    return (
                        <div className="flex justify-center items-center gap-2">
                            <div style={{ height: '8px', width: '8px', backgroundColor: 'red', borderRadius: '50%' }}></div>
                            <span className="text-sm">Ошибка</span>
                        </div>
                    );

                } else if (status >= 30 && status < 40) {
                    return (
                        <div className="flex justify-center items-center gap-2">
                            <div style={{ height: '8px', width: '8px', backgroundColor: "#10b981", borderRadius: '50%' }}></div>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center underline">
                                <span className="text-sm">Активен</span>
                                <Link2Icon className="mb-1 w-3 h-3 " />
                            </a>
                        </div>
                    );
                } else if (status >= 0 && status < 20) {
                    return (
                        <div className="flex justify-center items-center gap-2">
                            <div style={{ height: '8px', width: '8px', backgroundColor: 'red', borderRadius: '50%' }}></div>
                            <span className="text-sm">На модерации</span>
                        </div>
                    );
                } else if (status >= 20 && status < 30) {
                    return (
                        <div className="flex justify-center items-center gap-2">
                            <div style={{ height: '8px', width: '8px', backgroundColor: 'orange', borderRadius: '50%' }}></div>
                            <span className="text-sm">На изменении</span>
                        </div>
                    );
                } 
            }


            return <div>{renderStatus(status, url)}</div>
        }
    },

    {
        accessorKey: "sl_name",
        size: 400,
        header: "Ccылка",
        cell: info => (
            <div className="w-[400px] overflow-hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="font-semibold rounded-lg h-6 flex justify-center items-center m-1" style={{ userSelect: "text" }}>
                            <Badge className="h-7 w-full " variant="secondary">
                            sberbank.com/sms/{info.getValue() as string}
                            </Badge>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                        <DetailsPopoverContent sl_name={info.getValue() as string} />
                    </PopoverContent>
                </Popover>
            </div>
        ),
    },
    {
        header: "Переходов за 7 дней",
        size: 200,
        id: "total_sessions",
        accessorFn: (row) => row.total_sessions,
        cell: info => {
            return (
                <div className="flex items-center ">
                    <SparkAreaChart
                        data={info.row.original.sessions ? fillMissingDates(info.row.original.sessions) : emptyData()}
                        categories={["sessions"]}
                        index={"date"}
                        colors={["green", "#10b981"]}
                        className="h-10 w-36 text-sm text-muted-foreground"
                        curveType="linear"
                        showAnimation={true} // Use isNew property to control animation
                        animationDuration={300}
                    />
                    <Label className="ml-2 text-sm text-muted-foreground">
                        {(info.row.original.total_sessions || 0).toLocaleString("ru-RU")}
                    </Label>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: '',
        size: 50,
        cell: ({ row }) => {
            const { sl_name } = row.original;
            return (
                <div>
                    <MenuDropdown slName={sl_name} />
                </div>
            );
        }
    },
]

export default columns;