import { useFormContext, useWatch } from "react-hook-form";
import {
  FormField,
} from "@/components/ui/form";
import FormInput from "@/components/form/fields/FormInput";
// import { useEffect } from "react";
// import { Button } from "@/components/ui/button";
import FormFieldArray from "../fields/FormFieldArray";
// import {
//   TrashIcon,
//   PlusIcon,
// } from "@radix-ui/react-icons";
import FormCheckBox from "../fields/FormCheckbox";
import NeedWebSubSection from "./sub-sections/NeedWebSubSection";
// import AnimationWrapper from "@/components/form/animation/AnimationWrapper";
// import { Label } from '@/components/ui/label';




const iosRegex = /^sberbankonline:\/\/|^sbolonline:\/\/|^btripsexpenses:\/\//;

const IosSection = ({ isFromTable }: { isFromTable: boolean }) => {

  const { control } = useFormContext();

  const multi_app_ios = useWatch({ control, name: "multi_app_ios" });
  const ios_dp = useWatch({ control, name: "ios_dp" });


  // const shouldDisplayButtons = ios_dp && ios_dp.match(iosRegex) && multi_app_ios;
  // const isAppAdded = (appUrl: string) => ios_apps_dp.some((item: Record<string, string>) => item.value.startsWith(appUrl));
  // const toggleApp = (appUrl: string) => {
  //   const appIndex = ios_apps_dp.findIndex((item: Record<string, string>) => item.value.startsWith(appUrl));
  //   if (!isAppAdded(appUrl)) {
  //     append({ value: appUrl });
  //   } else {
  //     remove(appIndex);
  //   }
  // };
  // const isButtonDisabled = (appUrl: string) => appUrl === ios_dp.split('://')[0] + '://';

  const isVisible = ios_dp?.match(iosRegex) || multi_app_ios;


  return (
    <>

      {!multi_app_ios ? (
        <FormField
          control={control}
          name="ios_dp"
          render={({ field, fieldState }) => (
            <FormInput
              field={field}
              fieldState={fieldState}
              label="Deeplink или ссылка на страницу сайта"
              placeholder="пример: sberbankonline://"
              removeSpaces
              disabled={multi_app_ios}

            />
          )}
        />
      ) : (
        <>
          <FormFieldArray
            fieldName="ios_apps_dp"
            label="Deeplink или ссылка на страницу сайта"
            removeSpaces={true}
            isFromTable={isFromTable}
          />
        </>
      )}

      <NeedWebSubSection
        isVisible={!!isVisible}
        needField="need_web_ios"
        inputField="web_link_ios"
        customWebLinkSwitchLabel="Отдельная веб-ссылка для сценария iOS без приложения"
        inputLabel="Ссылка на веб-страницу для iOS"
        customWebLinkSwitchField="custom_web_link_ios"
      >

      <FormField
        control={control}
        name="multi_app_ios"
        render={({ field }) => (
          <FormCheckBox
            isVisible={!!isVisible}
            field={field}
            label="Задать последовательность из нескольких приложений iOS"
          />
        )}
      />
      </NeedWebSubSection>



      {/* <AnimationWrapper isVisible={multi_app_ios}>
            <div className="grid grid-cols-3 space-x-2 my-1 mx-1">
              {iosApps.map((app, index) => shouldDisplayButtons && (
                <Button
                  key={index}
                  variant="secondary"
                  className="text-sm h-7 flex items-center justify-center relative"
                  type="button"
                  onClick={() => toggleApp(app.url)}
                  disabled={isButtonDisabled(app.url)}
                >
                  <div className="absolute left-0 flex items-center justify-center border-r h-full px-2">
                    {isAppAdded(app.url) ? <TrashIcon className="h-4 w-4 mr-1" /> : <PlusIcon />}
                  </div>
                  <p className="text-xs">{app.name}</p>
                </Button>
              ))}
            </div>
          </AnimationWrapper> */}

    </>
  )
}

export default IosSection;