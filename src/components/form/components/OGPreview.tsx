import React, { useState, useEffect } from 'react';

interface OGPreviewerProps {
    meta_title?: string;
    meta_description?: string;
    og_image_file?: File;
    og_image?: string;
}

const OGPreview: React.FC<OGPreviewerProps> = ({ meta_title, meta_description, og_image_file, og_image }) => {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);




    useEffect(() => {
        if (og_image_file) {
            const fileUrl = URL.createObjectURL(og_image_file);
            setPreviewUrl(fileUrl);
            return () => {
                URL.revokeObjectURL(fileUrl);
            };
        } else if (og_image && !og_image_file) {
            setPreviewUrl(og_image);
        } else {
            setPreviewUrl(undefined);
        }
    }, [og_image_file]);

    return (
        <>
            {/* 
            <div className="card m-0 p-0 w-full shadow mt-1 h-auto ">
                <div className="-mb-px ">
                    <img src={previewUrl} alt={og_image_file?.name} className="w-full h-full block rounded-t-md" />
                </div>
                <div className="overflow-hidden rounded-b-md p-10 " style={{ backgroundColor: 'rgb(242, 243, 245)', padding: '10px' }}>
                    <p className="text-gray-900 font-bold text-base m-0 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {meta_title}
                    </p>
                    <p className="text-gray-600 font-light m-0 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {meta_description}
                    </p>
                    <p className="text-gray-600 lowercase m-0 text-xs">Sberbank.com</p>
                </div>
            </div> */}

            <div className="border flex flex-wrap max-w-[500px] border-gray-300 rounded-xl overflow-hidden ml-1" style={{ backgroundColor: 'rgb(242, 243, 245)' }}>
                <img src={previewUrl} alt="СберБанк Онлайн" className="w-full h-full object-cover block" /> <div className="px-4 py-4"><div className=" text-sm truncate font-bold">
                {meta_title}
            </div> <p className="text-gray-600 text-sm truncate ">
                        {meta_description}
                    </p> <div className="font-light text-sm truncate text-gray-400">
                        sberbank.com
                    </div>
                </div>
            </div>

            {/* <div className="m-2 w-full">
                <h3 className="font-heading mb-2 font-medium uppercase text-stone-900">
                    X (formerly Twitter)
                </h3>
                <div className="-outline-offset-1 relative w-[524px] max-w-full cursor-pointer overflow-hidden rounded-[0.85714em] border-[1px] border-[#e1e8ed] leading-[1.3em] text-black font-[Helvetica]">
                    <div className="bg-cover bg-center bg-no-repeat">
                        <div className="w-full relative h-0 pt-[52.33%]" >
                            <img className="h-full w-full absolute top-0 object-cover block" src={previewUrl}/>
                        </div>
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-40 px-[4px] py-[2px] rounded">s3-gtm.s3pd12.sbercloud.ru</div>
                </div>
            </div> */}

            {/* <div className="m-2 w-full">
                <h3 className="font-heading mb-2 font-medium uppercase text-stone-900">
                    Facebook
                </h3>
                <div className="w-[500px] max-w-full cursor-pointer font-[Helvetica]">
                    <div className="border-[1px] border-b-0 border-[#dadde1] bg-cover bg-center bg-no-repeat">
                        <div className="w-full relative h-0 pt-[54.5%]">
                            <img className="h-full w-full absolute top-0 object-cover block" src={previewUrl}/>
                        </div>
                    </div>
                    <div className="break-words border-[1px] border-[#dadde1] bg-[#f2f3f5] px-[12px] py-[10px] antialiased">
                        <div className="overflow-hidden truncate whitespace-nowrap text-[12px] uppercase leading-[11px] text-[#606770]">
                            s3-gtm.s3pd12.sbercloud.ru
                        </div>
                        <div className="block h-[46px] max-h-[46px] border-separate select-none overflow-hidden break-words text-left border-spacing-[0px]">
                            <div className="mt-[3px] truncate pt-[2px] text-[16px] font-semibold leading-[20px] text-[#1d2129]">
                                СберБанк Онлайн
                            </div>
                            <div className="mt-[3px] block h-[18px] max-h-[80px] border-separate select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[20px] text-[#606770]"
                             style={{ display: '-webkit-box', WebkitLineClamp: '1', borderSpacing: '0px', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                СберБанк Онлайн
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


        </>
    );
}

export default OGPreview;



{/* <div className="m-2 w-full"><h3 className="font-heading mb-2 font-medium uppercase text-stone-900">X (formerly Twitter)</h3><div className="-outline-offset-1 relative w-[438px] max-w-full cursor-pointer overflow-hidden rounded-[0.85714em] border-[1px] border-[#e1e8ed] leading-[1.3em] text-black font-[Helvetica]"><div className="bg-cover bg-center bg-no-repeat"><div className="w-full relative h-0" style="padding-top: 52.33%;"><img className="h-full w-full absolute top-0 object-cover block" src="https://s3-gtm.s3pd12.sbercloud.ru/sms/smartlink_assets/img/snippet_link.jpg"></div></div><div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-40 px-[4px] py-[2px] rounded">s3-gtm.s3pd12.sbercloud.ru</div></div></div> */ }



{/* <div className="m-2 w-full"><h3 className="font-heading mb-2 font-medium uppercase text-stone-900">Facebook</h3><div className="w-[524px] max-w-full cursor-pointer font-[Helvetica]"><div className="border-[1px] border-b-0 border-[#dadde1] bg-cover bg-center bg-no-repeat"><div className="w-full relative h-0" style="padding-top: 52.5%;"><img className="h-full w-full absolute top-0 object-cover block" src="https://s3-gtm.s3pd12.sbercloud.ru/sms/smartlink_assets/img/snippet_link.jpg"></div></div><div className="break-words border-[1px] border-[#dadde1] bg-[#f2f3f5] px-[12px] py-[10px] antialiased"><div className="overflow-hidden truncate whitespace-nowrap text-[12px] uppercase leading-[11px] text-[#606770]">s3-gtm.s3pd12.sbercloud.ru</div><div className="block h-[46px] max-h-[46px] border-separate select-none overflow-hidden break-words text-left" style="border-spacing: 0px;"><div className="mt-[3px] truncate pt-[2px] text-[16px] font-semibold leading-[20px] text-[#1d2129]">СберБанк Онлайн</div><div className="mt-[3px] block h-[18px] max-h-[80px] border-separate select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[20px] text-[#606770]" style="-webkit-line-clamp: 1; border-spacing: 0px; -webkit-box-orient: vertical;">СберБанк Онлайн</div></div></div></div></div> */ }