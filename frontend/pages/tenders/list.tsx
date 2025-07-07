import { useEffect, useState } from 'react';

export default function TenderList() {
  const [tenders, setTenders] = useState([]);
  const [page, setPage] = useState(1);
  const email = typeof window !== 'undefined' ? localStorage.getItem('email') : '';

  useEffect(() => {
    if (!email) return;
    fetch(`http://localhost:5000/api/tender/company/${email}?page=${page}`)
      .then(res => res.json())
      .then(data => setTenders(data.tenders || []));
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">My Tenders</h1>

      {tenders.length === 0 && <p className="text-gray-600">No tenders found.</p>}

      {tenders.map((tender, i) => (
        <div key={i} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">{tender.title}</h2>
          <p>{tender.description}</p>
          <p className="text-sm text-gray-500">
            Deadline: {tender.deadline} | Budget: ₹{tender.budget}
          </p>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
