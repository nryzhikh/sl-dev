export const iosRegex = /^sberbankonline:\/\/|^sbolonline:\/\/|^btripsexpenses:\/\/sbolonline\/|^http/;
export const andRegex = /^sberbankonline:\/\/|^android-app:\/\/ru.sberbankmobile|^http/;
export const filesHost = 'https://dev-smartlink-storage.obs.ru-moscow-1.hc.sbercloud.ru/'

export const templateDefaults = {
    sl_name: '',
    android_dp: '',
    ios_dp: '',
    web_link_desk: '',
    need_web_and: false,
    need_web_ios: false,
    web_link_and: '',
    web_link_ios: '',
    store_link_and: '',
    store_link_ios: '',
    android_app: [''],
    ios_apps_dp: ['', ''],
    tp_utm_source: '',
    tp_utm_medium: '',
    tp_utm_campaign: '',
    tp_utm_content: '',
    tp_utm_tern: '',
    custom_params: false,
    params_URL: '',
    params_WEB: '',
    params_AND: '',
    params_IOS: '',
    pfa: true,
    pfa_name: 'external_source=',
  } as const;


//   aws s3 sync . s3://sl-app --endpoint-url https://s3-gtm.s3pd12.sbercloud.ru --acl public-read --profile sbercloud-s3

// function checkRegexp(
//   fields: Labels,
//   need: string,
//   control: string,
//   regexp: RegExp
// ) {
//   if (data[need as keyof typeof data]) {
//     for (const [key, fieldDetail] of Object.entries(fields)) {
//       const value = data[key as keyof typeof data];
//       if (typeof value === "string") {
//         if (!regexp.test(value) && !data[control as keyof typeof data]) {
//           if (data[key as keyof typeof data] === "") {
//             if ('label' in fieldDetail) {
//               refinementContext.addIssue({
//                 code: z.ZodIssueCode.custom,
//                 message: fieldDetail.label +"*",
//                 path: [key],
//               });
//             }
//           }
//         }
//       }
//     }
//   }
// }


// type Labels = {
//   [K in keyof typeof labels]?: typeof labels[K];
// };

// function checkFields(fields: Labels, need: string) {
//   if (data[need as keyof typeof data]) {
//     for (const [key, value] of Object.entries(fields)) {
//       if (data[key as keyof typeof data] === "")  {
//         if ('label' in value) {
//           refinementContext.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: value.label +"*",
//             path: [key],
//           });
//         }
//       }
//     }
//   }
// }