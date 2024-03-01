import { Checkbox } from "@/components/ui/checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

const items = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
    },
] as const



export function SearchFieldsSelector() {
    const [ searchFields, setSearchFields ] = useState<string[]>([]);

    const handleCheckedChange = (checked: boolean, itemId: string) => {
        if (checked) {
            setSearchFields(prevFields => [...prevFields, itemId]);
        } else {
            setSearchFields(prevFields => prevFields.filter(field => field !== itemId));
        }
    }

    console.log(searchFields);


    return (
        <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>
            {items.map((item) => (
                    <Checkbox
                        key={item.id}
                        checked={searchFields.includes(item.id)}
                        onCheckedChange={(checked: boolean) => handleCheckedChange(checked, item.id)}
                    >
                        {item.label}
                    </Checkbox>
                ))}
            </PopoverContent>
        </Popover>
    )
}
