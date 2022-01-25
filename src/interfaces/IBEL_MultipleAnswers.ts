export default interface IBEL_MultipleAnswers{
    id:number,
    qNum:number,
    question:string,
    wrong:string[],
    correct:string[],
    UpdateScore:(added:number) => void,
    checking:boolean
}