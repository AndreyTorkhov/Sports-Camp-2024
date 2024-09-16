// CommentItem.tsx
import React, { useState } from "react";
import { CommentItemProps } from "./interface/commentItemProps";
import CommentHeader from "../CommentHeader/CommentHeader";
import RatingButtons from "../RatingButtons/RatingButtons";
import ReplyForm from "../ReplyForm/ReplyForm";
import styles from "./CommentItem.module.scss";

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  commentRef,
  scrollToComment,
  onReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const ratingDifference = comment.rating.plus - comment.rating.minus;

  const handleScrollToParentComment = () => {
    if (comment.parentComment && comment.parentComment.id) {
      scrollToComment(comment.parentComment.id);
    }
  };

  const handleReplyClick = () => setIsReplying(!isReplying);

  const handleReplySubmit = () => {
    onReply(comment, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className={styles.commentCard} ref={commentRef}>
      <CommentHeader
        author={comment.author}
        date={
          !comment.published.bunin.includes("/")
            ? comment.published.bunin
            : comment.published.bunin
        }
      />
      {comment.parentComment && (
        <div className={styles.replyTo} onClick={handleScrollToParentComment}>
          Ответ на комментарий: "{comment.parentComment.text?.substring(0, 30)}
          ..."
        </div>
      )}
      <div className={styles.commentBody}>
        <p className={styles.commentText}>{comment.text}</p>
      </div>
      <div className={styles.commentFooter}>
        <button className={styles.replyButton} onClick={handleReplyClick}>
          Ответить
        </button>
        <RatingButtons ratingDifference={ratingDifference} />
      </div>
      {isReplying && (
        <ReplyForm
          replyText={replyText}
          onChange={setReplyText}
          onSubmit={handleReplySubmit}
        />
      )}
    </div>
  );
};

export default CommentItem;
