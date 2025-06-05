'use server'

import clientPromise from "./mongodb"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function getFromDB() {
    try {
        const client = await clientPromise;
        const session = await getServerSession(authOptions);

        if (!session) {
            redirect('/home');
        }

        const db = client.db('TransactionsDB');

        // Query to find transactions for the logged-in user's email
        const transactions = await db.collection('transactions').find({
            email: session?.user?.email
        }).toArray();

        return transactions;
    } catch (err) {
        console.log("Error fetching: ", err);
        return [];
    }
}
