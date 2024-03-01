import { useState } from 'react';
import { cn } from "@/lib/utils"
import { Label } from '@/components/ui/label';
import FormPopover from "@/components/form/components/FormTooltip";



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


const FormInputWithPlaceholder = ({
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
    const [isFocused, setIsFocused] = useState(false);


    const handlePlaceholderClick = () => {
        setIsFocused(true);
        const inputElement = document.getElementById(field.name);
        inputElement?.focus();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };


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
            <div
                className={cn("flex w-full h-9 border rounded-md border-input bg-transparent shadow-sm transition-colors", {
                    'ring-1 ring-ring outline-none': isFocused,
                    'ring-0 border-destructive': errorMessage,
                })}
            >
                <div
                    className="flex items-center rounded-l-md pl-3 text-sm text-muted-foreground min-w-0"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        handlePlaceholderClick();
                    }}
                    

                >
                    {placeholder}
                </div>
                <input
                    id={field.name}
                    {...field}
                    readOnly={readOnly}
                    type="text"
                    className="flex-1 border-none outline-none text-sm rounded-r-md"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => {
                        if (removeSpaces) {
                            e.target.value = e.target.value.replace(/\s/g, '');
                        }
                        field.onChange(e);
                    }}
                    disabled={disabled}

                />
                {/* Add more input fields as needed */}
            </div>
        </div>
    );
}

export default FormInputWithPlaceholder;