import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { IAPISelector, IAPISelectorData } from "../interfaces/IAPI";
import { GetAvailableYearsSessions } from "./NotDrawable/APIConnector";
import styles from "../css/main.module.css"
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

function Selector(){
    const [yearsSessions, setYearsSessions] = useState<IAPISelectorData[]>();
    const [APILoading, setAPILoading] = useState(true);
    const [APIError, setAPIError] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedSession, setSelectedSession] = useState<string>("");
    const APIURL = useSelector((state:any) => state.APIURL.URL)

    useEffect(() => {
        GetAvailableYearsSessions(APIURL).then((res:IAPISelector) => {

            if(res.status !== "OK"){
                console.error(res.error);
                setAPIError(true);
                setAPILoading(false);
            }

            setYearsSessions(res.data);
            setAPILoading(false);
        })
    }, []) 

    function SessionStringToInt(session:number){
        switch (session) {
            case 1:
                return "първа"
            case 2:
                return "втора"
            default:
                break;
        }
    }

    function Display(){
        if(APILoading){
            return(<div className={styles.center_screen}>
                    <Oval color="#04cf22" height={100} width={100} ariaLabel='loading'/>
                </div>)
        }
        else if(APIError){
            return(<p>An error has occured with the API. Please try again.</p>)
        }
        else
        {
            return(<div>
                <p>Година: </p>
                <select onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value=""></option>
                    {yearsSessions?.map(combo => {
                        return <option value={combo.year}>{combo.year}</option>
                    })}
                </select>
                <br />
                <p>Сесия: </p>
                {selectedYear !== "" ? <select onChange={(e) => setSelectedSession(e.target.value)}>
                    <option value=""></option>
                    {/* double loops are bad, but it has to be way for the data to be structured nicely */}
                    {yearsSessions?.filter(obj => {
                      return obj.year.toString() === selectedYear
                    }).map(combo => {
                        return combo.sessions.map(session => {
                            return <option value={session}>{SessionStringToInt(session)}</option>
                        })
                    })}
                </select> : <p>Моля изберете годината първо</p>}
                <br />
                {selectedYear === "" || selectedSession === "" ? <p>Моля изберете коя година и сесия бихте искали да правите</p> : 
                <Link
                    to={`/exam`}
                    state={{ year: selectedYear, session: selectedSession }}
                >
                    <button type="button">Започнете теста</button>
                </Link>}
            </div>)
        }  
    }

    return(<div>
        <Link to={`/updateAPIURL`}><p>Кликнете тук да обновите API сървара </p></Link>
        <div>{Display()}</div>
    </div>)
}

export default Selector;