import Likes from "./Likes";

const SingleView = (props) => {
  const media = props.media;

  const type = media.media_type.split("/");

  const isImage = type[0].toLowerCase() === "image";

  console.log("is image", isImage);

  console.log("Type", type);

  return (
    <dialog open>
      <h1>{media.title}</h1>
      <div>
        <button
          className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none"
          onClick={() => props.setSelectedItem(null)}
        >
          x
        </button>
      </div>

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
    </dialog>
  );
};

export default SingleView;
