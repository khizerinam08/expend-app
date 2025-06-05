"use client";

import { useState } from "react";
import { submitTransactions } from "@/db/sendToDB";

type Transaction = {
  amount: string;
  description: string;
};

export default function TransactionForm() {
  const [initAmount, setInitAmount] = useState(0);
  const [ogAmount, setOgAmount] = useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { amount: "", description: "" },
  ]);

  const handleChange = (index: number, field: keyof Transaction, value: string) => {
    const newTransactions = [...transactions];
    newTransactions[index][field] = value;
    setTransactions(newTransactions);

    const totalSpent = newTransactions.reduce((sum, tnx) => {
      const amount = parseInt(tnx.amount) || 0;
      return sum + amount;
    }, 0);

    setInitAmount(ogAmount - totalSpent);
  };

  const addEntry = () => {

    if (transactions.length >= 20) {
  
      alert("You can't add more than 20 transactions.");
      return;
    }
    setTransactions([...transactions, { amount: "", description: "" }]);
  };

  const removeEntry = (indexToRemove: number) => {
    const newTransactions = transactions.filter((_, index) => index !== indexToRemove);
    setTransactions(newTransactions);

    const totalSpent = newTransactions.reduce((sum, tnx) => {
      return sum + (parseInt(tnx.amount) || 0);
    }, 0);

    setInitAmount(ogAmount - totalSpent);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await submitTransactions(formData);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <button
  onClick={() => window.location.href = '/home'}
  className="absolute top-6 left-6 text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
>
  ← Back
</button>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-md text-black font-sans"
      >
        <label
          htmlFor="initAmount"
          className="block mb-2 font-semibold text-lg"
        >
          Enter Initial Amount
        </label>
        <input
          id="initAmount"
          type="number"
          min="1"
          max="999999"
          name="initAmount"
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0;
            setOgAmount(value);
            setInitAmount(value);
            setTransactions(prev =>
              prev.map(t => ({
                ...t,
                amount: "0"
              }))
            );
          }}
          
          value={ogAmount > 0 ? ogAmount : ""}
          className="w-full p-3 mb-6 border border-gray-400 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {transactions.map((tnx, index) => (
          <div
            key={index}
            className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4 relative"
          >
            <button
              type="button"
              onClick={() => removeEntry(index)}
              aria-label={`Remove transaction ${index + 1}`}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg select-none"
            >
              ×
            </button>

            <div className="mb-4">
              <label
                htmlFor={`amount-${index}`}
                className="block mb-1 font-semibold text-sm"
              >
                Amount
              </label>
              <input
                id={`amount-${index}`}
                name="amount"
                required
                min="1"
                max="999999"
                type="number"
                value={tnx.amount}
                onChange={(e) => {
                  handleChange(index, "amount", e.target.value);
                  
                }}
                className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor={`desc-${index}`}
                className="block mb-1 font-semibold text-sm"
              >
                Description
              </label>
              <input
                id={`desc-${index}`}
                name="description"
                required
                type="text"
                placeholder="Description"
                value={tnx.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEntry}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold mb-6 shadow-md transition"
        >
          + Add Transaction
        </button>
        <input type="hidden" name="remainingAmount" value={initAmount} />


        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-4 font-bold text-lg shadow-md transition"
        >
          Submit
        </button>

        {ogAmount > 0 && (
          <div className="mt-6 text-center text-lg font-medium text-gray-800">
            Remaining Amount: <span className="font-bold">{initAmount}</span>
          </div>
          
        )}
      </form>
    </div>
  );
}
