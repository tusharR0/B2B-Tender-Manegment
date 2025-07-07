import { useState, useEffect } from 'react';

export default function ViewApplications() {
  const [tenders, setTenders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedTender, setSelectedTender] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/tender')
      .then(res => res.json())
      .then(data => setTenders(data.tenders));
  }, []);

  const loadApplications = async (tender_id: string) => {
    const res = await fetch(`http://localhost:5000/api/application/${tender_id}`);
    const data = await res.json();
    setApplications(data.applications || []);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">View Applications</h2>

      <label htmlFor="tender-select" className="block mb-2 font-medium">
        Select Tender
      </label>
      <select
        id="tender-select"
        className="w-full border px-4 py-2 mb-6"
        value={selectedTender}
        onChange={(e) => {
          setSelectedTender(e.target.value);
          loadApplications(e.target.value);
        }}
      >
        <option value="">Select Tender</option>
        {tenders.map(t => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      {applications.map((app, idx) => (
        <div key={idx} className="border p-4 mb-4 rounded">
          <p><strong>Email:</strong> {app.company_email}</p>
          <p><strong>Proposal:</strong> {app.proposal}</p>
          <p className="text-sm text-gray-500">Submitted: {app.created_at}</p>
        </div>
      ))}
    </div>
  );
}
