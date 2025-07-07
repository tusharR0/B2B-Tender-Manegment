import { useRouter } from 'next/router';

export default function ApplicationWorkflow() {
  const router = useRouter();

  const navItems = [
    { label: '📝 Submit Proposal', href: '/applications/submit' },
    { label: '📂 View Applications', href: '/applications/view' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
      
      {/* LEFT CONTENT */}
      <div className="lg:w-1/2 w-full space-y-8 animate-slide-in-left">
        <h1 className="text-4xl font-extrabold text-teal-700">
           Application Workflow
        </h1>
        <p className="text-gray-700 text-lg">
          Easily manage your proposal submissions and keep track of all applications related to tenders.
        </p>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => router.push(item.href)}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-lg text-center text-teal-700 font-semibold hover:text-teal-900 transition transform hover:scale-105"
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* KEY FEATURES */}
        <div className="bg-white p-6 rounded-xl shadow-xl mt-8 max-w-xl">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4"> Key Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Submit proposals to active tenders</li>
            <li>Track submission status (Pending/Accepted)</li>
            <li>See all proposals submitted by your company</li>
            <li>Quick view of deadlines and budgets</li>
          </ul>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="lg:w-1/2 w-full flex justify-center animate-zoom-in">
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hover:shadow-teal-200 transition transform hover:scale-105 max-w-md">
          <img
            src="\Business challenge-bro.png"
            alt="Application Illustration"
            className="rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}
