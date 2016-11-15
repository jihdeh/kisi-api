import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "../base/login-routes";
import validator from "../../util/validator";


const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.post("/", validator, queryRoutes.loginUser);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
