import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FieldTooltipProps {
  description?: string;
}

const FieldTooltip = ({ description }: FieldTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip >
        <TooltipTrigger asChild className="focus:outline-none ">
          <InfoCircledIcon className="h-4 w-4 text-zinc-500 focus:outline-none" />
        </TooltipTrigger>
        <TooltipContent style={{ whiteSpace: 'pre-line' }}>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FieldTooltip;
