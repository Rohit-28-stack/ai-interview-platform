function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 hover:scale-105 transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;