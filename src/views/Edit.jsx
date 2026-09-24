import {useMedia} from '../hooks/apiHooks';

import useForm from '../hooks/formHooks';
import {useLocation, useNavigate} from 'react-router';

const Edit = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const media = state.media;

  const {editMedia} = useMedia();

  const initValues = {
    title: media.title,
    description: media.description,
  };

  const doEdit = async (inputs) => {
    try {
      const token = localStorage.getItem('token');
      const editResult = await editMedia(media.media_id, inputs, token);
      console.log(editResult);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const {handleInputChange, handleSubmit, inputs} = useForm(doEdit, initValues);

  return (
    <>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-1 flex flex-wrap border p-4">
          <label className="w-full p-2" htmlFor="title">
            Title
          </label>
          <input
            className="w-full border-2 bg-white p-2"
            name="title"
            type="text"
            id="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="m-1 flex flex-wrap border p-4">
          <label className="w-full p-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full border-2 bg-white p-2"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>

        <button
          className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={inputs.title.length > 3 ? false : true}
        >
          Edit
        </button>
      </form>
    </>
  );
};

export default Edit;
