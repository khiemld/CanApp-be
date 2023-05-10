import 'dotenv/config'
import { IndexRoute } from "@modules/index";
import App from "./app";
import { validateEnv } from '@core/utils';
import UserRoute from '@modules/users/user.route';
import AuthRoute from '@modules/auth/auth.route';
import { PlanRoute } from '@modules/plan';
import { ListRoute } from '@modules/listTask';


validateEnv();

const routes = [
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute(),
    new PlanRoute(),
    new ListRoute()]
    
const app = new App(routes);


app.listen();

