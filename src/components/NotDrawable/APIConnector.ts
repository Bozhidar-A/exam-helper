import IAPI, { APIData, IAPISelector, IAPISelectorData } from "../../interfaces/IAPI"
import {db} from "../../config/firebase"

export async function GetMaturaYearSession(year:number, session:number)
{
    var result:IAPI = {} as IAPI
 
    return db.collection("maturaData3").where("year", "==", year)
        .where("session", "==", session)
        .get().then(data => {
            let tmp:APIData[] = []
            data.docs.map(doc => {
                tmp.push(doc.data() as APIData);
            })

            result.data = tmp;
            result.status= "OK"

            return result;
        }).catch(e => {
            result.status="ERROR"
            result.error = e

            return result;
        })
}

export async function GetAvailableYearsSessions() {
    var result:IAPISelector = {} as IAPISelector

    return db.collection("selectorData2").get().then((data) => {
        let tmp:IAPISelectorData[] = [];

        data.docs.map(doc => {
            tmp.push(doc.data() as IAPISelectorData);
        });

        result.data = tmp;
        result.status = "OK"

        return result;
    }).catch(e => {
        result.status="ERROR"
        result.error = e

        return result;
    })
}