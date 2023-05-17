export default interface IProfile{
    user: string;
    rates: IRateList[];
}


export interface IRateList{
    attitude: number;
    expertise: number;
    discipline: number;
    collaborate: number;
    performance: number;
}
