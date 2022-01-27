interface IConnectOptionsAnswers{
    label:string,
    correct:string
}


interface IConnectOptions{
    label:string,
    answers:IConnectOptionsAnswers[],
    wrong:string[]
}


export default interface IConnect{
    id:number,
    qNum:number,
    type:string,
    options:IConnectOptions[],
    UpdateScore:(added:number) => void,
    checking: boolean
}