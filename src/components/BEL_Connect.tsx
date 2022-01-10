import { FormEvent, useState } from "react";
import IConnect from "../interfaces/IConnect";
import IConnectOptions from "../interfaces/IConnect"

function Option(props:any){
    let options = [...props.option.wrong, props.option.answers[0].correct, props.option.answers[1].correct].sort()

    function HandleChange(event:any, index:number, label:string)
    {
        // let el = event.currentTarget as HTMLInputElement;
        props.UpdateScore(event.currentTarget.value, index, label)
    }

    return(<div>
        <p>{props.label}</p>
        {props.option.answers.map((op:any) => {
            return <label>
                {op.label}
                <select onChange={e => HandleChange(e, props.index, props.label)}>
                    {options.map((op:string) => {
                        return <option value={op}>{op}</option>
                    })}
                </select>
            </label>
        })}
    </div>)
}

function BEL_Connect({id,qNum,type,options,UpdateScore}:IConnect){

    let base:any = {};
    options.map((op:any)=> {
        base[`${op.label}`] = [];
    })//there has to be a better way to do this
    

    const [ans, setAns] = useState(base);
    const [answeredCorrect, setAnsweredCorrect] = useState(false);

    function HandleUpdateScore(selected:string, index:number, label:string)
    {
        let clone = ans
        clone[label][index] = selected;

        options.map((op:any) => {
            op.answers.map((ans:any) => {
                if(selected === ans.correct)
                {
                    UpdateScore(1);
                    setAnsweredCorrect(true);
                }
                else
                {
                    if(answeredCorrect)
                    {
                        UpdateScore(-1);
                        setAnsweredCorrect(false);
                    }
                }
            })
        })
    }

    return(<div>
        {/* <p>{qNum}</p> */}
        {options.map((op:any, i:number) => {
            return <Option option={op} UpdateScore={HandleUpdateScore} index={i} label={op.label}></Option>
        })}
    </div>)
}

export default BEL_Connect;