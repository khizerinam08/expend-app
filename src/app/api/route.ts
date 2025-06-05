import getFromDB from "@/db/getFromDB";

export async function GET(){
    const data = await getFromDB();
    return Response.json(data);
  }