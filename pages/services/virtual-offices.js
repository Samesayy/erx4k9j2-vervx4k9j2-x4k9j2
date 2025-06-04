// pages/services/virtual-offices.js

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function VirtualOffices() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Virtual Offices
        </h1>
        <p className="text-medium-gray">
          GST and business registration for new businesses.
        </p>
      </main>
      <Footer />
    </div>
  );
}
