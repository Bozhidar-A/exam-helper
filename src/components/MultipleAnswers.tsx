import { FormEvent, useEffect, useState } from "react";
import IMultipleAnswers from "../interfaces/IMultipleAnswers";

let sampleData = {
    "id": 1,
    "qNum": 1,
    "question": "31. Изброени са факти от двата текста, както и факти, които липсват в тях. Всвитъка за свободните отговори запишете САМОбуквите на отговорите, с които са означени ЧЕТИРИТЕ факта, ОТСЪСТВАЩИ в посочените текстове.",
    "wrong": [
      "В) Днес в Българиятвърде малко хора упражняват медникарския занаят, като сред тях са и три жени.",
      "Г) Работата на медникаря изисква доста добри умения на стругар и ковач, както и  познаване на тънкостите на метала.",
      "Д) Има сведения, че медникарският занаятсе упражнява по българските земи още от времето на древните траки.",
      "Ж)Медникарските инструменти включват разнообразни по вид наковални и чукове.",
    ],
    "correct": [
        "А)По  медните  съдове в  миналото  често  пъти били  издълбавани  дати,  надписи, посвещенияи нравоучения.",
        "Б)Медните съдове били предпочитан сватбен подарък, защото сесмятало, че носятна младото семейство усещане за топлота и уют.",
        "Е)За разлика от сребърните и златните съдовеи предмети меднитеизделия лесно се окисляват.",
        "З)Декоративните мотиви върху медните съдове обикновено са геометрични фигури и изображения на животни.",
    ]
}

function Options(props:any)
{
    function HandleChange(e: FormEvent<HTMLDivElement>)
    {
        let el = e?.currentTarget as HTMLInputElement;
        // console.log(el)
        props.setValue(el.value);
    }
   
    return(
        <div>
            {props.opts.map((op:string) => (
                <div>
                    <input type="checkbox" id={`${sampleData.id}-${op}`} name={`Q${sampleData.id}`} value={op} onChange={e => HandleChange(e)}></input> 
                    <label htmlFor={op}>{op}</label>
                </div>
            ))}
        </div>
    )
}

function MultipleAnswers()
{
    const [ans, setAns] = useState<IMultipleAnswers[]>();

    let options = [...sampleData.wrong, ...sampleData.correct].sort();

    useEffect(() => {
        let dict = options.map(op => {return {name:op,selected:false}})
        // console.log(dict);
        setAns(dict);
    }, [])

    function HandleGetValFromOption(el:any)
    {
        let tmp = [...ans!];
        let index = tmp.findIndex(op => op.name === el);
        tmp[index].selected = !tmp[index].selected;

        setAns(tmp);
    }

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
            <button onClick={() => console.log(ans)}>print</button>
            <p>{sampleData.question}</p>
            <Options setValue={(e: string) => HandleGetValFromOption(e)} opts={options}></Options>
            <p>Given: {JSON.stringify(ans)}</p>
        </div>
    )
}

export default MultipleAnswers;