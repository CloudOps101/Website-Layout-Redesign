// Thin banner shown only on the design-review build. Remove before launch.
export function PreviewBar() {
  return (
    <div className="bg-gold-500 text-navy-950">
      <p className="container-site py-1.5 text-center text-[0.8125rem] font-semibold leading-snug">
        Design preview for review. Content and photos are subject to your approval.
      </p>
    </div>
  );
}
