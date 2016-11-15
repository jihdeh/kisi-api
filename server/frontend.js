"use strict";

import staticCache from "koa-static-cache";
import serve from "koa-static";
import path from "path";
import koa from "koa";
import koaRouter from "koa-router";
import renderApp from "./render-app";
import jwtUtils from "./jwt-utils";

export default function Frontend() {
  const server = koa();
  const router = koaRouter();

  router.get("/", function*(next) {
    this.body = renderApp(this, "homepage", {});
  });

  router.get("/register", function*() {
    this.body = renderApp(this, "Register", {});
  });

  router.get("/login", function*() {
    this.body = renderApp(this, "Login", {});
  });

  router.get("/success", function*() {
    this.body = renderApp(this, "Successful Registration", {});
  });

  return server
    // .use(staticCache({ maxage: 60 * 100000 })) // Cache all pages for 1 hour
    .use(serve(path.join(__dirname, "../static")))
    .use(serve(path.join(__dirname, "../dist")))
    .use(router.routes())
}
