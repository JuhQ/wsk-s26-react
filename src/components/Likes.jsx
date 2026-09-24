import { useLike } from "../hooks/apiHooks";

const Likes = (props) => {
  const { postLike, likeCount } = useLike(props.item.media_id);

  return (
    <button
      className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none"
      onClick={postLike}
    >
      ❤️ ({likeCount})
    </button>
  );
};

export default Likes;
