import { useFormContext, useWatch } from "react-hook-form";
import {
    FormField,
} from "@/components/ui/form";
import FormInput from "@/components/form/fields/FormInput";
import FormLabeledSwitch from "../../fields/FormLabeledSwitch";
import HttpOutlinedIcon from '@mui/icons-material/HttpOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { useEffect } from 'react';
import AnimatedVisibility from "../../animation/AnimatedVisibility";
import FormCheckBox from "@/components/form/fields/FormCheckbox.tsx";


const ConditionalInputComponent = ({ control, inputField, inputLabel }: { control: any, inputField: string, inputLabel: string }) => (
    <div className="mt-3">
        <FormField
            control={control}
            name={inputField}
            render={({ field, fieldState }) => (
                <FormInput
                    field={field}
                    fieldState={fieldState}
                    placeholder="https://"
                    removeSpaces
                    label={inputLabel}
                />
            )}
        />
    </div>
)

const AnimatedConditionalInput = AnimatedVisibility(ConditionalInputComponent as any);


interface NeedWebSubSectionProps {
    needField: string,
    inputField: string,
    inputLabel: string,
    customWebLinkSwitchLabel: string,
    customWebLinkSwitchField: string,
    children: React.ReactNode
}

const NeedWebSubSection = ({

    needField,
    inputField,
    inputLabel,
    customWebLinkSwitchLabel,
    customWebLinkSwitchField,
    children
}: NeedWebSubSectionProps) => {
    const { control, setValue } = useFormContext();
    const need = useWatch({ control, name: needField });
    const customWebLinkSwitch = useWatch({ control, name: customWebLinkSwitchField });
    const web_link_desk = useWatch({ control, name: "web_link_desk" });
    const inputFieldValue = useWatch({ control, name: inputField });

    useEffect(() => {
        if (need) {
            if (inputFieldValue === "") {
                setValue(inputField, web_link_desk)
            }
        } else {
            setValue(customWebLinkSwitchField, false)
            setValue(inputField, "")
        }

    }, [need, web_link_desk, setValue]);



    return (
        <div className="space-y-1 ">
            <FormField
                control={control}
                name={needField}
                render={({ field }) => (
                    <FormLabeledSwitch
                        field={field}
                        label="Сценарий без приложения"
                        FalseIcon={StoreOutlinedIcon}
                        TrueIcon={HttpOutlinedIcon}
                    />
                )}
            />
            {children}
            <FormField
                control={control}
                name={customWebLinkSwitchField}
                render={({ field }) => (
                    <FormCheckBox
                        isVisible={need}
                        field={field}
                        label={customWebLinkSwitchLabel}

                    />
                )}
            />

            <AnimatedConditionalInput isVisible={customWebLinkSwitch && need} control={control} inputField={inputField} inputLabel={inputLabel} />

        </div>
    );
};

export default AnimatedVisibility(NeedWebSubSection as any);