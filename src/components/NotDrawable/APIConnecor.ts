export async function GetMaturaYearSession(year:number, session:number)
{
    var data = await fetch("http://localhost:9000/GetMaturaYearSession?" + new URLSearchParams({
        year: year.toString(),
        session: session.toString()
    })).then((data:any) => {
        return data.json()
    }).catch((error:any) => {
        console.error(error)
    })
   
    return data
}