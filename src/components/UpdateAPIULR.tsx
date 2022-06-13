import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Update } from "./NotDrawable/ReduxReducers/APIURL"
import styles from "../css/main.module.css"

function UpdateAPIULR(){
    const dispatch = useDispatch()
    const APIURL = useSelector((state:any) => state.APIURL.URL)

    return(<div className={`${styles.CenterScreenColumn}`}>
        <p>Моля въведед нови URL</p>
        <input onChange={(e) => {dispatch(Update(e.target.value))}} value={APIURL}></input>
        <Link to={`/`}><p>Кликнете тук да се върнете на предишната страница</p></Link>
    </div>)
}

export default UpdateAPIULR;