export default function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 w-full">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}