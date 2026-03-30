export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Ges-Far</h1>
      <nav className="flex flex-col gap-3">
        <a href="/" className="p-2 rounded hover:bg-gray-700">Dashboard</a>
        <a href="/medicamentos" className="p-2 rounded hover:bg-gray-700">Medicamentos</a>
        <a href="/retirada" className="p-2 rounded hover:bg-gray-700">Retirada</a>
      </nav>
    </div>
  );
}