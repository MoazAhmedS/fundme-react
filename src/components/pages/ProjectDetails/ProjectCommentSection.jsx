import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../Network/axiosinstance";
import { MessageCircle, User } from 'lucide-react';

const UserAvatar = ({ user }) => {
  if (!user) {
    return (
      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
    );
  }

  if (user.image) {
    return (
      <img
        src={`http://localhost:8000${user.image}`}
        alt={`${user.first_name || ''} ${user.last_name || ''}`}
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
      <User className="w-4 h-4 text-white" />
    </div>
  );
};

const ProjectComment = ({ comment, onAddReply, depth = 0 }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      setSubmitting(true);
      await onAddReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const maxDepth = 3;

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-700 pl-4' : ''}`}>
      <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <UserAvatar user={comment.user} />
          <div className="flex justify-between items-center w-full">
            <span className="text-white font-medium">
              {comment.user?.first_name || 'You'} {comment.user?.last_name || ''}
            </span>
            <span className="text-gray-400 text-sm">
              {formatDate(comment.created_date)}
            </span>
          </div>
        </div>

        <div className="text-white font-bold text-base mb-3 text-left leading-relaxed">
          {comment.comment}
        </div>

        {depth < maxDepth && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Reply
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <span className="text-gray-500 text-sm">
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            )}
          </div>
        )}

        {showReplyInput && (
          <div className="mt-4 space-y-3">
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows="2"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyText("");
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReplySubmit}
                disabled={submitting || !replyText.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Posting...' : 'Reply'}
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <ProjectComment
              key={reply.id}
              comment={reply}
              onAddReply={onAddReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectCommentSection = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`Project/API/${projectId}/comments/`);
      setComments(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const addCommentToState = (newCommentData) => {
    setComments(prev => [newCommentData, ...prev]);
  };

  const addReplyToState = (parentCommentId, newReplyData) => {
    setComments(prev => {
      const updateComments = (comments) => {
        return comments.map(comment => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReplyData]
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateComments(comment.replies)
            };
          }
          return comment;
        });
      };
      return updateComments(prev);
    });
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      // Optimistically update the UI with proper user structure
      const tempComment = {
        id: Date.now(),
        user: {
          id: 'temp-user',
          first_name: "You",
          last_name: "",
          username: "temp-user",
          image: null
        },
        created_date: new Date().toISOString(),
        comment: newComment,
        replies: [],
        isPending: true
      };
      addCommentToState(tempComment);

      const response = await axiosInstance.post(
        `comment/API/projects/${projectId}/comments/`,
        { comment: newComment }
      );

      // Replace the temporary comment with the real one
      setComments(prev => prev.map(c =>
        c.id === tempComment.id ? response.data : c
      ));

      setNewComment("");
    } catch (error) {
      console.error('Error adding comment:', error);

      // Remove the temporary comment if the request failed
      setComments(prev => prev.filter(c => c.id !== Date.now()));

      if (error.response?.status === 401) {
        setError('Authentication failed. Token may be invalid.');
      } else if (error.response?.status === 403) {
        setError('You do not have permission to comment on this project.');
      } else if (error.response?.status === 404) {
        setError('Project not found.');
      } else {
        setError(`Failed to add comment: ${error.response?.data?.error || error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddReply = async (parentCommentId, replyText) => {
    if (!replyText.trim()) return;

    try {
      // Optimistically update the UI with proper user structure
      const tempReply = {
        id: Date.now(),
        user: {
          id: 'temp-user',
          first_name: "You",
          last_name: "",
          username: "temp-user",
          image: null
        },
        created_date: new Date().toISOString(),
        comment: replyText,
        replies: [],
        isPending: true
      };
      addReplyToState(parentCommentId, tempReply);

      const response = await axiosInstance.post(
        `comment/API/comments/${parentCommentId}/reply/`,
        { comment: replyText }
      );

      // Replace the temporary reply with the real one
      setComments(prev => {
        const updateComments = (comments) => {
          return comments.map(comment => {
            if (comment.replies) {
              const updatedReplies = comment.replies.map(reply =>
                reply.id === tempReply.id ? response.data : reply
              );
              return { ...comment, replies: updatedReplies };
            }
            return comment;
          });
        };
        return updateComments(prev);
      });
    } catch (error) {
      console.error('Error adding reply:', error);

      // Remove the temporary reply if the request failed
      setComments(prev => {
        const removeTempReply = (comments) => {
          return comments.map(comment => {
            if (comment.id === parentCommentId) {
              return {
                ...comment,
                replies: comment.replies.filter(r => r.id !== Date.now())
              };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: removeTempReply(comment.replies)
              };
            }
            return comment;
          });
        };
        return removeTempReply(prev);
      });

      if (error.response?.status === 401) {
        setError('Authentication failed when posting reply.');
      } else {
        setError('Failed to add reply. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        <p className="text-gray-400">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Comments ({comments.length})
      </h2>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded mb-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-300 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex gap-3">
          <textarea
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
            placeholder="Write a comment about this project..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddComment}
            disabled={submitting || !newComment.trim()}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <ProjectComment
              key={comment.id}
              comment={comment}
              onAddReply={handleAddReply}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectCommentSection;