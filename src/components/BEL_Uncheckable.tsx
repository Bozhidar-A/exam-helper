import React from "react";
import { useState } from "react";
import IBEL_Uncheckable from "../interfaces/IBEL_Uncheckable";
import styles from "../css/main.module.css"

//These are the question that just have TEXT or only suggestions as an answer
function BEL_Uncheckable(props:IBEL_Uncheckable){
    const [inputText, setInputText] = useState("")

    return(<div className={styles.EveryExamComponent}>
        <pre dangerouslySetInnerHTML={{ __html: props.question.replace("\n", "<br/>") }}></pre>
        <textarea className={styles.TextareaMaxWidth} disabled={props.checking} onChange={e => setInputText(e.target.value)}></textarea>
        {props.checking && <div>
            <p>Този въпрос нямам лесен за показване отговор. Моля свържете се с учител който може да го провери.</p>
            <textarea className={styles.TextareaMaxWidth} value={inputText} disabled={true}></textarea>
        </div>}
    </div>)
}

export default React.memo(BEL_Uncheckable);