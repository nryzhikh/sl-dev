import FormPopover from "@/components/form/components/FormTooltip";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';


interface FormInputProps {
    field: any,
    fieldState: any,
    label: string,
    placeholder?: string,
    tooltip?: string,
    readOnly?: boolean,
    removeSpaces?: boolean,
    disabled?: boolean,
}


const FormInput = ({
    field,
    fieldState,
    label,
    placeholder,
    tooltip,
    readOnly = false,
    removeSpaces = false,
    disabled = false,
}: FormInputProps) => {
    const errorMessage = fieldState.error?.message;

    return (
        <div className="w-full px-1 pb-1">
            <div className="flex justify-between items-end pb-2">
                {errorMessage ? (
                    <Label className="text-destructive text-xs" htmlFor={field.name}>
                        {`${label} - ${errorMessage}`}
                    </Label>
                ) : (
                    <Label className="text-muted-foreground text-xs" htmlFor={field.name}>
                        {label}
                    </Label>
                )}
                {tooltip && <FormPopover 
                description={tooltip} />}
            </div>
            <Input
                id={field.name}
                readOnly={readOnly}
                placeholder={placeholder}
                {...field}
                className={`${errorMessage ? "focus-visible:ring-0 border-destructive" : ""
                    } text-slate-800 text-sm `}
                onChange={(e) => {
                    if (removeSpaces) {
                        e.target.value = e.target.value.replace(/\s/g, '');
                    }
                    field.onChange(e);
                }}
                disabled={disabled}
            />
        </div>
    );
};

export default FormInput;