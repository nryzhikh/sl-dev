import React, { useEffect, useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import ComputerIcon from '@mui/icons-material/Computer';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import Looks5OutlinedIcon from '@mui/icons-material/Looks5Outlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import Looks6OutlinedIcon from '@mui/icons-material/Looks6Outlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import HttpOutlinedIcon from '@mui/icons-material/HttpOutlined';
import { Badge } from "@/components/ui/badge"
import { apiGetDetails } from '@/api/api';

const numberIcons = [
    LooksOneOutlinedIcon,
    LooksTwoOutlinedIcon,
    Looks3OutlinedIcon,
    Looks4OutlinedIcon,
    Looks5OutlinedIcon,
    Looks6OutlinedIcon
];

export type DetailsPopoverProps = {
    sl_name: string;
    android_dp: string;
    ios_dp: string;
    ios_apps_dp: { value: string }[];
    web_link_desk: string;
    need_web_ios: boolean;
    need_web_and: boolean;
    need_utm: string;
};

export default function DetailsPopoverContent({ sl_name }: { sl_name: string }) {
    const [details, setDetails] = useState<DetailsPopoverProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = React.useState<Error | null>(null);



    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
            const data = await apiGetDetails(sl_name)
            if (data.ios_apps_dp.length === 0) {
                data.ios_apps_dp = [{ value: "" }]
            }
            setDetails(data);
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error(String(error)));
                }
            }
            setIsLoading(false);
        };

        fetchDetails();
    }, [sl_name]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!details) {
        return null;
    }

    console.log(details);

    return (
        <ul className="max-w-[700px] truncate xs:hidden">
            <li >
                <div className=" my-1 ml-4 flex overflow-hidden overflow-ellipsis xs:hidden">

                    <a href={`https://sberbank.com/sms/${String(details?.sl_name)}`} target="_blank" rel="noopener noreferrer">
                        <Badge variant="secondary" className="ml-1 whitespace-nowrap overflow-ellipsis">
                            sberbank.com/sms/{String(details?.sl_name)}
                        </Badge>
                    </a>
                    {details?.need_utm && typeof details?.need_utm === 'string' && (
                        <Badge variant="secondary" className="ml-1 whitespace-nowrap overflow-ellipsis">
                            {String(details?.need_utm)}
                        </Badge>
                    )}

                </div>
            </li>
            <li className="flex justify-between items-end">
                <div className=" overflow-hidden overflow-ellipsis xs:hidden">
                    <AndroidIcon color="action" />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="ml-1  whitespace-nowrap overflow-ellipsis">{String(details?.android_dp)}</span>
                            </TooltipTrigger>
                            <TooltipContent style={{ whiteSpace: 'pre-line' }} className="bg-zinc-500">
                                {String(details?.android_dp)}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <RedoOutlinedIcon color="action" fontSize="small" />
                    {details?.need_web_and ? <HttpOutlinedIcon fontSize="small" color="action" /> : <StoreOutlinedIcon color="action" fontSize="small" />}
                </div>
            </li>
            {details?.ios_apps_dp && details?.ios_apps_dp[0].value ? details?.ios_apps_dp.map((item, index) => {
                const Icon = numberIcons[index]
                return (
                    <li key={index}>
                        <div className="flex mt-1 justify-between items-end">

                            <div className="flex justify-start items-end">

                                <AppleIcon color="action" />
                                <Icon fontSize="small" color="action" />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="w-[330px] overflow-hidden overflow-ellipsis">
                                                <span className="ml-1  whitespace-nowrap overflow-ellipsis">{item.value}</span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent style={{ whiteSpace: 'pre-line' }} className="bg-zinc-500">
                                            {String(item.value)}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div>
                                {details?.ios_apps_dp && index === details?.ios_apps_dp.length - 1 && (
                                    <div>
                                        <RedoOutlinedIcon color="action" fontSize="small" />
                                        {details?.need_web_ios ? <HttpOutlinedIcon color="action" fontSize="small" /> : <StoreOutlinedIcon color="action" fontSize="small" />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                );
            })
                :
                <li className="flex mt-1 justify-between items-end">
                    <div className=" overflow-hidden overflow-ellipsis xs:hidden">
                        <AppleIcon color="action" />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="ml-1  whitespace-nowrap overflow-ellipsis">{String(details?.ios_dp)}</span>
                                </TooltipTrigger>
                                <TooltipContent style={{ whiteSpace: 'pre-line' }} className="bg-zinc-500">
                                    {String(details?.ios_dp)}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div>
                        <RedoOutlinedIcon color="action" fontSize="small" />
                        {details?.need_web_ios ? <HttpOutlinedIcon fontSize="small" color="action" /> : <StoreOutlinedIcon color="action" fontSize="small" />}
                    </div>
                </li>
            }
            <li className="mt-1 flex">
                <ComputerIcon color="action" />
                <div className=" overflow-hidden overflow-ellipsis">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="ml-1  whitespace-nowrap overflow-ellipsis">{String(details?.web_link_desk)}</span>
                            </TooltipTrigger>
                            <TooltipContent style={{ whiteSpace: 'pre-line' }} className="bg-zinc-500">
                                {String(details?.web_link_desk)}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </li>
        </ul>
    );
}
