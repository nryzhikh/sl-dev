import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link2Icon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";





const checkUrlStatus = async (url: string) => {
    try {
        const response = await axios.head(url, { timeout: 500 });
        return response.status;
    } catch (error) {
        return 400;
    }
};



export default  function UrlStatusCheck({sl_name} : {sl_name: string}) {
    const [status, setStatus] = useState(0);
    const url = `https://www.sberbank.com/sms/${sl_name}`;

    useEffect(() => {
        checkUrlStatus(url).then((status) => {
            setStatus(status);
        });
    }, []);

    return (
        <div>
            {status === -1 ? (
                <span>Timeout</span>
            ) : status === 0 ? (
                <Skeleton className="h-5 w-[80px]" />
            ) : status > 199 && status < 400 ? (
                <div className="flex justify-center items-center gap-2">
                    <div style={{ height: '8px', width: '8px', backgroundColor: "#10b981", borderRadius: '50%' }}></div>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-start">
                        <span className="text-sm">Активен</span>
                        <Link2Icon className="ml-1 w-3 h-3 " />
                    </a>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-2">
                    <div style={{ height: '8px', width: '8px', backgroundColor: 'red', borderRadius: '50%' }}></div>
                    <span className="text-sm">Неактивен</span>
                </div>
            )}
        </div>
    )




}

