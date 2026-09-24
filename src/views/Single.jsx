import { useLocation, useNavigate } from "react-router";

import Likes from "../components/Likes";

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const media = state.media;
  const type = media.media_type.split("/");
  const isImage = type[0].toLowerCase() === "image";

  return (
    <>
      <h1>{media.title}</h1>

      <button
        className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>

      <div>
        <Likes item={media} />
      </div>

      {isImage ? (
        <img
          src={media.filename}
          alt={media.description}
          title={media.description}
        />
      ) : (
        <video src={media.filename} controls />
      )}
      <p>{media.description}</p>
    </>
  );
};

export default Single;
