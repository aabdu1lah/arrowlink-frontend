"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string>("...");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(() => setStatus("Backend not reachable"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">ArrowConnect</h1>
      <p className="mt-4">{status}</p>
    </main>
  );
}
