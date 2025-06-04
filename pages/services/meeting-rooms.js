// pages/services/meeting-rooms.js

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function MeetingRooms() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          Meeting Rooms
        </h1>
        <p className="text-medium-gray">
          Spaces for business meetings, conferences, and training.
        </p>
      </main>
      <Footer />
    </div>
  );
}
