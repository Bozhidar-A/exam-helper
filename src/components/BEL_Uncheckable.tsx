import { useState } from "react";
import IBEL_Uncheckable from "../interfaces/IBEL_Uncheckable";

//These are the question that just have TEXT or only suggestions as an answer
function BEL_Uncheckable(props:IBEL_Uncheckable){
    const [inputText, setInputText] = useState("")

    return(<div>
        <pre dangerouslySetInnerHTML={{ __html: props.question.replace("\n", "<br/>") }}></pre>
        <textarea disabled={props.checking} onChange={e => setInputText(e.target.value)}></textarea>
        {props.checking && <div>
            <p>Този въпрос нямам лесен за показване отговор. Моля свържете се с учител който може да го провери.</p>
            <textarea value={inputText} disabled={true}></textarea>
        </div>}
    </div>)
}

export default BEL_Uncheckable;