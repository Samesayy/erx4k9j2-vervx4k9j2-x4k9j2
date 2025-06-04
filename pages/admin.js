// pages/admin.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admin() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Admin Panel
        </h1>
        <p className="text-medium-gray">Admin controls go here.</p>
      </main>
      <Footer />
    </div>
  );
}
