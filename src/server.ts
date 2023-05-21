import 'dotenv/config'
import { IndexRoute } from "@modules/index";
import App from "./app";
import { validateEnv } from '@core/utils';
import UserRoute from '@modules/users/user.route';
import AuthRoute from '@modules/auth/auth.route';
import { PlanRoute } from '@modules/plan';
import { ListRoute } from '@modules/listTask';
import { TaskRoute } from '@modules/task';
import { PostRoute } from '@modules/post';
import RateRoute from '@modules/rate/rate.route';
import { ProfileRoute } from '@modules/profile';


validateEnv();

const routes = [
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute(),
    new PlanRoute(),
    new ListRoute(),
    new TaskRoute(),
    new PostRoute(),
    new RateRoute(),
    new ProfileRoute()]
    
const app = new App(routes);


app.listen();

