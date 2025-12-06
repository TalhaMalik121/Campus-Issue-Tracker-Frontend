import { motion } from "framer-motion";

export default function IssueCard({ issue, onOpen }) {
  const statusColors = {
    New: "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/30",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30",
    Completed: "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group w-full bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-slate-800 dark:border-slate-700"
      onClick={onOpen}
    >
      {/* Image Section */}
      <div className="h-40 overflow-hidden bg-gray-100 dark:bg-slate-700 relative">
        {issue.attachments && issue.attachments.length > 0 ? (
          <img
            src={URL.createObjectURL(issue.attachments[0])}
            alt={issue.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-slate-500 font-medium bg-slate-100 dark:bg-slate-800/50">
            No Image
          </div>
        )}
        
        {/* Category Badge on Image */}
        <div className="absolute top-3 left-3">
             <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-lg shadow-sm text-gray-700 dark:bg-slate-900/80 dark:text-slate-200">
                {issue.category || "General"}
             </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        <div>
            <h4 className="text-lg font-bold text-slate-900 leading-tight mb-1 dark:text-white">
                {issue.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {issue.description}
            </p>
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100 dark:border-slate-700">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                {issue.location}
            </span>

            <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                statusColors[issue.status] || "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300"
                }`}
            >
                {issue.status}
            </span>
        </div>
      </div>
    </motion.div>
  );
}