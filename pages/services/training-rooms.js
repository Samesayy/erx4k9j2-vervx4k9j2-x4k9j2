// pages/services/training-rooms.js

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TrainingRooms() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Training Rooms
        </h1>
        <p className="text-medium-gray">
          Flexible, tech-enabled spaces for corporate events & trainings.
        </p>
      </main>
      <Footer />
    </div>
  );
}
