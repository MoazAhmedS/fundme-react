import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageCircle, User } from 'lucide-react';

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
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-white font-medium">
              {comment.user_name || 'Anonymous User'}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              {formatDate(comment.created_date)}
            </span>
          </div>
        </div>

        <div className="text-gray-200 mb-3 leading-relaxed">
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

  // Your specific token
  const AUTH_TOKEN = "98ab31bfe9196f9c17b5cc2c5c593585dec5401d";

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/Project/API/${projectId}/comments/`);
      setComments(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      setSubmitting(true);
      setError(null);
      
      console.log('Posting comment with token:', AUTH_TOKEN);
      console.log('Project ID:', projectId);
      console.log('Comment text:', newComment);
      
      const response = await axios.post(
        `http://127.0.0.1:8000/comment/API/projects/${projectId}/comments/`,
        { comment: newComment },
        {
          headers: {
            'Authorization': `Token ${AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Comment posted successfully:', response.data);
      await fetchComments();
      setNewComment("");
    } catch (error) {
      console.error('Error adding comment:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
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
      console.log('Posting reply with token:', AUTH_TOKEN);
      console.log('Parent comment ID:', parentCommentId);
      console.log('Reply text:', replyText);
      
      const response = await axios.post(
        `http://127.0.0.1:8000/comment/API/comments/${parentCommentId}/reply/`,
        { comment: replyText },
        {
          headers: {
            'Authorization': `Token ${AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Reply posted successfully:', response.data);
      await fetchComments();
    } catch (error) {
      console.error('Error adding reply:', error);
      console.error('Error response:', error.response?.data);
      
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