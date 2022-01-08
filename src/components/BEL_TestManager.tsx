import { useState } from "react";
import BEL_MultipleAnswers from "./BEL_MultipleAnswers";
import BEL_MultipleSubAnswersSelect from "../apain/BEL_MultipleSubAnswersSelect";
import BEL_SingleAnswer from "./BEL_SingleAnswer";

const data = [
    {
    "id": 1,
    "qNum": 1,
    "type":"BEL_SingleAnswer",
    "question": "В кой ред НЕ е допусната правописна грешка?",
    "wrong": [
      "А) разгорели, отлетели, затрептяли",
      "Б) сърдечен, порядачен, списъчен",
      "Г) свързвам, завързвам, подвръзвам"
    ],
    "correct": "В) семейна, бездействие, портфейл"
    },
    {
        "id": 1,
        "qNum": 1,
        "type": "BEL_MultipleAnswers",
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
    },
    {
        "id": 1,
        "qNum": 1,
        "type": "BEL_MultipleSubAnswersSelect",
        "question": "35. За всяко празно място изберете НАЙ-УМЕСТНАТА от думите и я запишете срещу съответната буква в свитъка за свободните отговори.Гербът представлява графично ………… (А), създадено по определени правила, което принадлежи на даден род, град, държава, организация и т.н. Той е ……..…. (Б) знак, съчетаващ фигури и предмети с определено символно значение. Всяка съвременна държава има свой герб, който е неин ………… (В) символ и е израз на нейния суверенитет. Науката, която ………… (Г) гербовата символика и описва гербовете, се нарича хералдика.",
        "answers":[
            {
                "label":"А",
                "wrong":[
                    "изражение",
                    "изложение"
                ],
                "correct":"изображение"
            },
            {
                "label":"Б",
                "wrong":[
                    "почтителен",
                    "увеличителен"
                ],
                "correct":"отличителен"
            },
            {
                "label":"В",
                "wrong":[
                    "основаващ",
                    "основателен"
                ],
                "correct":"основен"
            },
            {
                "label":"Г",
                "wrong":[
                    "изобличава",
                    "научава"
                ],
                "correct":"изучава"
            },
        ],
    }
]


function TestManager()
{
    const [score, setScore] = useState(0);

    function UpdateScore(added:number)
    {
        setScore(score + added);
    }

    return(<div>
        <p>{score}</p>
        {/* <BEL_SingleAnswer data={q1} UpdateScore={UpdateScore}></BEL_SingleAnswer> */}
        {data.map(q => {
            switch (q.type) {
                case "BEL_SingleAnswer":
                    return <BEL_SingleAnswer data={q} UpdateScore={UpdateScore}></BEL_SingleAnswer>
                case "BEL_MultipleAnswers":
                    return <BEL_MultipleAnswers data={q} UpdateScore={UpdateScore}></BEL_MultipleAnswers>
                case "BEL_MultipleSubAnswersSelect":
                    return <BEL_MultipleSubAnswersSelect data={q} UpdateScore={UpdateScore}></BEL_MultipleSubAnswersSelect>
                default:
                    break;
            }
        })}
    </div>)
}

export default TestManager;