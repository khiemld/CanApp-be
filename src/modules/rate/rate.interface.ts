export default interface IRate{
    _id: string;
    member: string;
    judge: string; 
    attitude: number;
    expertise: number;
    discipline: number;
    collaborate: number;
    performance: number;
    comment: string;
    create_time: Date;
    active: boolean;
}
