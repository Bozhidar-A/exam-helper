import IPointsFromQuestion from "../interfaces/IPointsFromQuestion";

export default function PointsFromQuestion(props:IPointsFromQuestion){
    return(<p>От този въпрос вие взехте {props.points} {props.points === 1 ? "точка" : "точки"}</p>)
}