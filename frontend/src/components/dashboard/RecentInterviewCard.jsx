function RecentInterviewCard({
  topic,
  difficulty,
  score,
  date,
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-cyan-400 transition">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {topic}
          </h3>

          <p className="text-slate-400 text-sm mt-1">
            {difficulty}
          </p>
        </div>

        <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {score}/10
        </span>
      </div>

      <p className="text-slate-500 text-sm mt-4">
        {date}
      </p>
    </div>
  );
}

export default RecentInterviewCard;