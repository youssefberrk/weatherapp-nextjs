'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z, ZodError } from 'zod';

const CitySchema = z.string().min(1, 'City name cannot be empty').regex(/^[a-zA-Z\s]+$/,'City name must contain only letters' ).trim();

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();

   try {
      // ✅ Validate input
      const city = CitySchema.parse(q.trim());
      setError('');
      router.push(`/weather/${encodeURIComponent(city)}`);
    } catch (err: unknown) {
      setError(err instanceof ZodError ? err.issues[0].message : 'An error occurred');
    }

  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded"
          placeholder="Enter city"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
