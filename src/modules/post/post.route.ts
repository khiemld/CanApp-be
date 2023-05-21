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

        //Update post 
        this.router.put(this.path + '/update/:user_id/:post_id', this.postController.updatePost);

       
        

        //Like post
        this.router.post(this.path + '/like/:user_id/:post_id', this.postController.likePost);

        //Unlike post
        this.router.delete(this.path + '/like/:user_id/:post_id', this.postController.unlikePost);

        //Get plan's post
        this.router.get(this.path + '/plan/:plan_id', this.postController.planPost);
    }
}
