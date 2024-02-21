import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import FieldPopover from "./FormTooltip";

interface TabSelectorProps {
  children: React.ReactNode;
  closedText: string;
  openText: string;
  openLabel?: string;
  closedLabel?: string;
  title?: string;
  description?: string;
  onChange?: (value: boolean) => void; // Modify the onChange prop to accept a boolean
  isOpen: boolean; // Step 2: Add an isOpen prop
  tooltip?: string;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  closedText,
  openText,
  openLabel,
  closedLabel,
  children,
  title,
  onChange,
  isOpen,
  tooltip,
}) => {
  return (
    <Tabs
      defaultValue={isOpen ? "open" : "closed"}
      className="w-full"
      onValueChange={(value) => onChange && onChange(value === "open")}
    >
       <Label className="ml-1 flex justify-center my-2 text-xs text-muted-foreground">
        {isOpen ? openLabel : closedLabel}
      </Label>
      <TabsList className="grid w-full grid-cols-2 h-full">
        <TabsTrigger
          value="closed"
          className="whitespace-normal overflow-auto h-full"
        >
          {closedText}
        </TabsTrigger>
        <TabsTrigger
          value="open"
          className="whitespace-normal overflow-auto h-full"
        >
          {openText}
        </TabsTrigger>
      </TabsList>
     

      <TabsContent value="open">
        <Card>
          <div className="flex items-center justify-between mb-2 mt-4 mx-3">
            <div/>
          <Label className="text-muted-foreground text-xs ml-1">{title}</Label>

          <FieldPopover description={tooltip} />
          </div>
          <CardContent className="m-0 px-4 pt-1 pb-2 mb-2">
            {children}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabSelector;
