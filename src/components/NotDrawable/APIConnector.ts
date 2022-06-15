import IAPI, { APIData, IAPISelector, IAPISelectorData } from "../../interfaces/IAPI"
import {db} from "../../config/firebase"

export async function GetMaturaYearSession(year:number, session:number, APIURL:string)
{
    var result:IAPI = {} as IAPI

    if(year == null || session == null){
        result.status="ERROR"
        result.error="GetMaturaYearSession year and session not set. This should not be possible"

        return result;
    }

    return fetch(new URL(`/api_v1/YearAndSession/GetByYearAndSession?year=${year}&session=${session}`, APIURL).href).then(response => response.json())
    .then(data => {
        console.log("GetMaturaYearSession data from API...")

        let tmp:APIData[] = []


        data.map((d:any) => {
            tmp.push(d as APIData);
        })

        result.data = tmp;
        result.status = "OK"

        return result;
    }).catch(e => {
        console.error("API FAILED with this reason. Trying Firebase...", e);

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
    }) 
}

export async function GetAvailableYearsSessions(APIURL:string) {

    var result:IAPISelector = {} as IAPISelector

    return fetch(new URL("/api_v1/YearAndSession/GetSelectorData", APIURL).href).then(response => response.json())
    .then(data => {
        console.log("GetAvailableYearsSessions data from API...")
        let tmp:IAPISelectorData[] = [];


        data.map((d:any) => {
            tmp.push(d as IAPISelectorData);
        })

        result.data = tmp;
        result.status = "OK"

        return result;
    }).catch(e => {
        console.error("API FAILED with this reason. Trying Firebase...", e);

        return db.collection("selectorData2").get().then((data) => {
            console.log("Getting data from Firebase...")
            
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
    }) 
}