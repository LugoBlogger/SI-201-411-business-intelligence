# How to use `dashboard-start`

Copy this `dashboard-start` and all its files inside, and put into your
local machine

To download a specific folder only from GitHub, 
use https://download-directory.github.io/, and paste to it this folder

```
https://github.com/LugoBlogger/SI-201-411-business-intelligence/tree/master/in-class/week-12/dashboard-start
```

After you move the VSCode terminal into the working directory `dashboard-start`,
install the following modules
```
npm install react react-dom react-scripts d3
```
Ignore the vunerabilities due to `react-scripts`. We are not going to use
the code in the production, we will translate the final code into JavaScript
code and HTML. For better development, use Next.js. I will update for 
the next semester.

To check active port, use`ss` command in Linux.
```
ss -nlp | grep :3000
```

To kill process ID, use 
```
kill ProcessIdNum
```

If the process refuses to exit, the just use the `-9` flag, which is   
a `SIGTERM` and cannot be ignored
```
kill -9 ProcessIdNum
```