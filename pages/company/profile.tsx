import { useEffect, useState } from 'react';
import { Building2, PencilLine, UploadCloud, FileEdit } from 'lucide-react';

export default function CompanyProfile() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    industry: '',
    description: '',
    logo_url: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load email and profile data
  useEffect(() => {
    const email = localStorage.getItem('email');

    if (!email) {
      alert("No email found in localStorage. Please login again.");
      return;
    }

    setForm((prev) => ({ ...prev, email }));

    fetch(`http://localhost:5000/api/company/profile/${email}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) setForm((prev) => ({ ...prev, ...data }));
      })
      .catch(() => alert("Failed to load profile."));
  }, []);

  // Upload logo to Supabase
  const uploadLogo = async () => {
    if (!logoFile) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', logoFile);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/upload/logo', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setForm((prev) => ({ ...prev, logo_url: data.url }));
      alert("Logo uploaded!");
    } catch {
      alert("Error uploading logo");
    } finally {
      setLoading(false);
    }
  };

  // Save profile to DB
  const saveProfile = async () => {
    if (!form.email) return alert("Email is required");

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/company/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);
    } catch {
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 bg-white rounded-3xl shadow-lg p-10 mt-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-green-700">Build Your Company Profile</h1>
          <p className="text-gray-600 text-lg">
            Show your brand identity and attract the right B2B opportunities.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-green-500 mt-1" />
              <span>Display company name & industry</span>
            </div>
            <div className="flex items-start gap-3">
              <PencilLine className="w-5 h-5 text-green-500 mt-1" />
              <span>Edit your mission and services</span>
            </div>
            <div className="flex items-start gap-3">
              <UploadCloud className="w-5 h-5 text-green-500 mt-1" />
              <span>Upload your brand logo</span>
            </div>
            <div className="flex items-start gap-3">
              <FileEdit className="w-5 h-5 text-green-500 mt-1" />
              <span>Save and update anytime</span>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/Business solution-bro.png"
            alt="Company Setup Illustration"
            className="max-w-md w-full mx-auto drop-shadow-xl"
          />
        </div>
      </div>

      {/* Profile Form */}
      <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Your Profile Details</h2>

        <label className="block mb-1 text-gray-700 font-medium">Email</label>
        <input
          className="w-full border px-4 py-2 mb-4 bg-gray-100 cursor-not-allowed"
          value={form.email}
          disabled
          title="Company email"
          placeholder="Enter your company email"
        />

        <label className="block mb-1 text-gray-700 font-medium">Company Name</label>
        <input
          className="w-full border px-4 py-2 mb-4"
          placeholder="e.g., Acme Pvt Ltd"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="block mb-1 text-gray-700 font-medium">Industry</label>
        <input
          className="w-full border px-4 py-2 mb-4"
          placeholder="e.g., Manufacturing"
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
        />

        <label className="block mb-1 text-gray-700 font-medium">Company Description</label>
        <textarea
          className="w-full border px-4 py-2 mb-4"
          placeholder="Brief about your services or values"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label className="block mb-1 text-gray-700 font-medium">Upload Logo</label>
        <input
          type="file"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
          className="mb-2"
          title="Upload your company logo"
          placeholder="Choose logo file"
        />
        <button
          onClick={uploadLogo}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Logo"}
        </button>

        {form.logo_url && (
          <div className="mb-4">
            <img
              src={form.logo_url}
              alt="Company Logo"
              className="w-24 h-24 object-cover rounded-full border-4 border-green-200 shadow"
            />
          </div>
        )}

        <button
          onClick={saveProfile}
          className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
