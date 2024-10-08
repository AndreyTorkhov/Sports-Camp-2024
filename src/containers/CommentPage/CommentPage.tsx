import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import NewCommentForm from "../../components/NewCommentForm";
import CommentList from "../../components/CommentList";
import {
  getCommentsFromLocalStorage,
  saveCommentsToLocalStorage,
} from "../../services/newCommentsStore";
import { fetchComments } from "../../utils/network";
import { Comment } from "../../interfaces/comment";
import styles from "./CommentPage.module.scss";

const CommentPage: React.FC = () => {
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [apiComments, setApiComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedComments = getCommentsFromLocalStorage();

    if (storedComments.length > 0) {
      setLocalComments(storedComments);
    }

    const loadCommentsFromApi = async () => {
      try {
        const resultAction = await dispatch(fetchComments());

        if (fetchComments.fulfilled.match(resultAction)) {
          const fetchedComments = resultAction.payload;
          setApiComments(fetchedComments);
        } else {
          console.error(
            "Ошибка при загрузке комментариев с API",
            resultAction.payload
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке комментариев с API", error);
        setLoading(false);
      }
    };

    loadCommentsFromApi();
  }, []);

  const handleAddComment = (newComment: Comment) => {
    const updatedComments = [newComment, ...localComments];
    setLocalComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);
  };

  return (
    <div className={styles.commentPage}>
      <div className={styles.headerWrapper}>
        <h1>Comment</h1>
      </div>
      <div className={styles.newComment}>
        <NewCommentForm onAddComment={handleAddComment} />
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <CommentList
          comments={[...localComments, ...apiComments]}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default CommentPage;
