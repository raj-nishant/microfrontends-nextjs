# Micro-frontend's NextJS

In this repo i implemented a nextjs application using mutlitple micro-frontend architecture.

# How to run

1. Clone this repo
2. Navigate to each directory: cd body-mf, cd header-mf, cd login-mf
3. Run `npm run install` in each folder
4. Run `npm run dev` in each folder
5. Open `localhost:3000` in your browser to see app running
6. You can individually see each microfrontend at `localhost:3001`, `localhost:3002`, `localhost:3003`

# How to build

1. Run `npm run build` in each folder
2. Run `npm run start` in each folder
3. Open `localhost:3000` in your browser

# How to deploy

### Others

To deploy this application you need to run `npm run build` and then `npm run start` in root folder. After that you can deploy the `dist` folder to your server.
