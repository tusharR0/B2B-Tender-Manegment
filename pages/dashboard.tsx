import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FilePlus,
  SendHorizonal,
  Building2,
  Search,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    if (!token || !storedEmail) {
      router.push('/auth/login');
      return;
    }

    setEmail(storedEmail);

    fetch(`http://localhost:5000/api/company/profile/${storedEmail}`)
      .then(res => res.status === 200 ? res.json() : null)
      .then(data => {
        if (data) setCompany(data);
      })
      .catch(() => alert('Failed to load company profile'));
  }, []);

  const sections = [
    { label: 'Company Profile', href: '/company/profile' },
    { label: 'Tender Management', href: '/tenders' },
    { label: 'Application Workflow', href: '/applications' },
  ];

  const features = [
    {
      icon: <FilePlus className="w-6 h-6 text-emerald-600" />,
      title: 'Manage Tenders',
      desc: 'Create, edit, and manage all your tenders from a single dashboard.',
    },
    {
      icon: <SendHorizonal className="w-6 h-6 text-emerald-600" />,
      title: 'Submit Proposals',
      desc: 'Submit your proposals easily and track their progress.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-emerald-600" />,
      title: 'Company Profiles',
      desc: 'Build a strong company profile with branding and services.',
    },
    {
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      title: 'Search Companies',
      desc: 'Discover companies by name, industry, and services.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
      title: 'Analytics Dashboard',
      desc: 'Track proposal submissions and tender statistics.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Secure Platform',
      desc: 'All data is protected with secure authentication.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-800">
      {/* NAVBAR */}
      <nav className="bg-white shadow-lg px-8 py-4 flex justify-between items-center sticky top-0 z-50 rounded-b-xl">
        <div className="text-2xl font-bold text-green-600">B2B Tender Dashboard</div>
        <div className="flex items-center gap-6 text-sm font-medium">
          {sections.map((item, idx) => (
            <button
              key={idx}
              onClick={() => router.push(item.href)}
              className="text-white-700 hover:underline hover:text-green-900 transition"
            >
              {item.label}
            </button>
          ))}
          <span className="hidden sm:inline text-gray-600">Hi, <strong>{email}</strong></span>
          <button
            onClick={() => {
              localStorage.clear();
              router.push('/');
            }}
            className="bg-red-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg shadow-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="bg-white px-6 lg:px-20 py-16 shadow-sm rounded-b-3xl mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-sm font-medium uppercase tracking-wide mb-2">
              Digital Tender Platform
            </h2>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Streamline your tender <br />
              collaboration process
            </h1>
            <p className="text-white/90 mb-2 text-base">
              Save time, reduce confusion, and grow your B2B network.
            </p>
          </div>

          <div className="text-center">
            <img
              src="/webinar-bro.png"
              alt="Dashboard Preview"
              className="w-full max-w-md mx-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">⚙️ Platform Features</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-semibold text-green-800">{feat.title}</h3>
              </div>
              <p className="text-gray-600 pl-1">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    {/* FOOTER */}
    <footer className="w-full py-6 bg-gray-50 text-center text-gray-500 text-sm">
      Made with <span className="text-red-500">♥</span> from Tushar
    </footer>
  </div>
  );
}
