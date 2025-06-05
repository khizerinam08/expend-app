'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClickCalc = () => {
    router.push('/newdata');
  };
  const handleClickOld = () => {
    router.push('/olddata');
  };

  if (status === "loading") 
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col px-6 sm:px-12 py-16">
      {/* Header */}
      <header className="flex justify-between items-center max-w-5xl mx-auto mb-20 gap-100">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight select-none">
          ProtoCalc.
        </h1>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300"
          >
            Sign In
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-grow justify-center max-w-3xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-12 text-gray-900">
          Calculate Your <br /> Expenditures
        </h2>

        {session ? (
          <div className="flex flex-col gap-8 sm:gap-10 items-center">
            <button
              onClick={handleClickCalc}
              className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-semibold rounded-full py-4 px-12 shadow-lg transition duration-300"
            >
              + Make New Calculation
            </button>

            <button
              onClick={handleClickOld}
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-semibold rounded-full py-4 px-12 shadow-lg transition duration-300"
            >
              See Old Calculations
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full py-4 px-16 shadow-lg transition duration-300 mx-auto"
          >
            Calculate Yours →
          </button>
        )}
      </main>

      <footer className="mt-20 text-center text-sm text-gray-500 select-none">
        © {new Date().getFullYear()} ProtoCalc. All rights reserved.
      </footer>
    </div>
  );
}
