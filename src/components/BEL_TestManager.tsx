import { useEffect, useRef, useState } from "react";
import BEL_MultipleAnswers from "./BEL_MultipleAnswers";
import BEL_MultipleSubAnswersSelect from "./BEL_MultipleSubAnswersSelect";
import BEL_SingleAnswer from "./BEL_SingleAnswer";
import BEL_FindMissingPunctuation from "./BEL_FindMissingPunctuation";
import BEL_MultipleSubAnswersWrite from "./BEL_MultipleSubAnswersWrite";
import BEL_Connect from "./BEL_Connect";
import BEL_WritePoints from "./BEL_WritePoints";
import IBEL_IMultipleSubAnswersWriteAnswers from "../interfaces/IBEL_IMultipleSubAnswersWriteAnswers";
import { GetMaturaYearSession } from "./NotDrawable/APIConnector";
import { Oval } from "react-loader-spinner";
import IAPI, { APIData } from "../interfaces/IAPI";
import BEL_Works from "./BEL_Works";
import BEL_Uncheckable from "./BEL_Uncheckable";

function TestManager()
{
    const [score, setScore] = useState(0);
    const [checking, setChecking] = useState(false)
    const [testData, setTestData] = useState<APIData[]>([]);
    const maturaModuleOneRef = useRef<any>(null);
    const maturaModuleTwoRef = useRef<any>(null);
    const maturaModuleThreeRef = useRef<any>(null);
    //these should be mereged into one
    const [maturaModuleCount, setMaturaModuleCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [APIError, setAPIError] = useState(false);

    useEffect(() => {
        GetMaturaYearSession(2020,1).then((result:IAPI) => {
            if(result.status === "OK"){
                setTestData(result.data.sort((firstItem, secondItem) => firstItem.qNum - secondItem.qNum))
                //sorts by qNum

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
        maturaModuleOneRef.current.className = "";
        maturaModuleTwoRef.current.className = "";
        maturaModuleThreeRef.current.className = "";
        setChecking(true);
    }

    function SwitchRenderer(data:APIData[]){
        return(<div>   
            {data.map((q:APIData) => {
                try{
                    switch (q.type) {
                        case "BEL_Uncheckable":
                            return <BEL_Uncheckable question={q.question!} checking={checking}></BEL_Uncheckable>
                        case "BEL_Works":
                            return <BEL_Works textsArr={q.textsArr!}></BEL_Works> 
                        case "BEL_SingleAnswer":
                            return <BEL_SingleAnswer id={q.id} qNum={q.qNum} question={q.question!} wrong={q.wrong as string[]} correct={q.correct as string} UpdateScore={UpdateScore} checking={checking}></BEL_SingleAnswer>
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
                } catch(error){
                    console.log(q)
                }
                
            })}
                   
        </div>)
    }
    
    function EndTest(){
        setMaturaModuleCount(-1);
        StartChecking();
    }

    function ModuleSelector(){
        //this is very bad
        //there must a better way to handle this

        let copy = [...testData];
        var mOne = <div ref={maturaModuleOneRef}>{SwitchRenderer(copy.filter(data => data.qNum <= 30))}</div>
        //gets all with lower or equal qNum to 30

        var mTwo =<div ref={maturaModuleTwoRef} className="hidden" >{SwitchRenderer([copy.filter(data => data.qNum === 22.5)[0], ...copy.filter(data => data.qNum > 30 && data.qNum < 41)])}</div>
        //places the text 22.5 at the beginning and spreads all question except 41

        var mThree = <div ref={maturaModuleThreeRef} className="hidden">
            <button onClick={EndTest}>Този въпрос не може да се провери автоматично. Моля натиснете тук за да предадете.</button>
            {SwitchRenderer([copy.filter(data => data.qNum === 41)][0])}
        </div>
        //gets 41

        switch (maturaModuleCount) {
            case 1:
                setTimeout(() => {setMaturaModuleCount(2)}, 3600000)//60 minutes
                break;
            case 2:
                maturaModuleOneRef.current.className = "hidden";
                maturaModuleTwoRef.current.className = "";
                setTimeout(() => {setMaturaModuleCount(3)}, 3600000)//60 minutes
                break;
            case 3:
                maturaModuleTwoRef.current.className = "hidden";
                maturaModuleThreeRef.current.className = "";
                setTimeout(() => {
                    EndTest()
                }, 7200000)//120 minutes
                break;
            default:
                console.error("maturaModuleCount var is broken. Please refresh.")
                break;
        }

        return(<div>
            {mOne}
            {mTwo}
            {mThree}
        </div>)
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
                <p>{score}</p>
                {checking ? null : <button type="button" onClick={StartChecking}>Предай</button>}
                {ModuleSelector()}
            </div>)
        }  
    }

    return(<div>
        {Display()}
    </div>)
}

export default TestManager;