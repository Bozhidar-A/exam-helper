import { useEffect, useMemo, useRef, useState } from "react";
import BEL_MultipleAnswersMemorized from "./BEL_MultipleAnswers";
import BEL_MultipleSubAnswersSelectMemorized from "./BEL_MultipleSubAnswersSelect";
import BEL_SingleAnswerMemorized from "./BEL_SingleAnswer";
import BEL_FindMissingPunctuationMemorized from "./BEL_FindMissingPunctuation";
import BEL_MultipleSubAnswersWriteMemorized from "./BEL_MultipleSubAnswersWrite";
import BEL_ConnectMemorized from "./BEL_Connect";
import BEL_WritePointsMemorized from "./BEL_WritePoints";
import IBEL_IMultipleSubAnswersWriteAnswers from "../interfaces/IBEL_IMultipleSubAnswersWriteAnswers";
import { GetMaturaYearSession } from "./NotDrawable/APIConnector";
import { Oval } from "react-loader-spinner";
import IAPI, { APIData } from "../interfaces/IAPI";
import BEL_Works from "./BEL_Works";
import BEL_UncheckableMemorized from "./BEL_Uncheckable";
import { Link, useLocation } from "react-router-dom";
import styles from "../css/main.module.css"
import CountdownExam from "./CountdownExam";
import { useSelector } from "react-redux";

function ExamManager()
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
    const APIURL = useSelector((state:any) => state.APIURL.URL)

    const location = useLocation();
    // console.log(location.state)

    const min60 = 3600000;
    const min120 = 7200000;
    const memorizeCountdown = useMemo(() => <CountdownExam module={maturaModuleCount} min60={min60} min120={min120}></CountdownExam>, [maturaModuleCount])

    useEffect(() => {
        // @ts-ignore
        const{year, session} = location.state
        GetMaturaYearSession(parseInt(year),parseInt(session), APIURL).then((result:IAPI) => {
            if(result.status === "OK"){
                setTestData(result.data.sort((firstItem, secondItem) => firstItem.qNum - secondItem.qNum))
                //sorts by qNum

                setLoading(false);
            }
            else{
                console.error(result.error);
                setAPIError(true);
                setLoading(false);
            }
        })
    }, [])

    function UpdateScore(added:number)
    {      
        let tmp = score;
        tmp += added;
        setScore(tmp);
    }

    function SwitchRenderer(data:APIData[]){
        return(<div>   
            {data.map((q:APIData) => {
                try{
                    switch (q.type) {
                        case "BEL_Uncheckable":
                            return <BEL_UncheckableMemorized key={q.id} question={q.question!} year={q.year} session={q.session} checking={checking}></BEL_UncheckableMemorized>
                        case "BEL_Works":
                            return <BEL_Works key={q.id} textsArr={q.textsArr!}></BEL_Works> 
                        case "BEL_SingleAnswer":
                            return <BEL_SingleAnswerMemorized key={q.id} id={q.id} qNum={q.qNum} question={q.question!} wrong={q.wrong as string[]} correct={q.correct as string} UpdateScore={UpdateScore} checking={checking}></BEL_SingleAnswerMemorized>
                        case "BEL_MultipleAnswers":
                            return <BEL_MultipleAnswersMemorized key={q.id} id={q.id} qNum={q.qNum} question={q.question!} wrong={q.wrong! as string[]} correct={q.correct! as string[]} UpdateScore={UpdateScore} checking={checking}></BEL_MultipleAnswersMemorized>
                        case "BEL_MultipleSubAnswersSelect":
                            return <BEL_MultipleSubAnswersSelectMemorized key={q.id} data={q} UpdateScore={UpdateScore} checking={checking}></BEL_MultipleSubAnswersSelectMemorized>
                        case "BEL_FindMissingPunctuation":
                            return <BEL_FindMissingPunctuationMemorized key={q.id} data={q} UpdateScore={UpdateScore} checking={checking}></BEL_FindMissingPunctuationMemorized>
                        case "BEL_MultipleSubAnswersWrite":
                            return <BEL_MultipleSubAnswersWriteMemorized key={q.id} UpdateScore={UpdateScore} id={q.id} qNum={q.qNum} question={q.question!} answers={q.answers! as IBEL_IMultipleSubAnswersWriteAnswers[]} checking={checking}></BEL_MultipleSubAnswersWriteMemorized>
                        case "BEL_Connect":
                            return <BEL_ConnectMemorized key={q.id} id={q.id} qNum={q.qNum} type={q.type} options={q.options!} UpdateScore={UpdateScore} checking={checking}></BEL_ConnectMemorized>
                        case "BEL_WritePoints":
                            return <BEL_WritePointsMemorized key={q.id} id={q.id} qNum={q.qNum} question={q.question!} correct={q.correct as string[]} maxPoints={q.maxPoints!} UpdateScore={UpdateScore} checking={checking}></BEL_WritePointsMemorized>
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

    function StartChecking(){
        setMaturaModuleCount(-1);
        maturaModuleOneRef.current.className = "";
        maturaModuleTwoRef.current.className = "";
        maturaModuleThreeRef.current.className = "";
        setChecking(true);
    }

    function NextModule(){
        setMaturaModuleCount(maturaModuleCount + 1)
    }

    function NextModuleButton(){
        return <>{!checking && <button onClick={() => NextModule()}>Следващ модул</button>}</>
    }

    function ModuleSelector(){
        //this is very bad
        //there must a better way to handle this

        let copy = [...testData];
        var mOne = <div ref={maturaModuleOneRef}>
            <p>Модул №1</p>
            {NextModuleButton()}
            <br />
            {SwitchRenderer([...copy.filter(data => data.qNum <= 22), ...copy.filter(data => data.qNum === 42), ...copy.filter(data => data.qNum > 22 && data.qNum <= 30)])}
            {NextModuleButton()}
        </div>
        //gets all with lower or equal qNum to 30

        var mTwo =<div ref={maturaModuleTwoRef} className="hidden" >
            <p>Модул №2</p>
            {NextModuleButton()}
            <br />
            {SwitchRenderer([...copy.filter(data => data.qNum === 42), ...copy.filter(data => data.qNum > 30 && data.qNum <= 37), ...copy.filter(data => data.qNum === 43), ...copy.filter(data => data.qNum > 37 && data.qNum < 41)])}
            {NextModuleButton()}
        </div>
        //places the text 42 at the beginning , place 43 after 37 and spreads all question except 41

        var mThree = <div ref={maturaModuleThreeRef} className="hidden">
            <p>Модул №3</p>
            {!checking && <button onClick={() => StartChecking()}>Този въпрос не може да се провери автоматично. Моля натиснете тук за да предадете.</button>}
            <br />
            {SwitchRenderer([copy.filter(data => data.qNum === 41)][0])}
        </div>
        //gets 41

        let timeout;

        switch (maturaModuleCount) {
            case 1:
                clearTimeout(timeout)
                timeout = setTimeout(() => {setMaturaModuleCount(2)}, min60)//60 minutes
                break;
            case 2:
                maturaModuleOneRef.current.className = "hidden";
                maturaModuleTwoRef.current.className = "";
                clearTimeout(timeout)
                timeout = setTimeout(() => {setMaturaModuleCount(3)}, min60)//60 minutes
                break;
            case 3:
                maturaModuleTwoRef.current.className = "hidden";
                maturaModuleThreeRef.current.className = "";
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    StartChecking()
                }, min120)//120 minutes
                //this is catastrophically bad and WILL lead to crash 
                //REWRITE
                break;
            case -1:
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

    function CalcGradeFromPoints(){
        if(score < 23){
            return 2
        }else if(score < 41){
            return 3
        }else if(score < 59){
            return 4
        }else if(score < 75){
            return 5
        }else{
            return 6
        }
    }

    function NewExam(){
        return <>{checking && <Link to={`/`}>Направте нов тест</Link>}</>
    }

    function Display()
    {
        if(loading){
            return(<div className={styles.center_screen}>
                    <Oval color="#04cf22" height={100} width={100} ariaLabel='loading'/>
                </div>)
        }
        else if(APIError){
            // setTimeout(() => window.location.reload, 3000);

            return(<p>An error has occured with the API. Please try again.</p>)
        }
        else
        {
            return(<div>
                <div className={`${styles.sticky_eader} ${styles.center_text}`}>{!checking && !loading ? memorizeCountdown : null}</div>
                {NewExam()}
                {checking && <p>Общо имате {score} точки. Вашата оценка е {CalcGradeFromPoints()}!</p>}
                {ModuleSelector()}
                {NewExam()}
            </div>)
        }  
    }

    return(<div>
        <div className={styles.AlignLeftWithPadding}>{Display()}</div>
    </div>)
}

export default ExamManager;