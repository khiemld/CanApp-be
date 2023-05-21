import { IsNotEmpty } from "class-validator";


export default class MoveTaskDto{
    @IsNotEmpty()
    public indexMove: number;

    @IsNotEmpty()
    public fromId : string;

    @IsNotEmpty()
    public toId : string;

    @IsNotEmpty()
    public idTask : string;
   
    constructor(indexMove: number, fromId: string, toId: string, idTask: string){
        this.indexMove = indexMove;
        this.fromId = fromId;
        this.toId = toId;
        this.idTask = idTask;
    }
}