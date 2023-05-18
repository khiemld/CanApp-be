import { UserSchema } from "@modules/users";
import CreatePostDto from "./dto/createPost.dto";
import { IPost } from "./post.interface";
import { HttpException } from "@core/exceptions";
import { PostSchema } from ".";
import { PlanSchema } from "@modules/plan";
import { getDateNow, isEmptyObject } from "@core/utils";


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


}