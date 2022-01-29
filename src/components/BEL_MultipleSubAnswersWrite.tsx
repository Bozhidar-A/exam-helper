import { FormEvent, useEffect, useState } from "react";
import IBEL_MultipleSubAnswersWriteOptions from "../interfaces/IBEL_MultipleSubAnswersWriteOptions";
import IBEL_MultipleSubAnswersWrite from "../interfaces/IBEL_MultipleSubAnswersWrite";

function Options(props:IBEL_MultipleSubAnswersWriteOptions)
{
    function HandleChange(e: FormEvent<HTMLDivElement>, index:number, label:string)
    {
        let el = e?.currentTarget as HTMLInputElement;
        props.setValue(el.value, index, label);
    }
   
    return(
        <div>
            <p>{props.data.label}</p>
            <p>{props.data.question}</p>
            {props.data.correct.map((correct:string, i:number) =>
                <div>
                    <p>{i}.</p>
                    <input type="text" disabled={props.checking} onChange={e => HandleChange(e, i, props.data.label)}></input>
                    {props.checking && <p className="bg-lime-500" >{correct}</p>}
                </div>
            )}
        </div>
    )
}

function BEL_MultipleSubAnswersWrite(props:IBEL_MultipleSubAnswersWrite)
{    
    const [ans, setAns] = useState<any>();
    const [answeredCorrect, setAnsweredCorrect] = useState(false);

    useEffect(() => {
        let base:any = {};
        props.answers && props.answers.map((op:any)=> {
            base[`${op.label}`] = [];
        })//there has to be a better way to do this

        setAns(base)
    }, [])

    function HandleSetValue(e: string, index:number, label:string) {
        let clone = ans
        clone[label][index] = e;

        if(props.answers.filter((obj:any) => obj.label === label)[0].correct[index] === e)
        {
            props.UpdateScore(1);
            setAnsweredCorrect(true);
        }
        else
        {
            if(answeredCorrect)
            {
                props.UpdateScore(-1); // -Math.abs(num);
                setAnsweredCorrect(false);
            }
        }

        setAns(clone);
    }

    function CheckingDisplayScore()
    {
        let finScore = 0

        Object.keys(ans).map((key:string) => {
            props.answers.filter(data => data.label === key)[0].correct.map((an:string) => {
                if(ans[key].includes(an))
                {
                    finScore++;
                }
            })
        })

        return finScore;
    }

    return(
        <div>
            <p>{props.question}</p>
            {props.answers && props.answers.map((op:any, k:number) => {
                return <Options setValue={(e: string, index:number, label:string) => HandleSetValue(e, index, label)} data={op} index={k} id={props.id} checking={props.checking}></Options>
            })}
            {/* <p>Given: {JSON.stringify(ans)}</p> */}
            {props.checking && <p>Взети точки {CheckingDisplayScore()}</p>}
        </div>
    )
}

export default BEL_MultipleSubAnswersWrite;

