import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FolderOpen, ShieldCheck, Network } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token.length > 10) {
      router.push('/dashboard');
    } else {
      setChecking(false);
    }
  }, [router.isReady]);

  const handleSignup = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', form.email);
        router.push('/dashboard');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch {
      alert('Error during signup');
    }
  };

  if (checking) return <div className="p-10 text-center text-gray-500">Checking authentication...</div>;

  return (
    <>
      {/* Background SVG animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="20%" r="30" fill="rgba(0,200,255,0.2)">
            <animate attributeName="r" values="20;40;20" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="90%" cy="80%" r="25" fill="rgba(100,255,150,0.2)">
            <animate attributeName="cy" values="80%;75%;80%" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="50%" r="100" stroke="rgba(200,200,255,0.1)" strokeWidth="2" fill="none">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-16 overflow-hidden">
        <div className="lg:w-1/2 w-full text-center lg:text-left animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-8">
            <span className="block animate-slide-in-left mb-2">GATEWAY</span>
            <span className="inline-block animate-slide-in-right">
              TO <span className="bg-lime-300 px-2 py-1 rounded-md">B2B TENDERS</span>
            </span>
          </h1>

          <p className="text-gray-700 text-lg mb-6 animate-fade-in">
            <span className="text-teal-600 font-bold text-2xl">30K+</span> companies trust our platform to manage their digital tendering process.
          </p>

          <div className="flex flex-col gap-4 w-full sm:max-w-md animate-fade-in">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSignup}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition transform hover:scale-105"
            >
              Sign Up Now
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 mt-4 animate-fade-in">
            Already registered?
            <button
              onClick={() => router.push('/auth/login')}
              className="text-white-700 hover:underline font-medium"
            >
              Log In
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 animate-fade-in">Or continue with</p>
          <div className="flex gap-4 justify-center lg:justify-start mt-2 animate-zoom-in">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733614.png" alt="Apple" className="w-9 h-9 rounded-md shadow" />
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" className="w-9 h-9 rounded-md shadow" />
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" alt="MetaMask" className="w-9 h-9 rounded-md shadow" />
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="mt-12 lg:mt-0 flex justify-center animate-zoom-in">
          <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hover:shadow-lg transition transform hover:scale-105 max-w-[500px]">
            <img
              src="/Sign up-amico.png"
              alt="Tender Software Illustration"
              className="w-[700px] h-[400px] object-contain rounded-md"
            />
          </div>
        </div>
      </div>

      {/* KEY FEATURES */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-xl transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Tender Management</h3>
            <p className="text-gray-600">Create, manage, and track tenders effortlessly from a centralized dashboard.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-xl transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure Proposals</h3>
            <p className="text-gray-600">All proposals are stored securely and can be reviewed or updated any time.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-xl transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
              <Network className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Expand B2B Network</h3>
            <p className="text-gray-600">Connect with thousands of verified businesses and boost collaboration.</p>
          </div>
        </div>
      </section>

      {/* TRUSTED COMPANIES */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Trusted by industry leaders</h2>
        <div className="flex flex-wrap items-center justify-center gap-8 px-10">
          <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Company A" className="h-12" />
          <img src="https://cdn-icons-png.flaticon.com/512/732/732260.png" alt="Company B" className="h-12" />
          <img src="https://cdn-icons-png.flaticon.com/512/732/732228.png" alt="Company C" className="h-12" />
          <img src="https://cdn-icons-png.flaticon.com/512/732/732225.png" alt="Company D" className="h-12" />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-white py-16 px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What companies are saying</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl italic text-gray-600 mb-4">
            “We streamlined our tendering process and saved hours each week. It’s the most efficient platform we’ve used.”
          </p>
          <p className="font-semibold text-gray-700">— Arjun Mehta, Director at Infotender Inc.</p>
        </div>
      </section>
    {/* FOOTER */}
    <footer className="w-full py-6 bg-gray-50 text-center text-gray-500 text-sm">
      Made with <span className="text-red-500">♥</span> from Tushar
    </footer>
    </>
  );
}
