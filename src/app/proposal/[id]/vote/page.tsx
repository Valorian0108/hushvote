"use client";

import { useState } from "react";

export default function VotePage({ params }: { params: { id: string } }) {
  const [selectedVote, setSelectedVote] = useState<"yes" | "no" | "abstain" | null>(null);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <a href={`/proposal/${params.id}`} className="text-orange-500 hover:opacity-80 mb-8 inline-block">← Back to Proposal</a>
        
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Cast Your Vote</h1>
        <p className="text-lg text-stone-600 mb-8">Proposal #{params.id}: Approve Community Moderator</p>
        
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-900 mb-2">🔒 Your Eligibility is Checked Privately</h2>
          <p className="text-stone-600 text-sm">
            The community's participation rules can be applied without publishing your reputation score
            or voting influence. Your vote will be encrypted before submission.
          </p>
        </div>
        
        <div className="grid gap-4 mb-8">
          <button
            onClick={() => setSelectedVote("yes")}
            className={`p-6 border-2 rounded-xl transition-colors ${
              selectedVote === "yes"
                ? "border-green-500 bg-green-50"
                : "border-stone-200 hover:border-green-500"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 ${
                selectedVote === "yes"
                  ? "border-green-500 bg-green-500"
                  : "border-stone-400"
              }`} />
              <div>
                <h3 className="text-lg font-medium text-stone-900">Yes</h3>
                <p className="text-sm text-stone-600">I approve this proposal</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedVote("no")}
            className={`p-6 border-2 rounded-xl transition-colors ${
              selectedVote === "no"
                ? "border-red-500 bg-red-50"
                : "border-stone-200 hover:border-red-500"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 ${
                selectedVote === "no"
                  ? "border-red-500 bg-red-500"
                  : "border-stone-400"
              }`} />
              <div>
                <h3 className="text-lg font-medium text-stone-900">No</h3>
                <p className="text-sm text-stone-600">I do not approve this proposal</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedVote("abstain")}
            className={`p-6 border-2 rounded-xl transition-colors ${
              selectedVote === "abstain"
                ? "border-yellow-500 bg-yellow-50"
                : "border-stone-200 hover:border-yellow-500"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 ${
                selectedVote === "abstain"
                  ? "border-yellow-500 bg-yellow-500"
                  : "border-stone-400"
              }`} />
              <div>
                <h3 className="text-lg font-medium text-stone-900">Abstain</h3>
                <p className="text-sm text-stone-600">I choose not to vote on this proposal</p>
              </div>
            </div>
          </button>
        </div>

        <button
          disabled={!selectedVote}
          className={`w-full px-6 py-4 rounded-xl font-medium text-lg transition-opacity ${
            selectedVote
              ? "bg-orange-500 text-white hover:opacity-90"
              : "bg-stone-200 text-stone-400 cursor-not-allowed"
          }`}
        >
          {selectedVote ? "Submit Encrypted Vote" : "Select a vote option"}
        </button>
      </div>
    </main>
  );
}
