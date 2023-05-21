export interface IPost{
    user: string;
    title: string;
    text: string;
    name: string;
    avatar: string;
    likes: ILike[];
    comments: IComment[];
    plan: string;
    date: string;
    block: boolean;
    active: boolean;
}

export interface ILike{
    user: string;
}

export interface IComment{
    user: string;
    name: string;
    avatar: string;
    text: string;
    date: string;
}



