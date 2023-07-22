# Fullstack-Template1-React :man_technologist:
Modern React full stack template using latest technologies :zap:

# Install Node 18+, clone, build, and run!
Node Version Manager For Windows: https://github.com/coreybutler/nvm-windows/releases
```bash
# build
$ npm install

# run dev mode
$ npm run dev

# production build
$ npm run build

# run production build
$ npm run preview
```
# Auth0 Setup :lock:
Authentication is not enabled out of the box but configuration is simple.
Follow the steps below to enable OAuth using the auth0-react package
---
*** Skip steps 1-3 if you already configured Auth0 using the Fullstack-Template1-React project ***
1. Sign up for FREE Auth0 account
2. Create Application
3. Note the information provided: 
   1. Name
   2. Domain
   3. Client ID
4. Paste the corresponding values into /src/constants/auth0/auth0.ts. Use localhost:3000/home for redirectUri
5. Thats it! Run your application and you should be redirected to the Auth0 login screen. If configured correctly, you will be able to sign in and you will then be redirected to the applications /home page
