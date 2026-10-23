import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grain bg-cream">
      <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="eyebrow text-blue-700">Page not found</p>
        <h1 className="text-h1 mt-4 max-w-2xl font-medium text-navy-900">
          This page has moved, but <span className="italic text-blue-600">we&apos;re still here.</span>
        </h1>
        <p className="text-lead mt-5 max-w-xl text-ink-soft">
          Some pages were combined in our redesign. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/programs" variant="outline">
            Signature Programs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
