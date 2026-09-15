"use client";
export default function BlogError({ reset }: { reset: () => void }) {
  return (
    <section className="shell home-section">
      <h1 className="text-3xl font-semibold">
        The blog is temporarily unavailable
      </h1>
      <p className="my-5">Please try again in a moment.</p>
      <button className="button-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
