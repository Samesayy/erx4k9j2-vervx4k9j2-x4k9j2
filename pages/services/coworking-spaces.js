// pages/services/coworking-spaces.js

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CoWorkingSpaces() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Co-working Spaces
        </h1>
        <p className="text-medium-gray">
          Dedicated seats and cabins in vibrant co-working spaces.
        </p>
      </main>
      <Footer />
    </div>
  );
}
