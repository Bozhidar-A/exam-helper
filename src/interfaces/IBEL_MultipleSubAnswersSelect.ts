export interface IMultipleSubAnswersSelectAnswers{
    correct:string[],
    wrong:string[],
    label:string
}

export default interface IMultipleSubAnswersSelect{
    question:string,
    answers:IMultipleSubAnswersSelectAnswers[]
}