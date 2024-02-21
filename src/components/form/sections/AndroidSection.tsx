import { useFormContext, useWatch } from "react-hook-form";
import {
    FormField,
} from "@/components/ui/form";
import FormInput from "@/components/form/fields/FormInput";
import NeedWebSubSection from "./sub-sections/NeedWebSubSection";


const andRegex = /^sberbankonline:\/\/|^android-app:\/\/|^ru.sberbankmobile:\/\//;


const AndroidSection = () => {
    const { control } = useFormContext();
    const android_dp = useWatch({ control, name: "android_dp" });
    const isVisible = android_dp?.match(andRegex);



    return (
        <>
            <FormField
                control={control}
                name="android_dp"
                render={({ field, fieldState }) => (
                    <FormInput
                        field={field}
                        fieldState={fieldState}
                        label="Deeplink или ссылка на страницу сайта"
                        placeholder="пример: android-app://"
                    />

                )}
            />
            <NeedWebSubSection
                isVisible={!!isVisible}
                needField="need_web_and"
                inputField="web_link_and"
                customWebLinkSwitchLabel="Отдельная веб-ссылка для сценария Android без приложения"
                inputLabel="Ссылка на веб-страницу для Android"
                customWebLinkSwitchField="custom_web_link_and"
            />

        </>


    )
}

export default AndroidSection;