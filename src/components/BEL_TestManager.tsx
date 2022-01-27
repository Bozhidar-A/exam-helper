import { useState } from "react";
import BEL_MultipleAnswers from "./BEL_MultipleAnswers";
import BEL_MultipleSubAnswersSelect from "./BEL_MultipleSubAnswersSelect";
import BEL_SingleAnswer from "./BEL_SingleAnswer";
import BEL_FindMissingPunctuation from "./BEL_FindMissingPunctuation";
import BEL_MultipleSubAnswersWrite from "./BEL_MultipleSubAnswersWrite";
import BEL_Connect from "./BEL_Connect";
import BEL_WritePoints from "./BEL_WritePoints";
import IBEL_IMultipleSubAnswersWriteAnswers from "../interfaces/IBEL_IMultipleSubAnswersWriteAnswers";

const data = [
    {
    "id": 1,
    "qNum": 1,
    "type":"BEL_SingleAnswer",
    "year":2021,
    "session":"first",
    "question": "В кой ред НЕ е допусната правописна грешка?",
    "wrong": [
      "А) разгорели, отлетели, затрептяли",
      "Б) сърдечен, порядачен, списъчен",
      "Г) свързвам, завързвам, подвръзвам"
    ],
    "correct": "В) семейна, бездействие, портфейл"
    },
    {
        "id": 2,
        "qNum": 1,
        "type": "BEL_MultipleAnswers",
        "year":2021,
        "session":"first",
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
        "id": 3,
        "qNum": 1,
        "type": "BEL_MultipleSubAnswersSelect",
        "year":2021,
        "session":"first",
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
    },
    {
        "id": 4,
        "qNum": 1,
        "type": "BEL_FindMissingPunctuation",
        "year":2021,
        "session":"first",
        "question": "37. В текста са пропуснати САМО ПЕТ препинателни знака. Препишете текста в свитъка за свободните отговори, като поставите пропуснатите знаци.",
        "wrong":"Човек, който иска да намали теглото си трябва да потърси специалист. Контролът на теглото трябва да бъде непрекъснат, но ако цял живот сме на диета ще се лишим от много храни. Известен диетолог твърди Храната приемана ежедневно от нас, ни зарежда с енергия, от която ние не трябва да се лишаваме.",
        "correct": "Човек, който иска да намали теглото си, трябва да потърси специалист. Контролът на теглото трябва да бъде непрекъснат, но ако цял живот сме на диета, ще се лишим от много храни. Известен диетолог твърди: „Храната, приемана ежедневно от нас, ни зарежда с енергия, от която ние не трябва да се лишаваме“."
    },
    {
        "id":5,
        "qNum": 1,
        "type":"BEL_MultipleSubAnswersWrite",
        "year":2021,
        "session":"first",
        "question":"36. В свитъка за свободните отговори срещу съответната буква запишете правилните ФОРМИ на думите, поставени в скоби.",
        "answers":[
            {
                "label":"А) Членуване",
                // "type":"write",
                "question":"В (Народен) театър „Иван Вазов“ тържествено беше отбелязан (Международен) ден на театъра. Заради множеството спечелени награди (радост) на актьорите и на режисьорите беше голяма.",
                "correct":[
                    "Народния",
                    "Международният",
                    "радостта"
                ]
            },
            {
                "label":"Б) Местоимения",
                // "type":"write",
                "question":"Не казвай на (никой/никого) за какво говорихме с тебе днес. Мъжът, (който/когото) видях в коридора, приличаше на актьора, (чийто/чиито) снимки бяха на корицата на списанието. Когато говори, човек трябва да е напълно убеден в собствените (му/си) думи",
                "correct":[
                    "никого",
                    "когото",
                    "чиито",
                    "си"
                ]
            },
            {
                "label":"В) Учтива форма",
                // "type":"write",
                "question":"Уважаеми господин Тодоров, (отговорил) сте правилно на загадката, ще бъдете (награден) и сте (поканен) лично да вземете участие в следващото ни предаване.",
                "correct":[
                    "отговорили",
                    "награден",
                    "поканен"
                ]
            },
        ]
    },
    {
        "id":6,
        "qNum": 1,
        "type": "BEL_Connect",
        "year":2021,
        "session":"first",
        "options":[
            {
                "label":"40. Свържете името на героинята с името на автора, от чиято литературна творба е всяка от тях. В свитъка за свободните отговори срещу съответната буква запишете името на автора.",
                "answers":[
                    {
                        "label":"А) Тиха",
                        "correct":"Йордан Йовков"
                    },
                    {
                        "label":"Б) Ралица",
                        "correct":"Пенчо Славейков"
                    }
                ],
                "wrong":[
                    "Алеко Константинов",
                    "Елин Пелин"
                ]
            },
            {
                "label":"Свържете името на героя с литературната творба, от която е съответният герой. В свитъка за свободните отговори срещу съответната буква запишете заглавието на творбата.",
                "answers":[
                    {
                        "label":"В) чорбаджи Марко",
                        "correct":"„Под игото“"
                    },
                    {
                        "label":"Г) Станчо",
                        "correct":"„Задушница“"
                    }
                ],
                "wrong":[
                    "„Албена“",
                    "„Последна радост“"
                ]
            },
            {
                "label":"Свържете заглавието на всяка от творбите с нейния автор. В свитъка за свободните отговори срещу съответната буква запишете името на автора.",
                "answers":[
                    {
                        "label":"Д) „До моето първо либе“",
                        "correct":"Христо Ботев"
                    },
                    {
                        "label":"Е) „Миг“",
                        "correct":"Димчо Дебелянов"
                    }
                ],
                "wrong":[
                    "Иван Вазов",
                    "Пейо Яворов"
                ]
            },
        ]
    },
    {
        "id":7,
        "qNum": 1,
        "type": "BEL_WritePoints",
        "year":2021,
        "session":"first",
        "question":"38. В свитъка за свободните отговори запишете с ЦИТАТИ от текста ДВА ПРИМЕРА (С ПО ЕДИН СТИХ), които се отнасят до представянето на любимата като неземно създание.",
        "correct":[
            "Ще бъдеш в бяло – с вейка от маслина",
            "и като ангел в бяло облекло",
            "И тих ще пия техните лъчи",
            "ще пия светлина, лечебни глътки"
        ],
        "maxPoints":2
    }
]


function TestManager()
{
    const [score, setScore] = useState(0);
    const [checking, setChecking] = useState(false)

    function UpdateScore(added:number)
    {      
        let tmp = score;
        tmp += added;
        setScore(tmp);
    }

    function StartChecking(){
        setChecking(true);
        console.log(score)
    }

    return(<div>
        <p>{score}</p>
        {checking ? null : <button type="button" onClick={StartChecking}>checking</button>}
        {data.map(q => {
            switch (q.type) {
                case "BEL_SingleAnswer":
                    //q.wrong! as string[] is very dumb
                    return <BEL_SingleAnswer id={q.id} qNum={q.qNum} question={q.question!} wrong={q.wrong! as string[]} correct={q.correct! as string} UpdateScore={UpdateScore} checking={checking}></BEL_SingleAnswer>
                case "BEL_MultipleAnswers":
                    return <BEL_MultipleAnswers id={q.id} qNum={q.qNum} question={q.question!} wrong={q.wrong! as string[]} correct={q.correct! as string[]} UpdateScore={UpdateScore} checking={checking}></BEL_MultipleAnswers>
                case "BEL_MultipleSubAnswersSelect":
                    return <BEL_MultipleSubAnswersSelect data={q} UpdateScore={UpdateScore} checking={checking}></BEL_MultipleSubAnswersSelect>
                case "BEL_FindMissingPunctuation":
                    return <BEL_FindMissingPunctuation data={q} UpdateScore={UpdateScore} checking={checking}></BEL_FindMissingPunctuation>
                case "BEL_MultipleSubAnswersWrite":
                    return <BEL_MultipleSubAnswersWrite UpdateScore={UpdateScore} id={q.id} qNum={q.qNum} question={q.question!} answers={q.answers! as IBEL_IMultipleSubAnswersWriteAnswers[]} checking={checking}></BEL_MultipleSubAnswersWrite>
                case "BEL_Connect":
                    return <BEL_Connect id={q.id} qNum={q.qNum} type={q.type} options={q.options!} UpdateScore={UpdateScore} checking={checking}></BEL_Connect>
                case "BEL_WritePoints":
                    return <BEL_WritePoints id={q.id} qNum={q.qNum} question={q.question!} correct={q.correct as string[]} maxPoints={q.maxPoints!} UpdateScore={UpdateScore}></BEL_WritePoints>
                default:
                    console.error(`No component found for the following data. This should not be possible.`)
                    console.log(q)
                    break;
            }
        })}
    </div>)
}

export default TestManager;