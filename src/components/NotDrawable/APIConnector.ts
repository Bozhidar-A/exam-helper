import IAPI, { APIData } from "../../interfaces/IAPI"
import {db} from "../../config/firebase"

export async function GetMaturaYearSession(year:number, session:number)
{
    var result:IAPI = {} as IAPI
 
    try{
        const query = await db.collection("maturasData").where("year", "==", year)
        .where("session", "==", session)
        .get()    

        if(query.empty){
            result.status="ERROR"
            result.error = "inavalid query paramaters"

            return result
        }

        result.status= "OK"
        let tmp:APIData[] = []
        query.forEach(doc => {
            tmp.push(doc.data() as APIData)
        })
        result.data = tmp;

        return result;

    } catch(error:any){
        result.status="ERROR"
        result.error = error

        return result;
    }
   
    // if(query.empty){
    //     data.status = "ERROR"
    //     data.data = "wrong paramaters"

    //     res.forEach(doc => {
    //         result.data.push(doc.data() as APIData)
    //     })
    // }else{
    //     data.status = "OK"
    //     data.data = query.docs
    // }
}