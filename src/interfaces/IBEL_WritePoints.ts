export default interface IBEL_WritePoints{
    id:number,
    qNum:number,
    question:string,
    correct:string[],
    maxPoints:number,
    UpdateScore:(added:number) => void,
    checking: boolean
}