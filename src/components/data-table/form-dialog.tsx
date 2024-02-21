import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SmartlinkForm } from "@/components/form/Form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { apiGetHistory } from "@/api/api";
import { Loader2 } from "lucide-react";
import { SmartlinkFormValues, defaultValues } from "@/components/form/schema/FormSchema";

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

interface Version {
    version: number;
    updated_at: string;
    [key: string]: any;
}

// function parseJsonString(jsonString: string, key: string) {
//     try {
//       return JSON.parse(jsonString);
//     } catch (error) {
//       console.error(`Error parsing JSON string in key ${key}:`, error);
//       return jsonString;
//     }
//   }
  
  // Function to get the value from the response
  function getValueFromResponse(response: any, key: string) {
    if (key === 'ios_apps_dp' && typeof response[key] === 'string') {
      let cleanedString = response[key].trim().replace(/^"|"$/g, '');
      return cleanedString.split(',').map((value: string) => ({ value }));
    } else {
      return response[key];
    }
  }
  
  
  // Function to reduce the defaultValues object
  function reduceDefaultValues(defaultValues: any, response: any) {
    return Object.keys(defaultValues).reduce((obj: any, key) => {
      if (key in response) {
        obj[key] = getValueFromResponse(response, key);
      }
      return obj;
    }, {} as Partial<SmartlinkFormValues>);
  }

  

export default function FormDialog({ slName, closeDialog }: { slName: string, closeDialog: () => void}) {

    const [loading, setLoading] = useState<boolean>(true);
    const [versions, setVersions] = useState<Version[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<SmartlinkFormValues>();

    // const jsonKeys = ['android_app', 'ios_apps_dp']; // Replace with your actual keys



    useEffect(() => {
        const fetchVersions = async () => {
            setLoading(true);
            try {
                let response: Array<Version> = await apiGetHistory(slName);
                setVersions(response);
                
                const selectedVersion = reduceDefaultValues(defaultValues, response[0]);
                setSelectedVersion(selectedVersion as SmartlinkFormValues);
            } catch (error: any) {
                console.error('Error fetching versions:', error);
            }
            setLoading(false);
        };
        fetchVersions();
    }, [slName]);

    function formatDate(isoDateString: string): string {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }


    const highestVersion: number = Math.max(...versions.map(v => v.version));

    return (
        <>
            <ScrollArea className="max-h-[80vh] w-full rounded-md border" type="auto">
                <CardsContainer className="max-w-xl">
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <Loader2 className="animate-spin w-20" />
                        </div>
                    ) : (
                        <Card className="text-left rounded-md">
                            <CardHeader>
                                <CardTitle className="ml-4 mt-1 mb-1 text-xl text-left">
                                    {slName}
                                </CardTitle>
                                <Select
                                    onValueChange={(value: string) => {
                                        const version = versions.find(version => version.version === Number(value));
                                        if (version) {
                                            const selectedVersion = reduceDefaultValues(defaultValues, version);
                                            if (selectedVersion) {
                                                setSelectedVersion(selectedVersion);
                                            } else {
                                                setSelectedVersion(undefined);
                                            }
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-[180px] ml-3 mt-2"
                                    >
                                        <SelectValue placeholder="Текущая версия" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Версии</SelectLabel>
                                            {versions.map((version, index) => (
                                                <SelectItem key={index} value={version.version.toString()}>
                                                    {`v${version.version} от ${formatDate(version.updated_at)} ${version.version === highestVersion ? '(текущая)' : ''}`}

                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <SmartlinkForm values={selectedVersion} isFromTable={true} closeDialog={closeDialog}/>
                            </CardContent>
                        </Card>
                    )}
                </CardsContainer>
            </ScrollArea>
        </>
    )
}