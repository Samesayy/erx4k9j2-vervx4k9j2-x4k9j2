export default function FilterSidebar() {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>
      {/* Add filter inputs here */}
      <div>
        <label className="block mb-1">City:</label>
        <input type="text" className="w-full px-2 py-1 border rounded" />
      </div>
    </div>
  );
}
