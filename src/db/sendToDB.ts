'use server'

import clientPromise from "./mongodb";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function submitTransactions(formData: FormData) {

    try{
        const client = await clientPromise;
  
    const db = client.db('TransactionsDB');
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect('/app/login');
  
    const remainingAmount = parseInt(formData.get("remainingAmount")?.toString() || "0");
    const initAmount = parseInt(formData.get("initAmount")?.toString() || "0");
    const amounts = formData.getAll("amount");
    const descriptions = formData.getAll("description");
  
    const transactions = amounts.map((amount, index) => ({
      amount: amount.toString(),
      description: descriptions[index]?.toString() || "",
    }));
  
    const doc = {
      email: session.user.email,
      initAmount,
      remainingAmount,
      transactions,
      createdAt: new Date(),
    };
  
    try {
      await db.collection('transactions').insertOne(doc);
    } catch (err) {
      console.log("Doc not sent:", err);
    }
  }catch(err){
    console.log("Error Message: ", err)
}


}
  