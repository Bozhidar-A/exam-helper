import { FormEvent, useEffect, useState } from "react";

let sampleData = {
    "id": 1,
    "qNum": 1,
    "question": "В кой ред НЕ е допусната правописна грешка?",
    "wrong": [
      "А) разгорели, отлетели, затрептяли",
      "Б) сърдечен, порядачен, списъчен",
      "Г) свързвам, завързвам, подвръзвам"
    ],
    "correct": "В) семейна, бездействие, портфейл"
}

function Options(props:any)
{
    let options = [...sampleData.wrong, sampleData.correct].sort();

    function HandleChange(e: FormEvent<HTMLDivElement>)
    {
        let el = e?.currentTarget as HTMLInputElement;
        console.log(el)
        props.setValue(el.value);
    }
   
    return(
        <div>
            {options.map(op => (
                <div>
                    <input type="radio" id={op} name={`Q${sampleData.id}`} value={op} onChange={e => HandleChange(e)}></input> 
                    <label htmlFor={op}>{op}</label>
                </div>
            ))}
        </div>
    )
}

function SingleAnswer()
{
    const [ans, setAns] = useState("none");

    // useEffect(() => {
    //     if(ans === sampleData.correct)
    //     {
    //         alert("YES")
    //     }
    //     else{
    //         alert("OH NOOOOOOOO")
    //     }
    // }, [ans])

    return(
        <div>
            <p>{sampleData.question}</p>
            <Options setValue={setAns}></Options>
            <p>Given: {ans}</p>
        </div>
    )
}

export default SingleAnswer;