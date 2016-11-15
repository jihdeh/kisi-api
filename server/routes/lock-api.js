import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "../base/lock-routes";


const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.get("/", queryRoutes.getLocks);
router.post("/create", queryRoutes.createLocks);
router.post("/unlock/:place_id", queryRoutes.unlockLock);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
