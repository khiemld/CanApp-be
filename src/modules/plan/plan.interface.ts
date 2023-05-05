import { IUser } from "@modules/users";

export default interface IPlan{
    _id: string;
    name: string;
    description: string; 
    manager: string;
    beginTime: string;
    endTime: string;
    members: IMember[];
    active: boolean;
}

export interface IMember{
    userId: string;
}

