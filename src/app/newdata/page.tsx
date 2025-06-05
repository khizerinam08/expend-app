// app/home/newdata/page.tsx

'use server'

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TransactionForm from "./TransactionForm";
import clientPromise from "@/db/mongodb";

export default async function NewTransPage() {
  const session = await getServerSession(authOptions);
  const client = await clientPromise;

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!client) {
    console.log("DB not connected.");
  }

  return <TransactionForm />;
}
