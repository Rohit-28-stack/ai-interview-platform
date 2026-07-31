import { Link } from "react-router-dom";

function QuickActionCard({
  title,
  description,
  icon,
  color,
  to,
}) {
  return (
    <Link
      to={to}
      className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-400 hover:scale-105 transition duration-300"
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${color}`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </Link>
  );
}

export default QuickActionCard;