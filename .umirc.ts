import {defineConfig} from "umi";

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  routes: [
    {
      path: "/",
      component: "index",
      routes: [
        {path: '/', redirect: '/three'},
        {
          path: "/three",
          component: "./three"
        }
      ]
    }
  ],
  npmClient: 'yarn',
});
