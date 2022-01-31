import { useEffect, useState } from "react";
import BEL_MultipleAnswers from "./BEL_MultipleAnswers";
import BEL_MultipleSubAnswersSelect from "./BEL_MultipleSubAnswersSelect";
import BEL_SingleAnswer from "./BEL_SingleAnswer";
import BEL_FindMissingPunctuation from "./BEL_FindMissingPunctuation";
import BEL_MultipleSubAnswersWrite from "./BEL_MultipleSubAnswersWrite";
import BEL_Connect from "./BEL_Connect";
import BEL_WritePoints from "./BEL_WritePoints";
import IBEL_IMultipleSubAnswersWriteAnswers from "../interfaces/IBEL_IMultipleSubAnswersWriteAnswers";
import { GetMaturaYearSession } from "./NotDrawable/APIConnecor";
import { Oval } from "react-loader-spinner";
import IAPI from "../interfaces/IAPI";

function TestManager()
{
    const [score, setScore] = useState(0);
    const [checking, setChecking] = useState(false)
    const [testData, setTestData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [APIError, setAPIError] = useState(false);

    useEffect(() => {
        GetMaturaYearSession(2020,1).then((result:IAPI) => {
            if(result.status === "OK"){
                setTestData(result.data);
                setLoading(false);
            }
            else{
                console.error(result.data)
                setAPIError(true);
            }
        })
    }, [])

    function UpdateScore(added:number)
    {      
        let tmp = score;
        tmp += added;
        setScore(tmp);
    }

    function StartChecking(){
        setChecking(true);
        console.log(score)
    }

    function Display()
    {
        if(loading){
            return(<Oval color="#04cf22" height={100} width={100} ariaLabel='loading'/>)
        }
        else if(APIError){
            setTimeout(() => window.location.reload, 3000);

            return(<p>An error has occured with the API. The page will auomaticly refresh in 3 seconds</p>)
        }
        else
        {
            return(<div>
                {/* <p>{score}</p> */}
                {checking ? null : <button type="button" onClick={StartChecking}>checking</button>}
                {testData && testData.map((q:any) => {
                    switch (q.type) {
                        case "BEL_SingleAnswer":
                            //q.wrong! as string[] is very dumb
                            return <BEL_SingleAnswer id={q.id} qNum={q.qNum} question={q.question} wrong={q.wrong} correct={q.correct} UpdateScore={UpdateScore} checking={checking}></BEL_SingleAnswer>
                        case "BEL_MultipleAnswers":
                            return <BEL_MultipleAnswers id={q.id} qNum={q.qNum} question={q.question!} wrong={q.wrong! as string[]} correct={q.correct! as string[]} UpdateScore={UpdateScore} checking={checking}></BEL_MultipleAnswers>
                        case "BEL_MultipleSubAnswersSelect":
                            return <BEL_MultipleSubAnswersSelect data={q} UpdateScore={UpdateScore} checking={checking}></BEL_MultipleSubAnswersSelect>
                        case "BEL_FindMissingPunctuation":
                            return <BEL_FindMissingPunctuation data={q} UpdateScore={UpdateScore} checking={checking}></BEL_FindMissingPunctuation>
                        case "BEL_MultipleSubAnswersWrite":
                            return <BEL_MultipleSubAnswersWrite UpdateScore={UpdateScore} id={q.id} qNum={q.qNum} question={q.question!} answers={q.answers! as IBEL_IMultipleSubAnswersWriteAnswers[]} checking={checking}></BEL_MultipleSubAnswersWrite>
                        case "BEL_Connect":
                            return <BEL_Connect id={q.id} qNum={q.qNum} type={q.type} options={q.options!} UpdateScore={UpdateScore} checking={checking}></BEL_Connect>
                        case "BEL_WritePoints":
                            return <BEL_WritePoints id={q.id} qNum={q.qNum} question={q.question!} correct={q.correct as string[]} maxPoints={q.maxPoints!} UpdateScore={UpdateScore} checking={checking}></BEL_WritePoints>
                        default:
                            console.error(`No component found for the following data. This should not be possible.`)
                            console.log(q)
                            break;
                    }
                })}
            </div>)
        }  
    }

    return(<div>
        {Display()}
    </div>)
}

export default TestManager;