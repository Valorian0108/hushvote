export default function ProposalPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-orange-500 hover:opacity-80 mb-8 inline-block">← Back to Home</a>
        
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Proposal #{params.id}</h1>
        <p className="text-lg text-stone-600 mb-8">Approve Community Moderator</p>
        
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-2">Description</h2>
          <p className="text-stone-600">Vote to approve Alice as the new community moderator for the governance channel.</p>
        </div>
        
        <a href={`/proposal/${params.id}/vote`} className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:opacity-90">
          Vote on This Proposal →
        </a>
      </div>
    </main>
  );
}
