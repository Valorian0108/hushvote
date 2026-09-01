export default function AdminPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 px-4 sm:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-orange-500 hover:opacity-80 mb-8 inline-block">← Back to Home</a>
        
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Admin Dashboard</h1>
        <p className="text-lg text-stone-600 mb-8">Create and manage governance proposals</p>
        
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Create New Proposal</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Proposal title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea 
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={4}
                placeholder="Proposal description"
              />
            </div>
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:opacity-90">
              Create Proposal
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Recent Proposals</h2>
          <p className="text-stone-600">No proposals created yet.</p>
        </div>
      </div>
    </main>
  );
}
