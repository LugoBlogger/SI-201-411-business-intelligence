# React foundation with Node.js

## Node.js installation

**Windows**   
Download the recent NVM 

```
nvm install 22.14.0
```

```
node --version
```

**Linux/Mac**


## Module installation
Create a `package.json` with the content
```json
{
}
```


```
npm react react-dom react-scripts
```

After module installation, add the following line to `package.json`
```json
{
  "scripts": {
    "start": "react-scripts start",
  }
}
```

## Directory structure
```
02-react-review-with-node
  public
    index.html
  src
    App.js
    index.js
  package.json
```

<HomePage /> changes into <App />

To start the local web server with node.js 
```
npm run start
```

If it asks to set the default browser, please type "Y"

If it asks to set another port because port:3000 is in use, please type "Y"
