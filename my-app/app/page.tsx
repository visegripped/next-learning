// import Image from "next/image";
import Solitaire from "./components/solitaire/Solitaire";

export default function Home() {
  return (
    <main className=" p-8">
      <div className="md:hidden">
        thank you for your interest, but this version of solitaire is only
        available at tablet+
      </div>
      <div className="hidden md:block">
        <section className="flex">
          <h1 className="grow">Welcome to Solitaire</h1>
          {/* https://codesandbox.io/p/sandbox/responsive-css-sprite-zjyrr?file=%2Fsrc%2FApp.js */}

          {/* <div className='flex-none'><DealButton /></div> */}
        </section>
        {/* 
        <section className="mt-20 bg-slate-800 grid grid-cols-7 gap-4">
          <div className="bg-slate-600 flex">
          <svg viewBox="0 0 5 7" style={{
            backgroundSize: '1300% 400%',
            backgroundPosition: '0% 0% ',
            backgroundImage: "url('card-sprite.png')",
            height: 'auto',
            width: '100%',
            // aspectRatio: '3/6',
            overflow: 'hidden',
            backgroundRepeat: 'no-repeat',
            boxSizing: 'border-box',
            // objectFit: 'none',
            // objectPosition: '10% 10%',
            // transformOrigin: "top left",
            // transform: 'scale(110%)',
          }}></svg>
          </div>
          <div className="bg-slate-600 flex"></div>
          <div className="bg-slate-600 flex"></div>
          <div className="bg-slate-600 flex"></div>
          <div className="bg-slate-600 flex"></div>
          </section> */}

        <Solitaire />

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
