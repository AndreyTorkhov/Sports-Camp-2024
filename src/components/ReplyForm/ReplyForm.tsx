import React from "react";
import styles from "./ReplyForm.module.scss";

interface ReplyFormProps {
  replyText: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({
  replyText,
  onChange,
  onSubmit,
}) => (
  <div className={styles.replyForm}>
    <textarea
      value={replyText}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ваш ответ..."
    />
    <button onClick={onSubmit}>Отправить</button>
  </div>
);

export default ReplyForm;
