import { NotFoundActions } from "@/features/not-found/components/NotFoundActions";
import "@/styles/components/not_found.css";

export function NotFoundPage() {
  return (
    <main className="nf-page relative isolate min-h-[100svh] overflow-hidden bg-[var(--ui-surface-page)] text-[var(--ui-text-primary)]">
      <span className="nf-orb nf-orb--one" aria-hidden="true" />
      <span className="nf-orb nf-orb--two" aria-hidden="true" />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-5xl items-center justify-center p-6 sm:p-10">
        <section className="nf-panel w-full max-w-3xl rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="nf-code">404</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Not Found</h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-8 text-[var(--ui-text-muted)] sm:text-lg">
            The resource you are looking for does not exist or may have been moved.
          </p>
          <NotFoundActions />
        </section>
      </div>
    </main>
  );
}
