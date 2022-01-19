export default interface IBEL_SingleAnswer{
    id:number,
    qNum:number,
    question:string,
    wrong:string[],
    correct:string,
    UpdateScore:(added:number) => void
}