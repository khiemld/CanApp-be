import { IPlan } from "@modules/plan";

export default interface ITask{
    _id: string;
    title: string;
    description: string;
    plan: IPlan;
    begin_Time: string;
    end_time:string;
    members: IMember;
    index: number;
}

export interface ICategory{
    name: string;
    index: number;
}

export interface IMember{
    user: String;
}