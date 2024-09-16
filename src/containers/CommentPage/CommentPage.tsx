import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import NewCommentForm from "../../components/NewCommentForm";
import CommentList from "../../components/CommentList"; // Обновили импорт
import {
  getCommentsFromLocalStorage,
  saveCommentsToLocalStorage,
} from "../../services/imageService";
import { fetchComments } from "../../utils/network";
import { Comment } from "../../interfaces/comment";
import styles from "./CommentPage.module.scss";

const CommentPage: React.FC = () => {
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [apiComments, setApiComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Загружаем комментарии из localStorage
    const storedComments = getCommentsFromLocalStorage();
    if (storedComments.length > 0) {
      setLocalComments(storedComments);
    }

    // Загружаем комментарии с API
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
  }, [dispatch]);

  const handleAddComment = (newComment: Comment) => {
    const updatedComments = [newComment, ...localComments];
    setLocalComments(updatedComments);
    saveCommentsToLocalStorage(updatedComments);
  };

  return (
    <div className={styles.commentPage}>
      <h1>Комментарии</h1>

      <NewCommentForm onAddComment={handleAddComment} />

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
