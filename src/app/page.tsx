"use client";

import { WalletConnect } from '@/components/WalletConnect'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Floating Pill Nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-4 py-2 bg-white/80 backdrop-blur-lg border border-stone-200 rounded-full shadow-lg">
        <a className="font-bold text-stone-900" href="/">HushVote</a>
        <ul className="hidden sm:flex gap-4 text-sm">
          <li><a href="/proposals" className="text-stone-600 hover:text-stone-900">Proposals</a></li>
          <li><a href="/admin" className="text-stone-600 hover:text-stone-900">Admin</a></li>
        </ul>
        <div className="flex items-center gap-2">
          <WalletConnect />
          <a className="px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:opacity-90" href="/proposal/1/vote">
            Vote →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-[60vh] flex items-center px-4 sm:px-16 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 mb-4">
            Confidential governance.<br/>
            <span className="text-orange-500">Verifiable outcomes.</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-xl mb-8">
            Vote privately using encrypted reputation. Zama FHEVM processes the rules and tally over encrypted data, revealing only the final outcome.
          </p>
          <div className="flex gap-4 items-center">
            <WalletConnect />
            <a className="px-6 py-3 border border-stone-300 text-stone-900 rounded-full font-medium hover:bg-stone-100" href="/admin">
              Create Proposal
            </a>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-16 py-16 max-w-6xl mx-auto">
        {/* Hero Feature */}
        <article className="col-span-1 sm:col-span-2 bg-orange-50 border border-orange-100 rounded-xl p-6">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-wider">01</span>
          <h2 className="text-xl font-bold text-stone-900 mt-2 mb-2">Zero-Knowledge Voting</h2>
          <p className="text-stone-600 text-sm">
            Your vote choice, reputation score, and voting influence remain encrypted throughout the entire process. Only the final outcome is revealed publicly.
          </p>
        </article>

        {/* Feature 1 */}
        <article className="bg-white border border-stone-200 rounded-xl p-6">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-wider">02</span>
          <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">Encrypted Rules</h3>
          <p className="text-stone-600 text-sm">
            Eligibility checking and vote weighting happen over encrypted data using Zama FHEVM.
          </p>
        </article>

        {/* Feature 2 */}
        <article className="bg-white border border-stone-200 rounded-xl p-6">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-wider">03</span>
          <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">Public Results</h3>
          <p className="text-stone-600 text-sm">
            Final outcomes are on-chain and verifiable by anyone, even though individual votes remain private.
          </p>
        </article>

        {/* Stat */}
        <article className="col-span-1 sm:col-span-2 bg-stone-900 border border-stone-900 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-bold text-white">Sepolia</span>
          <span className="text-sm text-stone-400 mt-1">Ethereum Testnet</span>
        </article>

        {/* Feature 3 */}
        <article className="row-span-2 bg-white border border-stone-200 rounded-xl p-6">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-wider">04</span>
          <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">Role Assignment</h3>
          <p className="text-stone-600 text-sm">
            Successful proposals automatically trigger public role assignments, enabling automated governance workflows.
          </p>
        </article>

        {/* Feature 4 */}
        <article className="bg-white border border-stone-200 rounded-xl p-6">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-wider">05</span>
          <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">Reputation Weight</h3>
          <p className="text-stone-600 text-sm">
            Voting influence based on encrypted contribution scores, not token holdings.
          </p>
        </article>

        {/* Feature 5 */}
        <article className="bg-white border border-stone-200 rounded-xl p-6">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-wider">06</span>
          <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">DAO Integration</h3>
          <p className="text-stone-600 text-sm">
            Built for communities, DAOs, and teams requiring confidential decision-making.
          </p>
        </article>
      </section>

      {/* CTA Strip */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-16 py-16 max-w-3xl mx-auto border-t border-stone-200">
        <p className="text-2xl font-bold text-stone-900">Ready to vote confidentially?</p>
        <a className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:opacity-90" href="/proposal/1/vote">
          Start Voting →
        </a>
      </section>

      {/* Statement Footer */}
      <footer className="px-4 sm:px-16 py-16 max-w-3xl mx-auto">
        <p className="text-3xl sm:text-5xl font-bold text-stone-900 mb-4">Governance that respects privacy.</p>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-stone-200 gap-2">
          <span className="font-bold text-stone-900">HushVote</span>
          <span className="text-sm text-stone-600">© 2026 · Zama Developer Program</span>
        </div>
      </footer>
    </main>
  );
}
