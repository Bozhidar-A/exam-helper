import { useState } from "react";
import { Link } from "react-router-dom";

export default function Selector(){
    const years = [2020]
    const sessions = ["first"]

    const [selectedYear, setSelectedYear] = useState<string>()
    const [selectedSession, setSelectedSession] = useState<string>()

    function SessionStringToInt(session:string){
        switch (session) {
            case "first":
                return 1        
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
                return <option value={SessionStringToInt(session)}>{session}</option>
            })}
        </select>
        <br />
        {selectedYear == null || selectedSession == null ? <p>Моля изберете коя година и сесия бихте искали да правите</p> : 
        <Link
            to={`/exame`}
            state={{ year: selectedYear, session: selectedSession }}
        >
            <button type="button">Започнете теста</button>
        </Link>}
    </div>)
}