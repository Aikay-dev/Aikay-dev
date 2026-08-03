import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label mb-6">404</p>
      <h1 className="text-display-l font-display">
        That page isn&apos;t
        <br />
        here.
      </h1>
      <p className="measure mt-6 text-lede text-ink-soft">
        It may have moved, or it may never have existed. The work is all still where it should be.
      </p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-ink-muted">
        <Link href="/" className="link-underline">
          Home →
        </Link>
        <Link href="/work" className="link-underline">
          See the work →
        </Link>
        <Link href="/contact" className="link-underline">
          Get in touch →
        </Link>
      </div>
    </section>
  );
}
