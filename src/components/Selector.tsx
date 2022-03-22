import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function Selector(){
    const years = [2020]
    const sessions = [1]

    const [selectedYear, setSelectedYear] = useState<string>()
    const [selectedSession, setSelectedSession] = useState<string>()

    function SessionStringToInt(session:number){
        switch (session) {
            case 1:
                return "първа"        
            default:
                break;
        }
    }

    return(<div>
        <p>Година: </p>
        <select onChange={(e) => setSelectedYear(e.target.value)}>
            <option></option>
            {years.map(year => {
                return <option value={year}>{year}</option>
            })}
        </select>
        <br />
        <p>Сесия: </p>
        <select onChange={(e) => setSelectedSession(e.target.value)}>
            <option></option>
            {sessions.map(session => {
                return <option value={session}>{SessionStringToInt(session)}</option>
            })}
        </select>
        <br />
        {selectedYear == null || selectedSession == null ? <p>Моля изберете коя година и сесия бихте искали да правите</p> : 
        <Link
            to={`/exam`}
            state={{ year: selectedYear, session: selectedSession }}
        >
            <button type="button">Започнете теста</button>
        </Link>}
    </div>)
}