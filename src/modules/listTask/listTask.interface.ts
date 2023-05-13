

export default interface IListTask{
    _id: string;
    name: string;
    plan: string;
    tasks: IItem[];
    index: number;
    active: boolean;
}

export interface IItem{
    taskId: string;
}
