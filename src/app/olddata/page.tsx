'use client'
import { useEffect, useState } from "react";

type Transaction = {
  _id: string,
  email: string,
  initAmount: number,
  transactions: {
    amount: string,
    description: string
  }[],
  createdAt: Date
};

export default function OldTrans() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(setTransactions);
  }, []);

  const toggleDetails = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <button
  onClick={() => window.location.href = '/home'}
  className="absolute top-6 left-6 text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
>
  ← Back
</button>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border border-gray-300 shadow-md text-black font-sans">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Transactions</h1>
        <ul className="space-y-4">
          {transactions.map(txn => {
            const totalSpent = txn.transactions.reduce((sum, t) => sum + (parseInt(t.amount) || 0), 0);
            const remaining = txn.initAmount - totalSpent;

            return (
              <li key={txn._id} className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white">
                <div 
                  onClick={() => toggleDetails(txn._id)} 
                  className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600 transition"
                >
                  Initial Amount: {txn.initAmount} Rs — {new Date(txn.createdAt).toLocaleDateString()}
                  <div className="text-sm font-normal text-gray-600">
                    Remaining: {remaining} Rs
                  </div>
                </div>

                {openId === txn._id && (
                  <div className="mt-3">
                    <h4 className="font-medium mb-2 text-gray-700">Transaction Details:</h4>
                    <ul className="space-y-1">
                      {txn.transactions.map((t, idx) => (
                        <li key={idx} className="text-sm text-gray-800">
                          <span className="font-semibold">{t.description}</span>: {t.amount} Rs
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
