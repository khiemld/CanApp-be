import CreateCommentDto from "./dto/createComment.dto";
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

    public updatePost = async(req: Request, res: Response, next: NextFunction)=>{
        try{
            const model : CreatePostDto = req.body;
            const userId = req.params.user_id;
            const postId = req.params.post_id;

            let post = await this.postService.updatePost(userId, postId, model);

            res.status(201).json({
                error: false,
                message: 'Update Post successfully',
                post: post
            });
        }
        catch(error){
            next(error);
        }
    }

    public addComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const postId = req.params.post_id;
          const userId = req.params.user_id;
          const model : CreateCommentDto = req.body;
    
          const result = await this.postService.addComment(userId, postId, model);
          res.status(200).json({
            error: false,
            message: 'Comment Successfully',
            comment: result
          });
        } catch (error) {
          next(error);
        }
    };

    public likePost = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const postId = req.params.post_id;
            const userId = req.params.user_id;
            let likes = await this.postService.likePost(userId, postId);
            res.status(201).json({
              error: false,
              message: 'You like post',
              likes: likes
            });
        }
        catch(error){
          next(error);
        }
    }

    public unlikePost = async (req: Request, res: Response, next: NextFunction)=>{
      try{
        const postId = req.params.post_id;
        const userId = req.params.user_id;
        let likes = await this.postService.unlikePost(userId, postId);
        res.status(201).json({
          error: false,
          message: 'You unlike post',
          likes: likes
        });
      }
      catch(error){
        next(error);
      }
    }

    public planPost = async (req: Request, res: Response, next: NextFunction) => {
      try{
          const planId = req.params.plan_id;
          let posts = await this.postService.getPostPlan(planId);
          res.status(201).json(posts);
      } 
      catch(error){
          next(error);
      }
    }


    
}