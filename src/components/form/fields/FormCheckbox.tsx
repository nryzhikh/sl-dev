import { Label } from "@/components/ui/label";
import FormTooltip from "../components/FormTooltip";
import { Switch } from "@/components/ui/switch"
import AnimatedVisibility from "../animation/AnimatedVisibility";



interface FormCheckBoxProps {
    field: any,
    fieldState?: any,
    label: string,
    placeholder?: string,
    readOnly?: boolean,
    removeSpaces?: boolean,
    disabled?: boolean,
    visible?: boolean,
    tooltip?: string,
}

const FormCheckBox = ({
    field,
    label,
    placeholder,
    disabled = false,
    tooltip,
} : FormCheckBoxProps )  => {


    return (
            <div className="flex justify-between pl-1 py-1">
                <div className="flex flex-row items-center justify-between w-full">
                   
                    <Label className="text-xs text-muted-foreground">
                        {label}
                    </Label>
                    <Switch
                        {...field}
                        placeholder={placeholder}
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                        disabled={disabled}
                    />
                </div>
                {tooltip && <FormTooltip description={tooltip} />}
            </div>
    );
};

export default AnimatedVisibility(FormCheckBox as any);