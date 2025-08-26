"use client";
import Link from "next/link";

const NotFound = () => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">404 — Page not found</h1>
        <p className="text-muted-foreground">
          No match for <code>{pathname}</code>
        </p>
        <Link href="/" className="underline">Go home</Link>
      </div>
    </div>
  );
};

export default NotFound;
