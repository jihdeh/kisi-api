import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "../base/register-routes";
import validator from "../../util/validator";


const api = koa();
const router = koaRouter();

api.use(bodyParser());
router.post("/", validator, queryRoutes.registerUser);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
