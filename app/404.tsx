import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div id="not-found-container" className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 id="not-found-heading" className="text-9xl font-bold text-secondary">404</h1>
      <h2 id="not-found-subheading" className="text-3xl mt-4 mb-2">Page Not Found</h2>
      <p id="not-found-message" className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" id="not-found-home-link" className="px-6 py-3 bg-secondary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">
        Go back home
      </Link>
    </div>
  );
}


