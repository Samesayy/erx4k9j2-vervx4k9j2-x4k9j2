// pages/services/private-offices.js

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PrivateOffices() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Private Offices
        </h1>
        <p className="text-medium-gray">
          Secure and personalized office spaces for individual teams.
        </p>
      </main>
      <Footer />
    </div>
  );
}
