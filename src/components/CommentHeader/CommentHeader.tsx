import React from "react";
import { Comment } from "../../interfaces/comment";
import styles from "./CommentHeader.module.scss";

interface CommentHeaderProps {
  author: Comment["author"];
  date: string;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({ author, date }) => (
  <div className={styles.commentHeader}>
    <div className={styles.userInfo}>
      <div>
        <span className={styles.userName}>{author.nick}</span>
        <span className={styles.commentDate}>{date}</span>
      </div>
    </div>
    <button className={styles.moreButton}>...</button>
  </div>
);

export default CommentHeader;
