import Link from "next/link";

export function NotFoundActions() {
  return (
    <div className="mt-7 flex justify-center">
      <Link href="/" prefetch={false} className="nf-btn">
        Back to Home
      </Link>
    </div>
  );
}
