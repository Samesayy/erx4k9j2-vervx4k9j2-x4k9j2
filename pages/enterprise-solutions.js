// pages/enterprise-solutions.js

import Head from 'next/head';
import Link from 'next/link';

export default function EnterpriseSolutionsPage() {
  return (
    <>
      <Head>
        <title>Enterprise Solutions | Verve99</title>
      </Head>

      <div className="min-h-screen bg-primary-light flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-semibold text-primary-dark mb-4">
          Enterprise Solutions
        </h1>
        <p className="text-medium-gray mb-8">
          This is a placeholder page. We&apos;re building out our full suite of enterprise‐grade solutions. Stay tuned!
        </p>

        <Link href="/">
          {/* Notice: In Next.js 13+, always use <Link href="/"><span> or <div> 
              or remove the <a> tag to avoid the “invalid <Link> with <a> child” error. */}
          <span className="inline-block px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition">
            ← Back to Home
          </span>
        </Link>
      </div>
    </>
  );
}
