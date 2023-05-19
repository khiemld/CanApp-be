import { UserSchema } from "@modules/users";
import CreatePostDto from "./dto/createPost.dto";
import { IComment, ILike, IPost } from "./post.interface";
import { HttpException } from "@core/exceptions";
import { PostSchema } from ".";
import { PlanSchema } from "@modules/plan";
import { getDateNow, isEmptyObject } from "@core/utils";
import CreateCommentDto from "./dto/createComment.dto";


export default class PostService{

    public async createPost(userId : string, planId: string, model: CreatePostDto) : Promise<IPost>{
        const user = await UserSchema.findById(userId).exec();
        const plan = await PlanSchema.findById(planId).exec();

        if(!user){
            throw new HttpException(400, 'Invalid id user');
        }
        
        if(!plan){
            throw new HttpException(400, 'Invalid id plan');
        }

        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const currentDate = new Date();
        const newPost = new PostSchema({
            title: model.title,
            text: model.text,
            name: user.name,
            avatar: user.image,
            user: userId,
            plan: planId,
            date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
          });

          const post = await newPost.save();
          return post;
    }

    public async getAllPosts(): Promise<IPost[]> {
        const posts = await PostSchema.find().exec();
        return posts;
    }

    public async getPostById(postId: string): Promise<IPost> {
        const post = await PostSchema.findById(postId).exec();
        if (!post) throw new HttpException(404, 'Post is not found');
        return post;
    }

    public async updatePost(userId: string, postId: string, postDto: CreatePostDto): Promise<IPost> {
        
        const user = await UserSchema.findById(userId).exec();

        if(!user){
            throw new HttpException(400, 'Invalid id user');
        }
        const currentDate = new Date();
        const updatePostById = await PostSchema.findByIdAndUpdate(
          postId,
          {
            ...postDto,
            date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
          },
          { new: true }
        ).exec();

        if (!updatePostById) throw new HttpException(400, 'Post is not found');
    
        return updatePostById;
    }

    public async addComment(userId : string, post_id: string, comment: CreateCommentDto): Promise<IComment[]> {
        const post = await PostSchema.findById(post_id).exec();
        if (!post) throw new HttpException(400, 'Post not found');
    
        const user = await UserSchema.findById(userId)
          .select('-password')
          .exec();
    
        if (!user) throw new HttpException(400, 'User not found');
        
        const currentDate = new Date();
        const newComment = {
          text: comment.text,
          name: user.name,
          avatar: user.image,
          user: userId,
          date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
        };
    
        post.comments.unshift(newComment as IComment);
        await post.save();
        return post.comments;
    }

    public async likePost(userId: string, postId: string): Promise<ILike[]> {
      const post = await PostSchema.findById(postId).exec();
      if (!post) throw new HttpException(400, 'Post not found');
  
      if (post.likes.some((like: ILike) => like.user.toString() === userId)) {
        throw new HttpException(400, 'Post already liked');
      }
  
      post.likes.unshift({ user: userId });
  
      await post.save();
      return post.likes;
    }

    public async unlikePost(userId: string, postId: string): Promise<ILike[]> {
      const post = await PostSchema.findById(postId).exec();
      if (!post) throw new HttpException(400, 'Post not found');
  
      if (!post.likes.some((like: ILike) => like.user.toString() === userId)) {
        throw new HttpException(400, 'Post has not yet been liked');
      }
  
      post.likes = post.likes.filter(({ user }) => user.toString() !== userId);
  
      await post.save();
      return post.likes;
    }



}