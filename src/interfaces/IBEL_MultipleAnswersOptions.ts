export default interface IBEL_MultipleAnswersOptions{
    quid:number,
    options:string[],
    UpdateScore:(ans:string) => void,
    correct: string[],
    checking:boolean
}