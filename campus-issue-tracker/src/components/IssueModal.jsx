// import React from "react";
// import { motion } from "framer-motion";
// import { X } from "lucide-react";

// export default function IssueModal({ issue, onClose }) {
//   if (!issue) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.98 }} 
//         animate={{ opacity: 1, scale: 1 }} 
//         exit={{ opacity: 0, scale: 0.98 }} 
//         className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-6 transition-colors max-h-[90vh] overflow-y-auto"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{issue.title}</h3>
//             <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{issue.location} • {issue.category}</div>
//           </div>
//           <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"><X /></button>
//         </div>

//         {/* --- NEW: IMAGE VIEWER SECTION --- */}
//         {issue.attachments && issue.attachments.length > 0 && (
//             <div className="mb-6 rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800">
//                 <img 
//                     /* Creates a preview URL from the File object */
//                     src={URL.createObjectURL(issue.attachments[0])} 
//                     alt={issue.title} 
//                     className="w-full h-auto max-h-[400px] object-contain mx-auto"
//                 />
//             </div>
//         )}

//         {/* Description */}
//         <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
//             {issue.description}
//         </div>

//         {/* Status Badge */}
//         <div className="mt-6 flex gap-3 items-center">
//           <div className="text-sm text-gray-500 dark:text-gray-400">Status:</div>
//           <div className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300 rounded-full text-sm font-medium">{issue.status}</div>
//         </div>

//         {/* Comments Section */}
//         <div className="mt-6 border-t border-gray-100 dark:border-slate-800 pt-4">
//           <h4 className="font-medium text-slate-900 dark:text-white">Comments</h4>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No comments yet — integrate comments API to enable discussion.</p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Trash2, Archive, Heart, MessageCircle, Send, ThumbsUp } from "lucide-react";
import { api } from "../api/api";

export default function IssueModal({ issue: initialIssue, onClose, onUpdateStatus, role }) {
  const [issue, setIssue] = useState(initialIssue); // Local state to update immediately
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null); // Which comment is being replied to

  // Get current user for optimistic updates
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return null;
    }
  })();
  const currentUserId = currentUser?.id || currentUser?._id;

  // 🔑 Fix: Reset state when the modal receives a new issue
  useEffect(() => {
    setIssue(initialIssue);
    setCommentText("");
    setReplyText("");
    setActiveReplyId(null);
  }, [initialIssue]);

  // Handle outside click to close specifically handled by parent usually, but here we just render
  if (!issue) return null;

  // 🔑 Handle New Comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      // Optimistic update could be added here, but text-ID generation is tricky. 
      // For now we focus on likes as per user request.
      const updatedIssue = await api.addComment(issue.id || issue._id, commentText);
      setIssue(updatedIssue);
      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  // 🔑 Handle Reply
  const handleAddReply = async (commentId) => {
    if (!replyText.trim()) return;
    try {
      const updatedIssue = await api.addReply(issue.id || issue._id, commentId, replyText);
      setIssue(updatedIssue);
      setReplyText("");
      setActiveReplyId(null);
    } catch (err) {
      console.error("Failed to reply", err);
    }
  };

  // 🔑 Handle Like on Comment
  const handleLike = async (commentId) => {
    if (!currentUserId) return;

    // Optimistic Update
    const previousIssue = { ...issue };

    setIssue(prev => {
      const newComments = prev.comments.map(c => {
        if (c._id === commentId) {
          const likes = c.likes || [];
          const hasLiked = likes.includes(currentUserId);
          const newLikes = hasLiked
            ? likes.filter(id => id !== currentUserId)
            : [...likes, currentUserId];
          return { ...c, likes: newLikes };
        }
        return c;
      });
      return { ...prev, comments: newComments };
    });

    try {
      const updatedIssue = await api.toggleLike(issue.id || issue._id, commentId);
      setIssue(updatedIssue); // Sync with server
    } catch (err) {
      console.error("Failed to like", err);
      setIssue(previousIssue); // Revert
    }
  };

  // 🔑 Handle Like on Issue
  const handleIssueLike = async () => {
    if (!currentUserId) return;

    // Optimistic Update
    const previousIssue = { ...issue };
    setIssue(prev => {
      const likes = prev.likes || [];
      const hasLiked = likes.includes(currentUserId);
      const newLikes = hasLiked
        ? likes.filter(id => id !== currentUserId)
        : [...likes, currentUserId];
      return { ...prev, likes: newLikes };
    });

    try {
      const updatedIssue = await api.toggleIssueLike(issue.id || issue._id);
      setIssue(updatedIssue); // Sync with server
    } catch (err) {
      console.error("Failed to like issue", err);
      setIssue(previousIssue); // Revert
    }
  };

  // 🔑 Handle Reply-to-Reply (Mention logic)
  const handleReplyToReply = (commentId, userName) => {
    setActiveReplyId(commentId);
    setReplyText(`@${userName} `);
  };

  // 🔑 HELPER FUNCTION: Safely determine the image source
  const getAttachmentSrc = (attachment) => {
    if (!attachment) return null;
    if (attachment instanceof File) return URL.createObjectURL(attachment);
    if (attachment.path) {
      if (attachment.path.startsWith('http')) return attachment.path;
      return `http://localhost:3000/${attachment.path}`;
    }
    return attachment;
  };

  // Safe checks for arrays
  const issueLikes = issue.likes || [];
  const issueComments = issue.comments || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-6 transition-colors max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{issue.title}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex flex-col gap-1">
              <span>{issue.location} • {issue.category}</span>
              <span className="text-xs opacity-75">Reported by {issue.created_by} on {new Date(issue.created_at).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {role === 'Admin' && issue.status !== 'Archived' && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to discard/archive this issue?')) {
                    onUpdateStatus(issue.id || issue._id, 'Archived');
                    onClose();
                  }
                }}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Discard Issue"
              >
                <Trash2 size={20} />
              </button>
            )}
            {role === 'Admin' && issue.status === 'Archived' && (
              <button
                onClick={() => {
                  if (confirm('Restore this issue to New status?')) {
                    onUpdateStatus(issue.id || issue._id, 'New');
                    onClose();
                  }
                }}
                className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                title="Restore Issue"
              >
                <Archive size={20} className="rotate-180" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"><X size={20} /></button>
          </div>
        </div>

        {/* Media Viewer */}
        {issue.attachments && issue.attachments.length > 0 && (
          <div className="mb-6 rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800">
            {(() => {
              const attachment = issue.attachments[0];
              const src = getAttachmentSrc(attachment);
              const isVideo =
                (attachment.mimetype && attachment.mimetype.startsWith('video/')) ||
                (typeof src === 'string' && src.match(/\.(mp4|webm|ogg)$/i));

              if (isVideo) {
                return (
                  <video
                    src={src}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[500px] object-contain mx-auto bg-black"
                  />
                );
              }
              return (
                <img
                  src={src}
                  alt={issue.title}
                  className="w-full h-auto max-h-[400px] object-contain mx-auto"
                />
              );
            })()}
          </div>
        )}

        {/* Description */}
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {issue.description}
        </div>

        {/* Status Badge & Issue Actions */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Status:</div>
            <div className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300 rounded-full text-sm font-medium">{issue.status}</div>
          </div>

          {/* Issue Like Button */}
          <button
            onClick={handleIssueLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${issueLikes.length > 0
              ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              }`}
          >
            <ThumbsUp size={18} className={issueLikes.length > 0 ? "fill-current" : ""} />
            <span className="font-medium text-sm">{issueLikes.length || 'Like'}</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8 border-t border-gray-100 dark:border-slate-800 pt-6">
          <h4 className="font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <MessageCircle size={20} /> Discussion
          </h4>

          {/* Comment List */}
          <div className="mt-6 space-y-6">
            {issueComments.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                  {comment.user.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 space-y-2">
                  {/* Bubble */}
                  <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {comment.user.name}
                        {comment.user.role === 'Admin' && <span className="ml-2 px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded uppercase tracking-wider">Admin</span>}
                      </span>
                      <span className="text-[10px] text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
                  </div>

                  {/* Actions (Like & Reply) */}
                  <div className="flex items-center gap-4 px-2">
                    <button
                      onClick={() => handleLike(comment._id)}
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-pink-500 transition-colors"
                    >
                      <Heart size={14} className={(comment.likes || []).length > 0 ? "fill-pink-500 text-pink-500" : ""} />
                      {(comment.likes || []).length > 0 && <span>{comment.likes.length}</span>}
                      Like
                    </button>
                    <button
                      onClick={() => setActiveReplyId(activeReplyId === comment._id ? null : comment._id)}
                      className="text-xs font-medium text-gray-500 hover:text-indigo-500 transition-colors"
                    >
                      Reply
                    </button>
                  </div>

                  {/* Replies List */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-4 space-y-3 border-l-2 border-gray-100 dark:border-slate-800">
                      {comment.replies.map(reply => (
                        <div key={reply._id} className="bg-gray-50/50 dark:bg-slate-800/50 p-3 rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{reply.user.name}</span>
                            {reply.user.role === 'Admin' && <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded uppercase tracking-wider">Admin</span>}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{reply.text}</p>
                          {/* 🔑 Reply to Reply Action */}
                          <button
                            onClick={() => handleReplyToReply(comment._id, reply.user.name)}
                            className="text-[10px] text-gray-400 hover:text-indigo-500 mt-1 font-medium"
                          >
                            Reply
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  {activeReplyId === comment._id && (
                    <div className="flex gap-2 mt-2 pl-4">
                      <input
                        autoFocus
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddReply(comment._id)}
                      />
                      <button onClick={() => handleAddReply(comment._id)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                        <Send size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {issueComments.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-4">No comments yet. Start the conversation!</p>
            )}
          </div>

          {/* New Comment Input */}
          <div className="mt-6 flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ask a question or provide an update..."
              className="flex-1 bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
