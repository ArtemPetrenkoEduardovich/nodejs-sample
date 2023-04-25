npm init



npm install typescript express mongoose mocha --save
log4js
consul


Создайте файл конфигурации TypeScript. Для этого введите следующую команду в терминале:

npx tsc --init

{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}


create scr index.ts



tsconfig.build.json




"scripts": {
    "start": "tsc && node dist/config.ts",
    "test": "tsc && mocha dist/**/*.test.js",
    "build": "tsc --project tsconfig.build.json"
  }




npm install eslint typescript --save-dev

npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev


npm i -D tsc-alias














