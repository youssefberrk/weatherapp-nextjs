import SearchBar from "@/Components/SearchBar";


export default function Home() {
return (
<main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-800">
<h1 className="text-4xl font-extrabold mb-6">Weather App</h1>
<p className="mb-6 text-gray-600">Search any city to see current weather and a short forecast.</p>
<SearchBar />
</main>
);
}