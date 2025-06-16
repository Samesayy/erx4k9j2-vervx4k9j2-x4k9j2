// components/InstantQuoteModal.jsx
import { useState } from 'react';

export default function InstantQuoteModal({ isOpen, onClose, defaultOfficeType }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [officeType, setOfficeType] = useState(defaultOfficeType || '');
  const [seats, setSeats] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Want a Call Back?</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your Name"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your Email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Type your Number"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Required Office Type</label>
            <select
              value={officeType}
              onChange={(e) => setOfficeType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an office type</option>
              <option value="Coworking Space">Coworking Space</option>
              <option value="Serviced Office">Serviced Office</option>
              <option value="Virtual Office">Virtual Office</option>
              <option value="Meeting Room">Meeting Room</option>
              <option value="Training Room">Training Room</option>
              <option value="Day Office">Day Office</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">No. of seats required</label>
            <select
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select seats</option>
              <option value="1-5">1-5</option>
              <option value="6-10">6-10</option>
              <option value="11-20">11-20</option>
              <option value="21+">21+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Requirement</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your Message"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              // You can wire up real submission here (e.g., send to Supabase or email)
              console.log({ name, email, phone, officeType, seats, message });
              onClose();
            }}
            className="w-full bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
