import { useFormContext, useWatch } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/form/fields/FormInput";
import { useState } from "react";
import OGPreview from "@/components/form/components/OGPreview";
import { Switch } from "@/components/ui/switch";
import AnimatedVisibility from "@/components/form/animation/AnimatedVisibility";
// import FileInput from '@/components/form/components/FileInput';
import { Input } from "@/components/ui/input";



interface OGSectionProps {
    isFromTable: boolean;
}


const OgSectionBody = ({ control, og_image_file, meta_description, meta_title, og_image }:
    { control: any, og_image_file: File, meta_description: string, meta_title: string, og_image: string }) => (
    <div className="space-y-2">
        <FormField
            control={control}
            name="meta_title"
            render={({ field, fieldState }) => (
                <FormInput
                    field={field}
                    fieldState={fieldState}
                    label="Meta title / Заголовок"
                    placeholder="пример: СберБанк Онлайн"
                />
            )}
        />
        <FormField
            control={control}
            name="meta_description"
            render={({ field, fieldState }) => (
                <FormInput
                    field={field}
                    fieldState={fieldState}
                    label="Meta description / Описание"
                    placeholder="пример: Онлайн-банк для физических лиц"
                />
            )}
        />
        {/* {isFromTable && (
            <FormField
                control={control}
                name="og_image"
                render={({ field, fieldState }) => (
                    <FormInput
                        field={field}
                        fieldState={fieldState}
                        label="Текущая картинка"
                        readOnly={true}
                    />

                )}
            />
        )} */}
        <FormField
            control={control}
            name="og_image_file"
            render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="ml-1">
                    <FormMessage className="p-0 m-0">
                        <Label className=" pb-0 mb-0 text-muted-foreground text-xs">
                            Загрузите картинку
                        </Label>
                    </FormMessage>
                    <FormControl>
                      <Input
                        id={field.name}
                        type="file"
                        onChange={(event) => {
                            onChange(event.target?.files?.[0] || null);
                        }}
                        accept="image/png,image/jpeg,image/jpg,image/gif"
                    />
                    </FormControl>
                </FormItem>
            )}
        />
        {(og_image || og_image_file) && (
            <OGPreview meta_description={meta_description} meta_title={meta_title} og_image_file={og_image_file} og_image={og_image} />
        )}
    </div>
)

const OgSectionBodyAnimated = AnimatedVisibility(OgSectionBody as any);

const OgSection = ({
    isFromTable
}: OGSectionProps) => {

    const { control } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);
    const meta_title = useWatch({ control, name: "meta_title" });
    const meta_description = useWatch({ control, name: "meta_description" });
    const og_image_file = useWatch({ control, name: "og_image_file" });
    const og_image = useWatch({ control, name: "og_image" });

    return (
        <>
            <div className="flex items-center justify-between pb-2">
                <Label className="pl-1 text-xs text-muted-foreground">Настроить превью для соцсетей</Label>
                <Switch checked={isOpen} onCheckedChange={() => setIsOpen(!isOpen)} />
            </div>
            <OgSectionBodyAnimated isVisible={isOpen} control={control} isFromTable={isFromTable} og_image_file={og_image_file} meta_description={meta_description} meta_title={meta_title} og_image={og_image} />
        </>
    );
}

export default OgSection;

