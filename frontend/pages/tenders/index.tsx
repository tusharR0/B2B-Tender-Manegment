import { useRouter } from 'next/router';

export default function TenderDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* LEFT CONTENT */}
      <div className="lg:w-1/2 w-full space-y-8 animate-slide-in-left">
        <h1 className="text-4xl font-extrabold text-green-700">
          📑 Tender Management Portal
        </h1>
        <p className="text-gray-700 text-lg">
          Easily manage your business tenders, create new listings, and track proposals — all in one place.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push('/tenders/create')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
          >
            ➕ Create New Tender
          </button>
          <button
            onClick={() => router.push('/tenders/list')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition transform hover:scale-105"
          >
            📄 View All Tenders
          </button>
        </div>

        {/* KEY FEATURES */}
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🔧 Key Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Create tenders with deadlines & budgets</li>
            <li>Manage and edit active tenders</li>
            <li>Track proposal submissions from applicants</li>
            <li>Company-specific tender history</li>
            <li>Instant search & filter by status</li>
          </ul>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="lg:w-1/2 w-full flex justify-center animate-zoom-in">
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hover:shadow-green-200 transition transform hover:scale-105 max-w-md">
          <img
            src="/collab-bro.png"
            alt="Tender Illustration"
            className="rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}
