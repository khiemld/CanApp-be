import CreatePostDto from "./dto/createPost.dto";
import { IPost } from "./post.interface";
import PostService from "./post.service";
import { NextFunction, Request, Response } from "express";


export default class PostController{
    private postService = new PostService();

    public createPost = async(req: Request, res: Response, next: NextFunction)=>{
        try{
            const model : CreatePostDto = req.body;
            const userId = req.params.user_id;
            const planId = req.params.plan_id;

            let post = await this.postService.createPost(userId, planId, model);

            res.status(201).json({
                error: false,
                message: 'Create Post successfully',
                post: post
            });
        }
        catch(error){
            next(error);
        }
    }

    public getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const posts: IPost[] = await this.postService.getAllPosts();
          res.status(200).json(posts);
        } catch (error) {
          next(error);
        }
    };
    
      public getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const posyId = req.params.post_id;
          const post: IPost = await this.postService.getPostById(posyId);
          res.status(200).json(post);
        } catch (error) {
          next(error);
        }
    };
}