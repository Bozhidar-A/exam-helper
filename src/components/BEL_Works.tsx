import React from "react";
import IBEL_Works from "../interfaces/IBEL_Works";
import styles from "../css/main.module.css"

function BEL_Works(props:IBEL_Works){    
    return(<div className={styles.EveryExamComponent}>
        {props.textsArr.map((text:string) => {
            return <pre key={text} dangerouslySetInnerHTML={{ __html: text.replace("\n", "<br/>") }}></pre>
        })}
    </div>)
}

export default React.memo(BEL_Works);