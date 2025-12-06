// import React from "react";
// import { motion } from "framer-motion";

// export default function IssueCard({ issue, onOpen }) {
//   return (
//     <motion.button whileHover={{ scale: 1.01 }} className="w-full text-left p-4 rounded-xl bg-white border flex justify-between items-start" onClick={onOpen}>
//       <div>
//         <div className="flex items-center gap-3">
//           <h4 className="font-semibold">{issue.title}</h4>
//           <span className="text-xs text-gray-400">• {new Date(issue.created_at).toLocaleDateString()}</span>
//         </div>
//         <p className="text-sm text-gray-600 mt-2 line-clamp-2">{issue.description}</p>
//         <div className="mt-3 flex gap-2 text-xs">
//           <span className="px-2 py-1 bg-gray-100 rounded-full">{issue.category}</span>
//           <span className="px-2 py-1 bg-gray-100 rounded-full">{issue.location}</span>
//         </div>
//       </div>
//       <div className="text-right">
//         <div className="text-sm text-gray-500">{issue.status}</div>
//       </div>
//     </motion.button>
//   );
// }


// import { motion } from "framer-motion";

// export default function IssueCard({ issue, onOpen }) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col cursor-pointer"
//       onClick={onOpen}
//     >
//       {/* Image on top */}
//       {issue.attachments && issue.attachments.length > 0 ? (
//         <img
//           src={URL.createObjectURL(issue.attachments[0])} // first image
//           alt={issue.title}
//           className="w-full h-48 object-cover"
//         />
//       ) : (
//         <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
//           No Image
//         </div>
//       )}

//       {/* Card content */}
//       <div className="p-4 flex flex-col gap-2">
//         <h4 className="text-lg font-semibold">{issue.title}</h4>
//         <p className="text-sm text-gray-600 line-clamp-3">{issue.description}</p>

//         <div className="flex gap-2 mt-2">
//           <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{issue.category}</span>
//           <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{issue.location}</span>
//         </div>

//         <div className="mt-2 text-right text-sm text-gray-500">{issue.status}</div>
//       </div>
//     </motion.button>
//   );
// }

// import { motion } from "framer-motion";

// export default function IssueCard({ issue, onOpen }) {
//   // Map status to colors
//   const statusColors = {
//     New: "bg-red-100 text-red-700",
//     "In Progress": "bg-blue-100 text-blue-700",
//     Completed: "bg-green-100 text-green-700",
//   };

//   return (
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col cursor-pointer"
//       onClick={onOpen}
//     >
//       {/* Image on top */}
//       {issue.attachments && issue.attachments.length > 0 ? (
//         <img
//           src={URL.createObjectURL(issue.attachments[0])} // first image
//           alt={issue.title}
//           className="w-full h-48 object-cover"
//         />
//       ) : (
//         <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
//           No Image
//         </div>
//       )}

//       {/* Card content */}
//       <div className="p-4 flex flex-col gap-2">
//         <h4 className="text-lg font-semibold">{issue.title}</h4>
//         <p className="text-sm text-gray-600 line-clamp-3">{issue.description}</p>

//         <div className="flex gap-2 mt-2">
//           <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{issue.category}</span>
//           <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{issue.location}</span>
//         </div>

//         {/* Status with color */}
//         <div className="mt-2 text-sm font-medium">
//           Status:{" "}
//           <span className={`px-2 py-1 rounded-full ${statusColors[issue.status] || "bg-gray-100 text-gray-700"}`}>
//             {issue.status}
//           </span>
//         </div>
//       </div>
//     </motion.button>
//   );
// }
// import { motion } from "framer-motion";

// export default function IssueCard({ issue, onOpen }) {
//   const statusColors = {
//     New: "bg-red-100 text-red-700",
//     "In Progress": "bg-blue-100 text-blue-700",
//     Completed: "bg-green-100 text-green-700",
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
//       className="w-full max-w-xs bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-200 flex flex-col transition-shadow duration-200"
//       onClick={onOpen}
//     >
//       {/* Image */}
//       {issue.attachments && issue.attachments.length > 0 ? (
//         <img
//           src={URL.createObjectURL(issue.attachments[0])}
//           alt={issue.title}
//           className="w-full h-48 object-cover"
//         />
//       ) : (
//         <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-medium">
//           No Image
//         </div>
//       )}

//       {/* Content */}
//       <div className="p-5 flex flex-col gap-3">
//         <h4 className="text-lg font-semibold text-gray-900">{issue.title}</h4>
//         <p className="text-sm text-gray-600 line-clamp-3">{issue.description}</p>

//         <div className="flex gap-2 mt-2 flex-wrap">
//           <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
//             {issue.category}
//           </span>
//           <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
//             {issue.location}
//           </span>
//         </div>

//         <div className="mt-3 text-sm font-medium">
//           Status:{" "}
//           <span
//             className={`px-3 py-1 rounded-full font-semibold ${
//               statusColors[issue.status] || "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {issue.status}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
import { motion } from "framer-motion";

export default function IssueCard({ issue, onOpen }) {
  const statusColors = {
    New: "from-red-400 to-red-600 text-white",
    "In Progress": "from-blue-400 to-blue-600 text-white",
    Completed: "from-green-400 to-green-600 text-white",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
      className="w-full max-w-xs bg-white rounded-3xl overflow-hidden cursor-pointer border border-gray-200 flex flex-col transition-shadow duration-300"
      onClick={onOpen}
    >
      {/* Image */}
      {issue.attachments && issue.attachments.length > 0 ? (
        <motion.img
          src={URL.createObjectURL(issue.attachments[0])}
          alt={issue.title}
          className="w-full h-52 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <h4 className="text-xl font-bold text-gray-900">{issue.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-3">{issue.description}</p>

        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
            {issue.category}
          </span>
          <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-semibold rounded-full">
            {issue.location}
          </span>
        </div>

        <div className="mt-4 text-sm font-medium">
          Status:{" "}
          <span
            className={`px-3 py-1 rounded-full font-semibold bg-gradient-to-r ${
              statusColors[issue.status] || "from-gray-200 to-gray-300 text-gray-800"
            } shadow-md`}
          >
            {issue.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
