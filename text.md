# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



<input class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" name="og_image_file" placeholder="Выберите файл" accept=".jpg, .jpeg, .png, .gif" id=":r1o9:-form-item" aria-describedby=":r1o9:-form-item-description" aria-invalid="false" value=""/>


    "error": "\nInvalid `prisma.sl_data.update()` invocation in\n/home/nikita/repos/smartlink-server/src/modules/smartlink/smartlink.service.ts:77:51\n\n  74     sl_name: string,\n  75     user : { user_id: string; name: string }\n  76 ) {\n→ 77     const updatedSmartlink = await prisma.sl_data.update({\n           where: {\n             sl_name: \"testste\"\n           },\n           data: {\n             sl_name: \"testste\",\n             meta_title: \"dasdasdasda\",\n             meta_description: \"asdasdasda\",\n             need_utm: \"email\",\n             tp_utm_source: \"email\",\n             tp_utm_medium: \"email\",\n             tp_utm_campaign: \"sl_testste_20240205\",\n             tp_utm_content: null,\n             tp_utm_tern: null,\n             android_dp: \"https://www.sberbank.com/ru/TATATTATAT\",\n             need_web_and: false,\n             web_link_and: null,\n             store_link_and: null,\n             android_app: \"https://www.sberbank.com/ru/TATATTATAT\",\n             ios_dp: null,\n             multi_app_ios: true,\n             need_web_ios: false,\n             web_link_ios: null,\n             store_link_ios: null,\n             ios_apps_dp: [\n               {\n                 value: \"btripsexpenses://sbolonline/\"\n               },\n               {\n                 value: \"sbolonline://\"\n               },\n               {\n                 value: \"sberbankonline://w\"\n               }\n             ],\n             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n             web_link_desk: \"https://www.sberbank.com/ru/person/dist_services/sberbank-online-android\",\n             custom_params: false,\n             params_url: null,\n             params_web: null,\n             params_ios: null,\n             params_and: null,\n             pfa: true,\n             pfa_name: null,\n             comments: null,\n             og_image: \"https://dev-smartlink-storage.obs.ru-moscow-1.hc.sbercloud.ru/img/testste/tn2444_iphoneapplecom.png\",\n             updated_by: \"1465ee1b-9b90-4731-8711-27786ea7dfe9\",\n             version: {\n               increment: 1\n             }\n           }\n         })\n\nArgument `ios_apps_dp`: Invalid value provided. Expected String, NullableStringFieldUpdateOperationsInput or Null, provided (Object, Object, Object)."


    "error": "\nInvalid `prisma.sl_data.create()` invocation in\n/home/nikita/repos/smartlink-server/src/modules/smartlink/smartlink.service.ts:64:51\n\n  61 \n  62 \n  63 export async function createSmartlink(data: CreateSmartlinkInput, user: { user_id: string; name: string }) {\n→ 64     const createdSmartlink = await prisma.sl_data.create(\nUnique constraint failed on the fields: (`sl_name`)"


"message": "\nInvalid `prisma.sl_data_stats.findMany()` invocation in\n/home/nikita/repos/smartlink-server/src/modules/smartlink/smartlink.service.ts:175:33\n\n  172     },\n  173 } : {};\n  174 \n→ 175 return prisma.sl_data_stats.findMany({\n        skip: 0,\n        take: 100,\n        select: {\n          sl_id: true,\n          sl_name: true,\n          created_at: true,\n          updated_at: true,\n          version: true,\n          updated_by: true,\n          created_by: true,\n          android_dp: true,\n          android_app: true,\n          ios_dp: true,\n          ios_apps_dp: true,\n          sessions: true,\n          total_sessions: true\n        },\n        orderBy: {\n          created_at: \"desc\"\n        },\n        where: {\n          OR: [\n            {\n              sl_name: {\n                contains: \"asdas\"\n              }\n            },\n            {\n              android_dp: {\n                contains: \"asdas\"\n              }\n            },\n            {\n              android_app: {\n                contains: \"asdas\"\n              }\n            },\n            {\n              ios_dp: {\n                contains: \"asdas\"\n              }\n            },\n            {\n              ios_apps_dp: {\n                contains: \"asdas\"\n              }\n            }\n          ]\n        }\n      })\n\nUnknown argument `contains`. Available options are marked with ?."

aws s3 sync dist  s3://dev-smartlink


nikita@nikita-IdeaPad-5-Pro-16ARH7:~/repos/sl-dev$ aws s3 sync dist  s3://dev-smartlink