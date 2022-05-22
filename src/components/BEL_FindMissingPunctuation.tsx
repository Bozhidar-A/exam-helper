import React from "react";
import { useState } from "react";
import styles from "../css/main.module.css"
import PointsFromQuestion from "./PointsFromQuestion";
const Diff = require('diff');

function BEL_FindMissingPunctuation(props:any){

    const [inputText, setInputText] = useState("");
    const [givenPts, setGivenPts] = useState(0);

    function HandleChange(text:string)
    {
        setInputText(text);

        let pts = 0;
        var diff = Diff.diffChars(text, props.data.wrong)
        //this is kind of bad, but it returns multiple objects and works
        var diffChars:string[] = []

        diff.map((ch:any)=> {
            if(ch.count === 1){
                //this is the bad part
                //it returns multiple objects but the ones we want are with count of 1
                //so we get them and push the chars to a new array to use .includes
               diffChars.push(ch.value);
            }
        })

        props.data.punctuation.map((pu:any) => {
            //if the diff array of chars contains one of the correct chars
            if(diffChars.includes(pu.symbol)){
                pts++;
                //update points
                var index = diffChars.indexOf(pu.symbol);
                diffChars.splice(index, 1);
                //get the index of that element and remove it
                //next iteration we wont look for it
            }
        })

        props.UpdateScore(-Math.abs(givenPts));

        if(pts !== 0)//this is needed or setState refused to work properly and will ignore the calls in ExamManager
        {
            props.UpdateScore(pts);
        }

        setGivenPts(pts);
    }

    function FormatCorrectText() {
        var tmp:string = props.data.wrong;

        props.data.punctuation.map((pu:any) => {
            tmp = tmp.substring(0, pu.index) + `<b>${pu.symbol}</b>` + tmp.substring(pu.index)
        })

        return tmp
    }

    function CheckingDisplayScore(){
        var score:number = 0;

         var diff = Diff.diffChars(inputText, props.data.wrong)
        var diffChars:string[] = []

        diff.map((ch:any)=> {
            if(ch.count === 1){
               diffChars.push(ch.value);
            }
        })

        props.data.punctuation.map((pu:any) => {
            if(diffChars.includes(pu.symbol)){
                score++;
                var index = diffChars.indexOf(pu.symbol);
                diffChars.splice(index, 1);
            }
        })

        return score;
    }

    return(<div className={styles.EveryExamComponent}>
        {givenPts}
        <p>{props.data.question}</p>
        <p>Моля използвайте „ и “</p>
        <br />
        <pre dangerouslySetInnerHTML={{ __html: props.data.wrong.replace("\n", "<br/>") }}></pre>
        <br />
        <textarea className={styles.TextareaMaxWidth} disabled={props.checking} onChange={e => {HandleChange(e.target.value)}} defaultValue={props.data.wrong.replace("\n", "<br/>")}></textarea>
        {/* I should disable pasting here as you have to rewrite the whole thing on the exam, but i won't */}
        {props.checking && 
            <div>
                <pre className={`bg-lime-500`} dangerouslySetInnerHTML={{ __html: FormatCorrectText() }}></pre>
                <PointsFromQuestion points={CheckingDisplayScore()}></PointsFromQuestion>
            </div>}
    </div>)
}

const BEL_FindMissingPunctuationMemorized = React.memo(BEL_FindMissingPunctuation, (prevProps, nextProps) => {
    if (prevProps.checking === nextProps.checking) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
})

export default BEL_FindMissingPunctuationMemorized;
