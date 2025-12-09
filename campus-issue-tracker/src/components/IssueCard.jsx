import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Heart } from "lucide-react";
import { api } from "../api/api"; // Import API

export default function IssueCard({ issue, onOpen }) {
  // 🔑 Issue Likes Logic
  const user = JSON.parse(localStorage.getItem('user'));
  const initialLikes = issue.likes || [];
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(user && likes.includes(user.id));

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent card open
    if (!user) return;

    // Optimistic Update
    const previousLikes = [...likes];
    const previousIsLiked = isLiked;

    if (isLiked) {
      setLikes(likes.filter(id => id !== user.id));
      setIsLiked(false);
    } else {
      setLikes([...likes, user.id]);
      setIsLiked(true);
    }

    try {
      await api.toggleIssueLike(issue.id || issue._id);
    } catch (error) {
      console.error("Failed to like issue:", error);
      // Revert
      setLikes(previousLikes);
      setIsLiked(previousIsLiked);
    }
  };

  const statusColors = {
    New: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-900/30",
    "In Progress": "bg-primary-50 text-primary-600 border-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-900/30",
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900/30",
    Resolved: "bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-900/30",
  };

  const getAttachmentSrc = (attachment) => {
    if (!attachment) return null;
    if (attachment instanceof File) return URL.createObjectURL(attachment);
    // 🔑 If it's a backend path, prepend the base URL ONLY if it's relative
    if (attachment.path) {
      if (attachment.path.startsWith('http')) return attachment.path;
      return `http://localhost:3000/${attachment.path}`;
    }
    return attachment;
  };

  const attachment = issue.attachments && issue.attachments.length > 0 ? issue.attachments[0] : null;
  const src = getAttachmentSrc(attachment);

  // 🔑 Detect video
  const isVideo = attachment && (
    (attachment.mimetype && attachment.mimetype.startsWith('video/')) ||
    (typeof attachment.filename === 'string' && attachment.filename.match(/\.(mp4|webm|ogg)$/i)) ||
    (typeof attachment.path === 'string' && attachment.path.match(/\.(mp4|webm|ogg)$/i))
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className="group relative w-full glass-panel overflow-hidden cursor-pointer border border-surface-200 dark:border-surface-700/50 shadow-sm"
      onClick={onOpen}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image/Video Section */}
      <div className="h-44 overflow-hidden bg-surface-100 dark:bg-surface-800 relative">
        {src ? (
          isVideo ? (
            <video
              src={src}
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              muted
              loop
              playsInline
              onMouseOver={event => event.target.play()}
              onMouseOut={event => event.target.pause()}
            />
          ) : (
            <img
              src={src}
              alt={issue.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-surface-400 dark:text-surface-600 font-medium bg-surface-50 dark:bg-surface-800/50">
            <span className="text-sm">No Preview Image</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="px-3 py-1 bg-white/95 dark:bg-surface-900/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm text-surface-700 dark:text-surface-200 border border-white/20">
            {issue.category || "General"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3 relative z-10">
        <div>
          <h4 className="text-lg font-display font-bold text-surface-900 dark:text-white leading-tight mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {issue.title}
          </h4>

          {/* 🔑 Metadata Line - Robust Name Display */}
          <div className="flex flex-wrap gap-2 text-xs text-surface-400 dark:text-surface-500 mb-2 font-medium">
            <span>{new Date(issue.created_at).toLocaleString()}</span>
            <span>•</span>
            <span className="font-semibold text-surface-600 dark:text-surface-300">
              {issue.created_by || "Anonymous"}
            </span>
          </div>

          <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 leading-relaxed">
            {issue.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100 dark:border-surface-800/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-surface-500 dark:text-surface-400">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-medium bg-surface-50 dark:bg-surface-800 px-2 py-0.5 rounded-md">
                {issue.location}
              </span>
            </div>

            {/* 🔑 Heart/Like Button */}
            <button
              onClick={handleLike}
              className="flex items-center gap-1 z-20 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-2 py-1 rounded-full transition-colors group/like"
            >
              <Heart
                size={16}
                className={`transition-colors ${isLiked ? "fill-rose-500 text-rose-500" : "text-surface-400 group-hover/like:text-rose-500"}`}
              />
              {likes.length > 0 && (
                <span className={`text-xs font-bold ${isLiked ? "text-rose-500" : "text-surface-500"}`}>
                  {likes.length}
                </span>
              )}
            </button>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[issue.status] || "bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300"
              }`}
          >
            {issue.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}