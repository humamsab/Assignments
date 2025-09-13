export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
      <img
        src="https://i.pravatar.cc/150?img=47"
        alt="Shuri Singh"
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold text-gray-800">Natasha Dias</h2>
      <p className="text-gray-500 mb-4">UI/UX Designer</p>
      <button className="px-4 py-2 mt-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
        View Profile
      </button>
    </div>
  );
}
