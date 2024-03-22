import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>OnlyFrames</title>
        <meta name="description" content="onlyframes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <main className="px-5 py-[10rem]">
        <div className="flex flex-col gap-8 items-center justify-center text-center">
          <p className="text-lg font-primary text-teal-300">Ship crazy 🚀</p>
          <h1 className="text-6xl font-title tracking-tight font-semibold">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffd84b] from-[20%] to-[#b67e2b]">
              Built for new
              <br />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffd84b] from-[20%] to-[#b67e2b]">
              beginnings
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-primary text-neutral-300">
            OnlyFrames is a powerful, but simple, e-commerce platform that puts
            a wide selection of tools at your fingertips. Now you can sell the
            digital services you want—books, memberships, courses, and
            more—right to your audience on <b>Frames.</b>
          </p>
          <button className="w-fit mt-5 px-7 py-2 text-lg text-neutral-800 font-primary font-medium bg-teal-400 hover:bg-teal-500 border-2 border-neutral-100 hover:border-neutral-300 rounded-3xl">
            Start selling
          </button>
        </div>
      </main>
    </>
  );
}
