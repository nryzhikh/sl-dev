import { useEffect } from "react";
import { useForm, useWatch, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  CopyIcon,
} from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SmartlinkFormValues,
  SmartlinkFormSchema,
  defaultValues,
} from "@/components/form/schema/FormSchema.tsx";
import { labels, UtmKeys } from "@/constants/fieldDescriptions";
import { useToast } from "@/components/ui/use-toast";
import { useState, useContext } from "react";
import { Label } from "@/components/ui/label";
import FormPopover from "@/components/form/components/FormTooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  // AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import ComputerIcon from '@mui/icons-material/Computer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiSubmitFormData, apiUpdateEntry, apiGetSlNames } from "@/api/api";
import FormInput from "./fields/FormInput";
import FormSeparator from "@/components/form/components/FormSeparator";
import OgSection from "./sections/OgSection";
import IosSection from "./sections/IosSection";
import AndroidSection from "./sections/AndroidSection";
import { AuthContext } from "@/context/auth.context"
import { RefetchContext } from "@/context/refetch.context"
import FormInputWithPlaceholder from "./fields/FormInputWithPlaceholder";



declare global {
  interface Window {
    dataLayer: unknown[];
    dataLayerSL: unknown[];
  }
}

export function SmartlinkForm({
  values,
  isFromTable = false,
  closeDialog,
}: {
  values?: SmartlinkFormValues;
  isFromTable?: boolean;
  closeDialog?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [slNames, setSlNames] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>();
  const authContext = useContext(AuthContext);
  const { triggerRefetch } = useContext(RefetchContext);


  const fetchSlNames = async () => {
    try {
      setSlNames(await apiGetSlNames())
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: (error instanceof Error) ? error.message : "Ошибка при загрузке списка смартлинков",
      });
    }
  };

  useEffect(() => {
    fetchSlNames();
  }, []);


  const showSuccessAlert = () => {
    setIsAlertOpen(true);
  };
  // const handleOkClick = () => {
  //   window.location.reload();useContext(AuthContext)?.noValidation
  // };


  const form = useForm<SmartlinkFormValues>({
    resolver: zodResolver(SmartlinkFormSchema(slNames, isFromTable, useContext(AuthContext)?.noValidation || false)),
    defaultValues: values || defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (authContext?.noValidation) {
      form.trigger();
    }
    
  }, [authContext?.noValidation]);


  useEffect(() => {
    form.reset(values || defaultValues);
  }, [values]);


  const need_utm = useWatch({
    control: form.control,
    name: "need_utm",
    defaultValue: form.getValues("need_utm"),
  });

  const sl_name = useWatch({
    control: form.control,
    name: "sl_name",
    defaultValue: form.getValues("sl_name"),
  });

  const android_app = useWatch({
    control: form.control,
    name: "android_app",
    defaultValue: form.getValues("android_app"),
  });

  const android_dp = useWatch({
    control: form.control,
    name: "android_dp",
    defaultValue: form.getValues("android_dp"),
  });

  // const tp_utm_source = useWatch({
  //   control: form.control,
  //   name: "tp_utm_source",
  //   defaultValue: form.getValues("tp_utm_source"),
  // });
  // const tp_utm_medium = useWatch({
  //   control: form.control,
  //   name: "tp_utm_medium",
  //   defaultValue: form.getValues("tp_utm_medium"),
  // });
  // const tp_utm_campaign = useWatch({
  //   control: form.control,
  //   name: "tp_utm_campaign",
  //   defaultValue: form.getValues("tp_utm_campaign"),
  // });
  // const tp_utm_content = useWatch({
  //   control: form.control,
  //   name: "tp_utm_content",
  //   defaultValue: form.getValues("tp_utm_content"),
  // });
  // const tp_utm_tern = useWatch({
  //   control: form.control,
  //   name: "tp_utm_tern",
  //   defaultValue: form.getValues("tp_utm_tern"),
  // });


  const { toast } = useToast();

  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;


  useEffect(() => {
    if (android_dp !== android_app) {
      form.setValue("android_app", android_dp);
    }
  }, [android_dp]);


  useEffect(() => {

    const utmMapping: { [key: string]: string } = {
      "email": "email",
      "sms": "sms",
      "km": "km",
      "no utm": "",
      "landing": "landing"
    };

    const utmValue = utmMapping[need_utm];

    if (utmValue !== undefined) {
      form.setValue("tp_utm_source", utmValue);
      form.setValue("tp_utm_medium", utmValue);
      if (!isFromTable) {
        form.setValue("tp_utm_campaign", utmValue === "" ? "" : `sl_${sl_name}_${formattedCurrentDate}`);
      }
      form.setValue("tp_utm_content", "");
      form.setValue("tp_utm_tern", "");
    }

  }, [
    need_utm,
    sl_name,
  ]);

  // const [customValues, setCustomValues] = useState({
  //   tp_utm_source: "",
  //   tp_utm_medium: "",
  //   tp_utm_campaign: "",
  //   tp_utm_content: "",
  //   tp_utm_tern: "",
  // });
  // const [previousNeedUtm, setPreviousNeedUtm] = useState("");


  // useEffect(() => {
  //   if (need_utm === "custom") {
  //     form.setValue("tp_utm_source", customValues.tp_utm_source);
  //     form.setValue("tp_utm_medium", customValues.tp_utm_medium);
  //     form.setValue("tp_utm_campaign", customValues.tp_utm_campaign);
  //     form.setValue("tp_utm_content", customValues.tp_utm_content);
  //     form.setValue("tp_utm_tern", customValues.tp_utm_tern);
  //   } else if (previousNeedUtm === "custom") {
  //     setCustomValues({
  //       tp_utm_source: tp_utm_source ? tp_utm_source : "",
  //       tp_utm_medium: tp_utm_medium ? tp_utm_medium : "",
  //       tp_utm_campaign: tp_utm_campaign ? tp_utm_campaign : "",
  //       tp_utm_content: tp_utm_content ? tp_utm_content : "",
  //       tp_utm_tern: tp_utm_tern ? tp_utm_tern : "",
  //     });
  //   }
  //   setPreviousNeedUtm(need_utm);
  // }, [need_utm]);



  function cleanUpData(data: SmartlinkFormValues): SmartlinkFormValues {

    data.multi_app_ios ? data.ios_dp = "" : data.ios_apps_dp = [{ value: "" }];
    data.need_web_and ? data.store_link_and = "" : data.web_link_and = "";
    data.need_web_ios ? data.store_link_ios = "" : data.web_link_ios = "";
    data.pfa ? data.pfa_name = "" : data.pfa_name = labels.pfa_name.placeholder;

    if (!data.custom_web_link_and && data.need_web_and) {
      data.web_link_and = data.web_link_desk;
    }

    if (!data.custom_web_link_ios && data.need_web_ios) {
      data.web_link_ios = data.web_link_desk;
    }

    if (!data.custom_params) {
      data.params_url =
        data.params_web =
        data.params_ios =
        data.params_and =
        "";
    }



    return data;
  }


  async function onSubmit(data: SmartlinkFormValues): Promise<void> {



    try {
      setLoading(true);
      const cleanData = cleanUpData(data);


      if (isFromTable) {
        await apiUpdateEntry(cleanData);
      } else {
        await apiSubmitFormData(cleanData);
      }

      await pushDataLayer(cleanData, isFromTable, authContext?.user?.username);

      const newSubmitedSl = `sberbank.com/sms/${data.sl_name}`;

      if (!isFromTable) {
        setAlertMessage(getNextWorkingDay(newSubmitedSl))
      } else {
        setAlertMessage(getNextWorkingDay(newSubmitedSl))
      }
      showSuccessAlert();
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        handleSubmissionError((error as any).response.data.error);
        setLoading(false);
      }
    } finally {
      fetchSlNames();
      triggerRefetch();
      form.reset(defaultValues);
      setLoading(false);
    }

  }


  function handleSubmissionError(errorMessage: string): void {
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: errorMessage,
    });
  }


  function getNextWorkingDay(newSubmitedSl: string) {
    const now = new Date();
    let nextDay = new Date(now);

    // Add 1 day until the day of the week is a working day (1-5)
    do {
      nextDay.setDate(nextDay.getDate() + 1);
    } while (nextDay.getDay() === 0 || nextDay.getDay() === 6);

    // Set the time to 12:00
    nextDay.setHours(12, 0, 0, 0);

    // Format the date and time
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const formattedDate = nextDay.toLocaleString('ru-RU', options);

    return (
      <div className="text-sm text-muted-foreground">
        {newSubmitedSl}
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="ml-1 mt-1 h-4 w-4"
          onClick={async () => {
            await navigator.clipboard.writeText(newSubmitedSl);
          }}
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
        <br />
        <br />
        Смартлинк отправлен на модерацию, ориентировочный срок подтверждения: {formattedDate}
        <br />
        По срочным вопросам звоните: +7 910 429 30 77
      </div>
    );
  }

  async function pushDataLayer(data: SmartlinkFormValues, isFromTable: boolean, username?: string): Promise<void> {
    window.dataLayerSL = window.dataLayerSL || [];
    window.dataLayerSL.push(
      !isFromTable ? "create" : "update",
       JSON.stringify(data), 
       JSON.stringify(username)

      // event: "smartlink_" + data.sl_name,
      // action: "create",
      // label: generateDataLayerLabel(data),

    );
  }

  async function onError(errors: FieldErrors<SmartlinkFormValues>) {
    console.log(errors);
  }


  return (
    <div className="px-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          noValidate
          className="space-y-2 "
        >
          <FormField
            control={form.control}
            name="sl_name"
            render={({ field, fieldState }) => (
              <>
                {!isFromTable && (
                  <FormInputWithPlaceholder
                    field={field}
                    fieldState={fieldState}
                    label="Уникальное имя"
                    placeholder="sberbank.com/sms/"
                    tooltip="Уникальное имя — это часть URL-адреса Например, в ссылке sberbank.com/sms/main именем является main. В том числе имя назначается как аналитический параметр (например, в external_source) для сбора статистики в системах аналитики ClickStream и др."
                  />
                )}
              </>
            )}
          />

          <FormField
            control={form.control}
            name="need_utm"
            render={({ field }) => (
              <Tabs defaultValue={field.value}
                onValueChange={(value) => {
                  form.setValue("need_utm", String(value));
                  form.trigger("need_utm");
                }}
                className="w-full">
                <div className=" ml-1 pb-1 flex justify-between items-end">
                  <div>
                    <FormMessage className="text-xs">
                      <Label className="text-muted-foreground text-xs">
                        {labels.need_utm.label}
                      </Label>
                    </FormMessage>
                  </div>

                  <FormPopover
                    className="pr-1"
                    description={labels.need_utm.tooltip} />
                </div>
                <TabsList className="grid grid-cols-4 gap-2 bg-white h-full">
                  {labels.need_utm.tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab} className="flex-shrink min-w-0 flex-grow border h-7 bg-muted  md:text-sm text-xs rounded-md">{tab === "no utm" ? "Без UTM" : tab.toUpperCase()}</TabsTrigger>
                  ))}
                </TabsList>
                {need_utm === "no utm" && (
                  <div className="flex mt-1 ml-1">
                    <FormDescription className="flex-col flex ">
                      <span className="text-xs">Внимание! Допишите UTM-метки вручную для отслеживания канала коммуникации.</span>
                    </FormDescription>
                  </div>
                )}
                {labels.need_utm.tabs.map((tab, index) => (
                  need_utm && need_utm !== "no utm" && (
                    <TabsContent value={tab} key={index}>
                      <div className="ml-1 mt-1 items-start justify-center gap-3 rounded-lg grid grid-cols-2 lg:grid-cols-12 xl:grid-cols-12">
                        {(

                          Object.entries(labels.utm).map(([key, value]) => (
                            <FormField
                              control={form.control}
                              name={key as UtmKeys}
                              key={key}
                              render={({ field, fieldState }) => {
                                useEffect(() => {
                                  form.trigger(field.name); // manually trigger validation for this field
                                }, [field.value]); // re-run this effect whenever field.value changes

                                const isUtmField = ["tp_utm_source", "tp_utm_medium"].includes(key);

                                return (



                                  <FormItem
                                    className={
                                      `${key === "tp_utm_campaign" ?
                                        "lg:col-span-6" : "lg:col-span-3"
                                      } `}>
                                    <div className="flex justify-start">
                                      <Label className={
                                        fieldState.error
                                          ? "text-destructive text-xs"
                                          : "text-muted-foreground text-xs"
                                      }>
                                        {fieldState.error ? `${value.label}${fieldState.error.message}` : value.label}
                                      </Label>
                                    </div>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        onChange={(e) => {
                                          e.target.value = e.target.value.replace(/\s/g, '');
                                          field.onChange(e);
                                        }}
                                        disabled={isUtmField && need_utm !== "custom"}
                                        className={
                                          fieldState.error
                                            ? "focus-visible:ring-0 border-destructive"
                                            : !isUtmField || need_utm === "custom" ? "" : "bg-zinc-100"
                                        }
                                      />
                                    </FormControl>
                                  </FormItem>
                                );
                              }}
                            />
                          )))}
                      </div>
                    </TabsContent>
                  )
                ))}
              </Tabs>
            )}
          />
          <div className="p-1"></div>
          <FormSeparator
            name="ANDROID"
            icon={<AndroidIcon className="bg-white" />}
            tooltip="Ссылкой для Android может являться deeplink в мобильное приложение, а также URL-адрес (ссылка на страницу сайта), если требуется направить пользователя на сайт"
          />

          <AndroidSection />
          <div className="p-1"></div>

          <FormSeparator
            name="IOS"
            icon={<AppleIcon className="bg-white" />}
            tooltip="Ссылкой для iOS может являться deeplink в мобильное приложение, а также URL-адрес (ссылка на страницу сайта), если требуется направить пользователя на сайт"
          />
          <IosSection isFromTable={isFromTable} />
          <div className="p-1"></div>

          <FormSeparator
            name="DESKTOP"
            icon={<ComputerIcon className="bg-white" />}
            tooltip="Ссылка для Desktop – ссылка на страницу сайта, которая будет использована в случае перехода по ссылке с НЕ Android или iOS устройства."
          />
          <FormField
            control={form.control}
            name="web_link_desk"
            render={({ field, fieldState }) => (
              <FormInput
                field={field}
                fieldState={fieldState}
                label="Ссылка на страницу сайта"
                placeholder="https://"
              />
            )}
          />
          <FormSeparator
            name="ДОПОЛНИТЕЛЬНО"
          />
          <OgSection isFromTable={isFromTable} />
          <FormSeparator
            name="КОМЕНТАРИИ"
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Необязательно..."
                    className="resize-none text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-2" />
          <div className=" flex justify-end">
            <Button
              type="submit"
              className="mt-2 text-right justify-end"
              disabled={loading || (isFromTable && Object.keys(form.formState.dirtyFields).length === 0)}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-14" />
                </>
              ) : isFromTable ? (
                "Сохранить"
              ) : (
                "Создать"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Успешно</AlertDialogTitle>
            {/* <AlertDialogDescription> */}

            {alertMessage}
            {/* <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4"
              >
                <CopyIcon className="h-4 w-4" />
              </Button> */}
            {/* </AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeDialog}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
