import React, { useState } from "react";

const Comment = ({
  comment,
  onAddReply,
  showReplyInputId,
  setShowReplyInputId,
  isReply = false,
}) => {
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onAddReply(comment.id, replyText);
    setReplyText("");
    setShowReplyInputId(null);
  };

  return (
    <div className={`${isReply ? "ml-12" : ""} mb-4`}>
      <div className="flex items-start gap-3">
        <img src="/user.jpg" alt="User" className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="bg-gray-800 text-white p-3 rounded-lg">
            <div className="text-sm font-semibold flex items-center justify-between">
              <span>{`User #${comment.user_id}`}</span>
              <span className="text-xs text-gray-400">
                {new Date(comment.created_date).toLocaleString()}
              </span>
            </div>
            <div className="text-sm mt-1">{comment.comment}</div>
          </div>

          {!isReply && (
            <button
              className="text-sm text-gray-400 mt-1 mr-4 hover:underline"
              onClick={() => setShowReplyInputId(comment.id)}
            >
              Reply
            </button>
          )}

          <button
            className="text-sm text-red-400 mt-1 hover:underline"
            onClick={() => alert(`Reported comment ID ${comment.id}`)}
          >
            Report
          </button>

          {showReplyInputId === comment.id && (
            <div className="mt-2">
              <input
                className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 mb-2"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="text-sm text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                  onClick={() => {
                    setReplyText("");
                    setShowReplyInputId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="text-sm text-white bg-gray-500 px-3 py-1 rounded hover:bg-gray-400"
                  onClick={handleReplySubmit}
                >
                  Reply
                </button>
              </div>
            </div>
          )}

          {comment.replies?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onAddReply={onAddReply}
              showReplyInputId={showReplyInputId}
              setShowReplyInputId={setShowReplyInputId}
              isReply={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
