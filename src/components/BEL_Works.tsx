import IBEL_Works from "../interfaces/IBEL_Works";

function BEL_Works(props:IBEL_Works){    
    return(<div>
        {props.textsArr.map((text:string) => {
            return <pre key={text} dangerouslySetInnerHTML={{ __html: text.replace("\n", "<br/>") }}></pre>
        })}
    </div>)
}

export default BEL_Works;