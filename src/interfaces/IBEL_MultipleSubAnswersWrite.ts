import IBEL_IMultipleSubAnswersWriteAnswers from "./IBEL_IMultipleSubAnswersWriteAnswers";

export default interface IBEL_IMultipleSubAnswersWrite{
    id:number,
    qNum:number,
    question:string,
    answers:IBEL_IMultipleSubAnswersWriteAnswers[],
    UpdateScore:(added:number) => void,
    checking: boolean
}