export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold  text-center leading-tight text-white">
        <span >Next.js</span> with{" "}
        <span >Prisma</span> Tutorial
      </h1>
      <p className="mt-6 text-center text-lg text-gray-300 max-w-xl">
        Build modern full-stack applications with a clean architecture,
        PostgreSQL and Prisma ORM — Next.js 15+.
      </p>
    </main>
  );
}
