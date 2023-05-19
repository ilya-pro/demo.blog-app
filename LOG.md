# 0. Prepare
Для работы используем следующие версии:

* Node.js - 17.4.0
* npm  - 8.5.1 
_(прим. при установке ноды 17.4.0 ставится NPM 8.3.1, но, вроде, не критично)_

For switch node between versions on Windows use **nvs**. If it doesn't installed execute (needs chocolatey installed) next:

`choco install nvs`
after install use command `nvs` and arrow keys for select using version or add new

Note: NVS Github https://github.com/jasongin/nvs

For MacOS or Linux use **nvm**

## Check node version
`node -v`

# 1.1 Create project, config Webpack
Create project with default options _(flag -y)_
`npm init -y`

Create _src_ folder with index.ts and test.ts

Install Webpack

`npm i -D webpack@5.69.1 webpack-cli@4.9.2`
_Notes_:
* `i` is short for `install`;
* `@version` after package name can be committed if you don't need the special version
* `-D` for instal in devDependencies (shortname for `--save-dev`)

Note:
* https://docs.npmjs.com/cli/v8/commands/npm-install
* https://webpack.js.org/

## Webpack config
add `webpack.config.js` in the root. 
Configure entry, output,

`npm i -D html-webpack-plugin@5.5.0`
add modules to config:
```
require('html-webpack-plugin');
require('webpack');
```
Add plugins HtmlWebpackPlugin and ProgressPlugin.

Note: https://webpack.js.org/guides/getting-started/#using-a-configuration

### TypeScript
* `npm install -D typescript@4.5.5 ts-loader@9.2.6`
* rename index.ts and test.ts to index.ts and test.ts
* add `tsconfig.json` in root with default content (from docs 'compilerOptions')
* In `webpack.config.js` add module with rules for TypeScript (tsx and ts-loader) and add resolve with ['.tsx', '.ts', '.js']

### Webpack configuration on TypeScript
* `npm install --save-dev typescript@4.5.5 ts-node@10.5.0 @types/node@17.0.21 @types/webpack@5.28.0`
* rename `webpack.config.js` to `webpack.config.ts`
* in `webpack.config.ts` replace `require` module to `import`
* `tsconfig.json` add flag `esModuleInterop` and `allowSyntheticDefaultImports`
* `tsconfig.json` change "module" to `ESNext`
* `webpack.config.ts` move from `module.exports` to `const config`
* `tsconfig.json` add `ts-node` options for ts-node

# 1.2 Webpack config decomposition
* add root folder `config` and subfolders `build`, `eslint`, `jest` 
* add `config/build/buildPlugins.ts` and move `plugins` array from `webpack.config.ts`
* add `config/build/buildLoaders.ts` and move `module.rules` array from `webpack.config.ts`
* add `config/build/buildResolvers.ts` and move `resolve` object from `webpack.config.ts`
* add folder `config/build/types`
* add `config/build/types/config.ts`
* add `config/build/buildWebpackConfig.ts` and move to it `config` from `webpack.config.ts`
* `tsconfig.json` in `compilerOptions` add `"baseUrl": ".",` 

# 1.3 Webpack dev-server. env-variables
* `npm install --save-dev webpack-dev-server@4.7.4 @types/webpack-dev-server@4.7.2`
* add `config/build/buildDevServer.ts`
* `tsconfig.json` commented `"baseUrl": ".",`
* `Webstorm/Settings../Code Style/Typescript` disable `use paths relative to tsconfig.json` for relative imports
* `config/build/types/config.ts` add `port` in `BuildOptions`
* `config/build/buildWebpackConfig.ts` add `devtool: 'inline-source-map',` and `devServer: buildDevServer(options),`
* `npm install -D webpack-cli@4.10.0` for fix error then `npm stat` run
* `package.json` add scripts `build:prod` and `build:env` with env paramenters (--env)
* `config/build/types/config.ts` add `BuildEnv`
* Test `npm run build:prod` and `npm run build:dev`
* `config/build/buildWebpackConfig.ts` update `devtool: isDev ? 'inline-source-map' : undefined,` and `devServer: isDev ? buildDevServer(options): undefined,`

# 1.4 Add React & CSS in webpack
* `npm install react@17.0.2 react-dom@17.0.2`
* `npm install -D @types/react@17.0.39 @types/react-dom@17.0.11`
* remove `src/test.ts`
* rename `src/index.ts` to `src/index.tsx`
* `webpack.config.ts` change entry point path `index.ts` to `index.tsx`
* `public\index.html` change `class="root"` to `id="root"`
* `tsconfig.json` change `"jsx": "react",` to `"jsx": "react-jsx",`
* add folder `src/components`
* add `src/components/Counter.tsx`
* add `src/components/Counter.scss`
* `config/build/buildLoaders.ts` add scssLoader (see: [sass-loader](https://webpack.js.org/loaders/sass-loader/))
* `npm install -D sass@1.49.9 sass-loader@12.6.0 style-loader@3.3.1 css-loader@6.6.0`

# 1.5 Setting CSS-modules
* `npm install --save-dev mini-css-extract-plugin@2.5.3`
* Rename `Counter.scss` to `Counter.module.scss`
* `config/build/buildPlugins.ts` add `new MiniCssExtractPlugin...` with options `filename` and `chunkFilename`
* `config/build/buildLoaders.ts` change `style-loader` to `MiniCssExtractPlugin.loader`
* `config/build/buildLoaders.ts` add argument `options` in `buildLoaders`
* `config/build/buildLoaders.ts` change `MiniCssExtractPlugin.loader` to `options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,`
* `src/components/Counter.tsx` change `import './Counter.module.scss'` `to import classes from './Counter.module.scss'`
* add `src/Global.d.ts`for `*.scss` files
* add `src/App.tsx`
* add `src/index.scss`
* `config/build/buildLoaders.ts` add `auto` for rule when use loader and `localIdentName` for filename template

# 1.6 Routing. Code splitting. Lazy Suspence
* `npm install react-router-dom@6.2.1`
* `npm install -D @types/react-router-dom@5.3.3`
* `index.tsx` add `<BrowserRouter/>` around `App`
* `src/App.tsx` add `Routes` with included `Route`
* `config/build/buildDevServer.ts` for refresh page working (F5) after reload page on some, like /about add
 ` historyApiFallback: true,` to devServer configuration

# 1.7 Themes
* make directory `src/styles` and `src/styles/variables` and `src/styles/themes`
* move `index.scss` to `src/styles`
* add `src/styles/reset.scss`
* add `src/styles/themes/dark.scss`
* add `src/styles/themes/normal.scss`
* add `src/styles/variables/global.scss`
* add `src/theme`
* add `src/theme/ThemeContext.ts`
* add `src/theme/ThemeProvider.tsx`
* `src/index.tsx` add `ThemeProvider` around `App` 
* add `src/theme/useTheme`

# 1.8 classNames helper & Git Init
* add `src/helpers/classNames/classNames.ts`
* add `.gitignore`
* create new repo `demo.blog-app`
* `git init`
* `git remote add origin git@github.com:ilya-pro/demo.blog-app.git`

# 1.9 FSD Introduce

# 1.10 Architecture
* add `src/shared`, `src/entities`, `src/features`, `src/widgets`,  `src/app`
* move `App.tsx` to `src/app`
* move `styles` to `src/app`
* add `src/app/types`
* move `Global.d.ts` to `src/app/types`
* del `components`
* add `src/app/providers`
* add `src/app/providers/ThemeProvider`
* add `src/app/providers/ThemeProvider/ui`
* move `ThemeProvider.tsx` to `src/app/providers/ThemeProvider/ui`
* add `src/app/providers/ThemeProvider/index.tsx` for public export
* add `src/shared/config`
* add `src/app/providers/ThemeProvider/lib`
* move `theme/useTheme.ts` to `src/app/providers/ThemeProvider/lib`
* del `src/theme`
* `tsconfig.json` uncomment `"baseUrl": ".",` and
  add 
  ```
  "paths": {
     "*": ["./src/*"]
  }
  ```
  for absolute imports
* fix imports to absolute were needed
* move `ThemeContext.ts` to `src/app/providers/ThemeProvider/lib`
* `config/build/buildResolvers.ts` add 
  ```
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
  ```
  documentation: [webpack resolvemodules](https://webpack.js.org/configuration/resolve/#resolvemodules)
* reorganize `pages` (add `ui` folders and `index.tsx` files)
* move `src/helpers/classNames/classNames.ts` to `shared/lib`
* del `src/helpers`

# 2.11 AppRouter + router config
* add `src/app/providers/router/ui`
* add `src/app/providers/router/ui/AppRouter.tsx` + use it in the `App`
* add `src/shared/config/routeConfig`
* add `src/shared/config/routeConfig/routeConfig.tsx`
* use `routeConfig` in `AppRouter`

# 2.12 Navbar + First UI Kit component
* add `src/widgets/Navbar` + ui + styles + index.ts
* add `src/shared/ui/AppLink/AppLink.tsx` + styles

# 2.13 SVG loader. File loader Button UI kit
* add `src/shared/ui/ThemeSwitcher`
* add `src/shared/assets/icons` and put svg's and png icons
* `npm install @svgr/webpack@6.2.1 --save-dev`
* `config/build/buildLoaders.ts` add svgLoader
* `src/app/types/Global.d.ts` add `declare module "*.svg" { ... }`
* `npm install file-loader@6.2.0 -D`
* `config/build/buildLoaders.ts` add fileLoader
* `src/app/types/Global.d.ts` add `declare module "*.png";`
* import svg to ThemeSwitcher
* change ThemeProvider export for use it from public api
* add `src/shared/ui/Button`

# 2.14 Sidebar. Layout
* add `src/widgets/Sidebar/ui/Sidebar` etc
* `src/app/styles/index.scss` add `content-page` style
* move ThemeSwitcher to Sidebar

# 2.15 i18n. Define plugin
Note:
https://react.i18next.com/
* `npm install i18next@21.6.11 react-i18next@11.15.5 --save`
* `npm install i18next-http-backend@1.3.2 i18next-browser-languagedetector@6.1.3 --save`
* add `src/shared/config/i18n/i18n.ts` and put example from https://react.i18next.com/latest/using-with-hooks#configure-i18next
* `config/build/buildPlugins.ts` add DefinePlugin with `__IS_DEV__` flag
* `src/shared/config/i18n/i18n.ts` set `degug: __IS_DEV__`
* `src/app/types/Global.d.ts` add `declare const __IS_DEV__: boolean` for TS
* add `public/locales/en/translation.json` and `public/locales/ru/translation.json`
* `src/index.tsx` add `import "shared/config/i18n/i18n";`
* add l18n for `AboutPage` and `MainPage`
* add `public/locales/en/about.json` and `public/locales/ru/about.json` for AboutPage
* add `public/locales/ru/main.json` and `public/locales/en/main.json`
* add `src/shared/ui/LangSwitcher` component
* WebStorm. instal plugin `I18n Support` (Settings/Plugins/Marketplace - use search)

# 2.16 Webpack hot module replacement
Note: webpack 5 work well for change SCSS without add `hot` option and `HotModuleReplacementPlugin`
https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin
* `config/build/buildPlugins.ts` add `new webpack.HotModuleReplacementPlugin()`
* `config/build/buildDevServer.ts` add `hot: true`
Additional, for HMR for React Components
* `npm install -D @pmmmwh/react-refresh-webpack-plugin@0.5.5 react-refresh@0.12.0`

# 2.17 Babel. Extract plugin (skipped)

# 2.18 EsLint + fix bugs
* `npm install --save-dev eslint@8.10.0`
* `npm init @eslint/config` -> Y -> 
select ` To check syntax, find problems, and enforce code style` ->
select `JavaScript modules (import/export)`
select `React`
TypeScript?: `Yes`
run in: `Browser`
`Use a popular style guide`
!!! `Standard` Instead of `Airbnb`
format: `JavaScript`
install eslint plugins: `yes`
`npm`
---
Additional
* Manually change eslint-* modules version
```
  "eslint": "^8.10.0",
  "eslint-config-airbnb": "^19.0.4",
  "eslint-plugin-i18next": "^5.1.2",
  "eslint-plugin-import": "^2.25.4",
  "eslint-plugin-jsx-a11y": "^6.5.1",
  "eslint-plugin-react": "^7.29.2",
  "eslint-plugin-react-hooks": "^4.3.0",
```
return version of Typescript
`"typescript": "^4.5.5",`
* npm install for update npm-modules
* `.eslintrc.js` change `standard-with-typescript` to `airbnb`
* `.eslintrc.js` add  `parser: '@typescript-eslint/parser',` (after `extends: [...]`)
---
* WebStorm. Search `eslint` -> Select `Automatic ESLint configuration`
-> check in `Run eslint --fix on save` -> OK
* add `rules` in `.eslintrc.js`

# 2.19 Stylelint. Plugin for i18next
Note:
https://stylelint.io/user-guide/get-started/
https://github.com/edvardchen/eslint-plugin-i18next
* `npm install --save-dev stylelint@14.5.3 stylelint-config-standard-scss@3.0.0`
* add `.stylelintrc.json` with `"extends": "stylelint-config-standard-scss"`
* WebStorm. Search `stylelint` -> enable + `{**/*,*}.{css}` to `{**/*,*}.{scss}`
* `npm install eslint-plugin-i18next@5.1.2 -D`
* `.eslintrc.js` in plugins add `i18next`
* `.eslintrc.js` in extends add `plugin:i18next/recommended`
* `.eslintrc.js` in rules add `'i18next/no-literal-string': ['error', { markupOnly: true }],`

-- TODO --
