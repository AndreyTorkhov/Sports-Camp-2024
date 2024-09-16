export const scrollToComment = (
  commentRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>,
  commentId: string
) => {
  const commentElement = commentRefs.current[commentId];
  if (commentElement) {
    commentElement.scrollIntoView({ behavior: "smooth" });
  }
};
