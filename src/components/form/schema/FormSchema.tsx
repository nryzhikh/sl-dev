/* eslint-disable react-refresh/only-export-components */

import * as z from "zod";
import { andRegex } from "@/constants/constants";
import { labels } from "@/constants/fieldDescriptions";

const utmParamsRegex = /^[a-z0-9-_=]+$/
const urlRegex = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
  "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  "(\\#[-a-z\\d_]*)?$", // fragment locator
  "i"
);
const allowedUrlRegex =
  /^(https:\/\/|http:\/\/|https:\/\/www\.|http:\/\/www\.)(sberbank\.com|sberbank\.ru|spasibosberbank\.ru|online\.sberbank\.ru|sbi\.sberbank\.ru|sberbankins\.ru|spasibosberbank\.ru)|^sberbankonline:\/\/|^sbolonline:\/\/|^btripsexpenses:\/\/|^sbermobilechat:\/\/|^sbbol:\/\/|^sberinvestor:\/\/|^newinvestor:\/\/|^investorx\.prod:\/\/|^ru\.sberbank\.sberinvestor:\/\/|^investorplus:\/\/|^sberpay:\/\/|^sbolpay:\/\/|^android-app:\/\/ru\.sberbankmobile/;
const webUrlRegex = /^(https:\/\/|http:\/\/|https:\/\/www\.|http:\/\/www\.)(sberbank\.com|sberbank\.ru|spasibosberbank\.ru|online\.sberbank\.ru|sbi\.sberbank\.ru|sberbankins\.ru|spasibosberbank\.ru)/;
const iosRegex = /^sberbankonline:\/\/|^sbolonline:\/\/|^btripsexpenses:\/\//;

export const DisabledSmartLinkSchema = z
  .object({
    sl_name: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    need_utm: z.string().optional(),
    tp_utm_source: z.string().optional(),
    tp_utm_medium: z.string().optional(),
    tp_utm_campaign: z.string().optional(),
    tp_utm_content: z.string().optional(),
    tp_utm_tern: z.string().optional(),
    android_dp: z.string().optional(),
    need_web_and: z.boolean().optional(),
    custom_web_link_and: z.boolean().optional(),
    web_link_and: z.string().optional(),
    store_link_and: z.string().optional(),
    android_app: z.string().optional(),
    ios_dp: z.string().optional(),
    multi_app_ios: z.boolean().optional(),
    need_web_ios: z.boolean().optional(),
    custom_web_link_ios: z.boolean().optional(),
    web_link_ios: z.string().optional(),
    store_link_ios: z.string().optional(),
    ios_apps_dp: z.array(z.object({ value: z.string().optional() })).optional(),
    web_link_desk: z.string().optional(),
    custom_params: z.boolean().optional(),
    params_url: z.string().optional(),
    params_web: z.string().optional(),
    params_ios: z.string().optional(),
    params_and: z.string().optional(),
    pfa: z.boolean().optional(),
    pfa_name: z.string().optional(),
    comments: z.string().optional(),
    og_image_file: z.any().optional(),
    og_image: z.string().optional(),
  })

export const SmartLinkSchema = z
  .object({
    sl_name: z.string(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),

    need_utm: z.string().refine(value => value !== "", "Канал коммуникации - Необходимо указать"),
    tp_utm_source: z.string().trim().optional(),
    tp_utm_medium: z.string().trim().optional(),
    tp_utm_campaign: z
      .string()
      .trim()
      .optional(),
    tp_utm_content: z
      .string()
      .trim()
      .optional()
      .refine(value => value === '' || utmParamsRegex.test(value as string), {
        message: "Ошибка",
      }),
    tp_utm_tern: z
      .string()
      .trim()
      .refine(value => value === '' || utmParamsRegex.test(value as string), {
        message: "Ошибка",
      })
      .optional(),
    android_dp: z
      .string()
      .trim()
      .refine((value) => allowedUrlRegex.test(value as string), {
        message: "Недопустимый URL",
      })
      .refine((value) => !/\s/.test(value), {
        message: "Пробел в строке",
      }),
    need_web_and: z.boolean(),
    custom_web_link_and: z.boolean(),
    web_link_and: z.string().trim().optional(),
    store_link_and: z.string().trim().optional(),
    android_app: z.string().optional(),

    ios_dp: z.string()
      .trim()
      .transform((val) => val.replace(/\s/g, ''))
      .optional(),
    multi_app_ios: z.boolean().optional(),
    need_web_ios: z.boolean(),
    custom_web_link_ios: z.boolean(),
    web_link_ios: z.string().trim().optional(),
    store_link_ios: z.string().trim().optional(),
    ios_apps_dp: z
      .array(
        z.object({
          value: z
            .string()
            .trim()
            .transform((val) => val.replace(/\s/g, ''))
            
        })
      )
      .optional(),

    web_link_desk: z
      .string()
      .trim()
      .refine((value) => allowedUrlRegex.test(value), {
        message: "Недопустимый URL",
      })

      .refine((value) => !/\s/.test(value), {
        message: "Пробел в строке",
      }),
    custom_params: z.boolean(),
    params_url: z
      .string()
      .trim()

      .optional(),
    params_web: z
      .string()
      .trim()

      .optional(),
    params_ios: z
      .string()
      .trim()

      .optional(),
    params_and: z
      .string()
      .trim()

      .optional(),
    pfa: z.boolean().default(true).optional(),
    pfa_name: z
      .string()
      .trim()
      .regex(utmParamsRegex, {
        message: "* - Недопустимый символ",
      })
      .or(z.literal(""))
      .optional(),
    comments: z.string().optional(),
    og_image_file: z.any().refine((file) => file ? file instanceof File && file.size <= 8 * 1024 * 1024 : true, {
      message: 'File size must be less than 8MB',
    }),
    og_image: z.string().optional(),
  })
  .superRefine((data, refinementContext) => {
    type Fileds = {
      name: string;
      label: string;
    };

    if (data && data.multi_app_ios && data.ios_apps_dp) {
      for (const app of data.ios_apps_dp) {
        if (!iosRegex.test(app.value)) {
          refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Недопустимый URL",
            path: [`ios_apps_dp[${data.ios_apps_dp.indexOf(app)}].value`],
          });
        }
      }
    }

    if (data && !data.multi_app_ios) {
        if (!allowedUrlRegex.test(data.ios_dp ?? "") || data.ios_dp === "") {
          refinementContext.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Недопустимый URL",
            path: ["ios_dp"],
          });
        }
      }
    

    if (data?.custom_web_link_and && !webUrlRegex.test(data.web_link_and ?? '')) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Недопустимый URL",
        path: ["web_link_and"],
      });
    }

    if (data?.custom_web_link_ios && !webUrlRegex.test(data.web_link_ios ?? '')) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Недопустимый URL",
        path: ["web_link_ios"],
      });
    }



    function checkFields(fields: Fileds[], need: string, regExp: RegExp) {
      if (data[need as keyof typeof data] && data[need as keyof typeof data] !== "no utm") {
        for (const fieldObj of fields) {
          const fieldValue = data[fieldObj.name as keyof typeof data];
          if (fieldValue === "") {
            refinementContext.addIssue({
              code: z.ZodIssueCode.custom,
              message: "*", // Using label from the field object
              path: [fieldObj.name], // Using field name from the field object
            });
          } else if (
            typeof fieldValue === "string" &&
            !regExp.test(fieldValue)
          ) {
            refinementContext.addIssue({
              code: z.ZodIssueCode.custom,
              message: "*", // Using label from the field object
              path: [fieldObj.name], // Using fie Using field name from the field object
            });
          }
        }
      }
    }

    function checkRegexp(
      field: string,
      need: string,
      control: string,
      regexp: RegExp
    ) {
      const value = data[need as keyof typeof data];
      if (typeof value === "string") {
        const fieldValue = data[field as keyof typeof data];

        if (!regexp.test(value) && !data[control as keyof typeof data]) {
          if (data[field as keyof typeof data] === "") {
            refinementContext.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Ссылка в магазин приложений или на страницу сайта*",
              path: [field],
            });
          } else if (
            typeof fieldValue === "string" &&
            !urlRegex.test(fieldValue)
          ) {
            refinementContext.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Ссылка в магазин приложений* - Неверный формат URL",
              path: [field],
            });
          }
        }
      }
    }

    checkFields(
      [
        labels.utm.tp_utm_source,
        labels.utm.tp_utm_medium,
        labels.utm.tp_utm_campaign,
      ],
      "need_utm",
      utmParamsRegex
    );
    checkFields(
      [
        labels.params.params_and,
        labels.params.params_ios,
        labels.params.params_url,
        labels.params.params_web,
      ],
      "custom_params",
      utmParamsRegex
    );

    checkRegexp("store_link_and", "android_dp", "need_web_and", andRegex);
    checkRegexp("store_link_ios", "ios_dp", "need_web_ios", iosRegex);
  });

export const SmartlinkFormSchema = (s3Keys: string[], isFromTable: boolean, disabled: boolean ) => {
  let sl_name;
  if (isFromTable) {
    sl_name = z.string().optional();
  } else {
    sl_name = z
      .string()
      .refine((value) => /^[a-z0-9-_]+$/.test(value), {
        message: "Разрешенные символы a-z, 0-9, «-», «_»",
      })
      .refine((value) => value.length >= 1, {
        message: "Необходимо указать",
      })
      .refine((value) => !s3Keys.includes(value), {
        message: "Занято",
      });
  }

  const schema = disabled ?  DisabledSmartLinkSchema.and(z.object({ sl_name })) : SmartLinkSchema.and(z.object({ sl_name })) 

  return schema;
};


export type SmartlinkFormValues = z.infer<typeof SmartLinkSchema>;

export const defaultValues: Partial<SmartlinkFormValues> = {
  sl_name: "",
  need_utm: "",
  tp_utm_source: "",
  tp_utm_medium: "",
  tp_utm_campaign: "",
  tp_utm_content: "",
  tp_utm_tern: "",

  android_dp: "",
  need_web_and: false,
  custom_web_link_and: false,
  web_link_and: "",
  store_link_and: "",
  android_app: "",

  ios_dp: "",
  multi_app_ios: false,
  need_web_ios: false,
  custom_web_link_ios: false,
  web_link_ios: "",
  store_link_ios: "",
  ios_apps_dp: [{ value: "" }],

  web_link_desk:
    "https://www.sberbank.com/ru/person/dist_services/sberbank-online-android",
  custom_params: false,
  params_url: "",
  params_web: "",
  params_ios: "",
  params_and: "",
  pfa: true,
  pfa_name: "external_source=",
  comments: "",

  og_image: "",
  og_image_file: null,
  meta_title: "",
  meta_description: "",

};
