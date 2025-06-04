export default function Button({ children, onClick, className = '' }) {
  return (
    <button onClick={onClick} className={"bg-[#00A8F3] text-white px-4 py-2 rounded " + className}>
      {children}
    </button>
  );
}
