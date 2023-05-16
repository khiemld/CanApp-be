import { IPlan } from "@modules/plan";

export default interface ITask{
    _id: string;
    title: string;
    description: string;
    plan: string;
    column: string;
    begin_time: string;
    end_time:string;
    members: IMember;
    index: number;
    active: boolean;
}

export interface ICategory{
    name: string;
    index: number;
}

export interface IMember{
    userId: String;
}