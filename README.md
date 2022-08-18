# Google Clone

npx create-next-app -e with-tailwindcss project-name
cd project-name
npm run dev

## Configure tailwind.config.js to use in Just-In Time Mode:

```
mode: "jit",
// These paths are just examples, customize them to match your project structure
purge: [
  "./public/**/*.html",
  "./pages/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
],
```

## Install React Icons:

npm install react-icons --save
