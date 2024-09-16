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
      <div className={styles.name}>
        <span className={styles.userName}>{author.nick}</span>
        <span className={styles.commentDate}>{date}</span>
      </div>
    </div>
    <div className={styles.moreButton}>
      <svg
        width="18"
        height="4"
        viewBox="0 0 18 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2C7 0.895431 7.89543 0 9 0C10.1046 0 11 0.895431 11 2ZM16 4C17.1046 4 18 3.10457 18 2C18 0.89543 17.1046 0 16 0C14.8954 0 14 0.89543 14 2C14 3.10457 14.8954 4 16 4Z"
          fill="#222222"
        />
      </svg>
    </div>
  </div>
);

export default CommentHeader;
