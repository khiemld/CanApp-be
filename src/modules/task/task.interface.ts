export default interface ITask{
    _id: String;
    title: String;
    description: String;
    begin_Time: Date;
    end_time:Date;
    state: number;
    members: IMember;
}

export interface IState{
    status: String;
}

export interface IMember{
    user: String;
}