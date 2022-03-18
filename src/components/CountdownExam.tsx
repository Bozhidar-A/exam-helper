import Countdown from "react-countdown";
import styles from "../css/main.module.css"

const renderer = ({ hours, minutes, seconds, completed }:any) => {
    if (completed) {
      // Render a completed state
      console.log("done timer")
      return <p>Timer done...</p>
    } else {
      // Render a countdown
      if(hours === 0 && minutes < 15){
        return <span className={styles.background_red}>{minutes}:{seconds}</span>;
      }
      if(hours === 0){
        return <span>{minutes}:{seconds}</span>;
      }
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

function CountdownExam(props:any){
    if(props.module === 3){
        return(<Countdown date={Date.now() + props.min120} renderer={renderer} zeroPadTime={3}></Countdown>)
    }else{
        return(<Countdown date={Date.now() + props.min60} renderer={renderer} zeroPadTime={3}></Countdown>)
    }
}

export default CountdownExam;