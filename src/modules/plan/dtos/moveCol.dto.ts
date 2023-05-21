import { IsNotEmpty } from "class-validator";


export default class MoveColDto{
    @IsNotEmpty()
    public indexMove: number;

    @IsNotEmpty()
    public idCol : string;

    @IsNotEmpty()
    public idPlan : string;
   
    constructor(indexMove: number, idCol: string, idPlan: string){
       this.indexMove = indexMove,
       this.idCol = idCol,
       this.idPlan = idPlan
    }
}