
export default interface IPlan{
    _id: string;
    name: string;
    description: string; 
    manager: string;
    beginTime: string;
    endTime: string;
    members: IMember[];
    list: IList[];
    active: boolean;
}

export interface IMember{
    userId: string;
}

export interface IList{
    listId: string;
}
