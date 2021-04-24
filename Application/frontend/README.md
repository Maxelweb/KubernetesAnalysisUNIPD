# Frontend created with next.js and React

To start the development server run:

`npm run dev`

and open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You can learn more about next.js [here](https://nextjs.org/docs) and [here](https://reactjs.org/docs/getting-started.html) for React.

### Note (Mariano)

- Remember to add a `.env.local` file with `NEXT_PUBLIC_` prefix to show enviroment variables in `process.env.NEXT_PUBLIC_VARIABLE` (both in the file and in the process.env)
- No need to import or `require('dontenv')` stuff to do :D
- `.env.local` overrides `.env.*` --> https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser