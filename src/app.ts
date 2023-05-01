import { Route } from "@core/interface";
import express from "express";
import mongoose from "mongoose";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { Logger } from "@core/utils";
import { errorMiddleware } from "@core/middleware";



class App{
    public app: express.Application;
    public port: string | number;
    private production: boolean;

    constructor(routes : Route[]){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;

        this.initializeRoutes(routes);
        this.connectToDatabase();
        this.initializeMiddleware();
    }

    private initializeRoutes(routes : Route[]){
        routes.forEach((route) => {
            this.app.use('/', route.router);
        })
    }

    private initializeMiddleware(){
        if(this.production){
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors({origin: 'your.domain.com', credentials: true}));
        }else{
            this.app.use(morgan('dev'));
            this.app.use(cors({origin: true, credentials: true}));
        }

        this.app.use(errorMiddleware)
    }

    private connectToDatabase(){
            const connectString = process.env.MONGODB_URI;
            if(!connectString){
                Logger.error('Connection String is invalid');
                return;
            }
            mongoose
            .connect(connectString)
            .catch((reason) => {
                Logger.error(reason)
            });
            Logger.info('Database connected....')
    }

    public listen(){
        this.app.listen(this.port, ()=>{
            Logger.info(`Server is listening on port ${this.port}`);
        });
    }
}

export default App;