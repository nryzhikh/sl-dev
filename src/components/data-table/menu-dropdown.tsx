import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
// import { filesHost } from "@/constants/constants";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { apiDownloadFiles } from '@/api/api';
import FormDialog from "@/components/data-table/form-dialog.tsx";

export default function MenuDropdown({ slName }: { slName: string }) {

    const [open, setOpen] = useState(false);
    const closeDialog = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Открыть меню</span>
                        <DotsVerticalIcon className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            apiDownloadFiles([slName]);
                        }}
                    >
                        Скачать
                    </DropdownMenuItem>
                    <DialogTrigger asChild>

                        <DropdownMenuItem
                        >
                            Изменить
                        </DropdownMenuItem>
                    </DialogTrigger>

                    {/* <DropdownMenuItem onClick={() => window.open(filesHost + "sms/" + slName + '/index.html', '_blank')}>
                        Проверить ссылку
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="m-0 p-0">
                <FormDialog slName={slName} closeDialog={closeDialog} />
            </DialogContent>
        </Dialog>
    );
};


