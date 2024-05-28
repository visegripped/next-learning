// import Image from "next/image";
import Solitaire from "./components/solitaire/Solitaire";
import { shuffleArray, buildFullDeck } from "@/app/utilities";
// import winnableDeck from "../tests/winnable-shuffled-deck.json";

export default function Home() {
  const fullDeck = buildFullDeck();
  const shuffledDeck = shuffleArray(fullDeck);
  return (
    <main className=" p-8">
      <div className="md:hidden">
        thank you for your interest, but this version of solitaire is only
        available at tablet+
      </div>
      <div className="hidden md:block">
        <section className="flex">
          <h1 className="grow">Welcome to Solitaire</h1>
          {/* <div className='flex-none'><DealButton /></div> */}
        </section>

        <Solitaire shuffledDeck={shuffledDeck} />

        {/* <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  );
}
