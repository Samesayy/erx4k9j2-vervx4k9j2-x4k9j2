// pages/services/bespoke-assistance.js

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BespokeAssistance() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Bespoke Assistance
        </h1>
        <p className="text-medium-gray">
          Let our team find an office for you.
        </p>
      </main>
      <Footer />
    </div>
  );
}
