import IBEL_Uncheckable from "../interfaces/IBEL_Uncheckable";

//These are the question that just have TEXT or only suggestions as an answer
function BEL_Uncheckable({question}:IBEL_Uncheckable){
    return(<div>
        <p>{question}</p>
        <textarea></textarea>
    </div>)
}

export default BEL_Uncheckable;