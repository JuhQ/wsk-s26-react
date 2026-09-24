import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import Likes from './Likes';
import {Link} from 'react-router';

const MediaRow = (props) => {
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const media = props.media;

  const deleteHandler = async () => {
    const token = localStorage.getItem('token');
    const deleteResult = await deleteMedia(media.media_id, token);
    console.log(deleteResult);
  };

  return (
    <tr>
      <td className="border border-black text-center">
        <Likes item={media} />
      </td>
      <td className="border border-black text-center">
        <Link to="/single" state={{media}}>
          <img
            src={media.thumbnail}
            alt={media.description}
            title={media.description}
          />
        </Link>
      </td>
      <td className="border border-black text-center">
        {user && user.user_id === media.user_id && (
          <>
            <button
              className="rounded-2xl bg-red-800 p-4 text-white hover:bg-red-500 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              onClick={deleteHandler}
            >
              Delete
            </button>
            <button
              className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              onClick={() => {}}
            >
              Edit
            </button>
          </>
        )}
      </td>
      <td className="border border-black text-center">{media.user.username}</td>
      <td className="border border-black text-center">{media.title}</td>
      <td className="border border-black text-center">{media.description}</td>
      <td className="border border-black text-center">
        {new Date(media.created_at).toLocaleDateString('fi-FI')}
      </td>
      <td className="border border-black text-center">{media.filesize}</td>
      <td className="border border-black text-center">{media.media_type}</td>
    </tr>
  );
};

export default MediaRow;
