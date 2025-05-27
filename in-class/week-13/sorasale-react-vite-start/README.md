# Sorasale Sales Dashboard

This dashboard is build with React, Vite, and Tailwind CSS. Many thanks to the 
author [Mr Adinuba](https://www.youtube.com/watch?v=ujp0mGuOBMs&ab_channel=MrAdinuba)

## Initialization

In this working directory `sorasale-react-vite-start`, set the Node.js version
to 22.14.0
```
nvm use 22.14.0
```

If you do not have that version, please install it with
```
nvm install 22.14.0 
```

Check the node version
```
node --version
```

Install the required modules from `package.json`
```
npm install
```
If there are some vulnerabilities, use `npm audit fix`. 

Start a local server
```
npm run dev
```

**[Notes]**: When you are opening a new terminal in VSCode, the node version
will move to the default version. It is better to check if the node version
is still the same (v22.14.0).

Install Tailwind CSS with Vite. This Tailwind CSS has a version 3.4.17. 
The following commands are from [tailwindcss v.3.4.17 Doc](https://v3.tailwindcss.com/docs/guides/vite)
```
npm install -D tailwindcss@3 postcss autoprefixer
```

If there are some vulnerabilities, run
```
npm audit fix
```

Now initialize `tailwindcss`
```
npx tailwindcss init -p
```

Set the property name `content` in `tailwind.config.js` to a new value
```js
{
  // some lines are omitted ...
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
  // some lines are omitted ...
}
```


In `./src/index.css`, write three lines
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Re-run again local server by stopping the current local server (Ctr+C) and 
start again with `npm run dev`

Install also the `Tailwind CSS IntelliSense` VSCode extension



From here, continue to read `/notes/13-case-a-sales-dashboard.md`
