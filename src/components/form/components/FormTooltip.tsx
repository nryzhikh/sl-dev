import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface FormPopoverProps {
  description?: string;
  className?: string;
}
const FormTooltip = ({ description, className }: FormPopoverProps) =>  {
  const descriptionWithLineBreaks = description
  ? description.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ))
  : '';

  return (
    <div className={className}>
    
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex justify-end items-end">
      <Button variant="ghost" type="button" size="icon" className="rounded-full w-4 h-4">
          <InfoCircledIcon className=" text-zinc-700 " />
        </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <Label className=" text-muted-foreground text-xs">
          {descriptionWithLineBreaks}
        </Label>
      </PopoverContent>
    </Popover>
    </div>
  );
}

export default FormTooltip;
