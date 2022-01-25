export default interface IBEL_SingleAnswerOptions{
    correct:string,
    wrong:string[],
    quid:number,
    UpdateScore:(ans:string) => void,
    checking:boolean
}