export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-md w-full">
        <button onClick={onClose} className="float-right">X</button>
        {children}
      </div>
    </div>
  );
}
