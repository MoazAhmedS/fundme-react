import React, { useState } from "react";
import Comment from "./Comment";

const CommentSection = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [showReplyInputId, setShowReplyInputId] = useState(null);
  const [idCounter, setIdCounter] = useState(1000);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: idCounter,
      user_id: 999,
      project_id: 7,
      comment: newComment,
      created_date: new Date().toISOString(),
      replies: [],
    };
    setComments([...comments, comment]);
    setNewComment("");
    setIdCounter(idCounter + 1);
  };

  const handleAddReply = (parentId, replyText) => {
    if (!replyText.trim()) return;

    const addReplyRecursive = (list) =>
      list.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            replies: [
              ...item.replies,
              {
                id: idCounter,
                user_id: 999,
                project_id: 7,
                parent_id: parentId,
                comment: replyText,
                created_date: new Date().toISOString(),
                replies: [],
              },
            ],
          };
        }

        return {
          ...item,
          replies: item.replies ? addReplyRecursive(item.replies) : [],
        };
      });

    setComments(addReplyRecursive(comments));
    setIdCounter(idCounter + 1);
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-lg text-white w-full max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        Comments ({comments.length})
      </h2>

      <div className="flex items-center gap-2 mb-6">
        <input
          className="flex-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
          placeholder="Write a comment about this project..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="text-sm text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleAddComment}
        >
          Comment
        </button>
      </div>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onAddReply={handleAddReply}
          showReplyInputId={showReplyInputId}
          setShowReplyInputId={setShowReplyInputId}
        />
      ))}
    </div>
  );
};

export default CommentSection;
