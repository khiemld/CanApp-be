import { Route } from "@core/interface";
import { Router } from "express";
import validationMiddleware from "@core/middleware/validation.middleware";
import CreatePostDto from "./dto/createPost.dto";
import PostController from "./post.controller";


export default class PostRoute implements Route{
    public path = '/api/v1/post';
    public router= Router();
    //private urlEncodeParser = bodyParser.urlencoded({extended: false});

    public postController = new PostController();

    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
        //Add Plan
        this.router.post(this.path + '/create/:user_id/:plan_id',
            this.postController.createPost);

        //Get all
        this.router.get(this.path, this.postController.getAllPosts);

        //Get post by id
        this.router.get(this.path + '/:post_id', this.postController.getAllPosts);
    }
}
