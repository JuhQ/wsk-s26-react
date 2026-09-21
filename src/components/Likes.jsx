import { useLike } from "../hooks/apiHooks";

const Likes = (props) => {
  const { postLike, likeCount } = useLike(props.item.media_id);

  return <button onClick={postLike}>❤️ ({likeCount})</button>;
};

export default Likes;
