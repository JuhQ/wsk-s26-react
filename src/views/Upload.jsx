import {useFile, useMedia} from '../hooks/apiHooks';

import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const Upload = () => {
  const {postMedia} = useMedia();
  const {uploadFile} = useFile();
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const initValues = {
    description: '',
  };

  const doUpload = async (inputs) => {
    console.log('inputs', inputs);
    const token = localStorage.getItem('token');

    // TODO: wrap in try/catch blocks
    const results = await uploadFile(file, token);

    const mediaResults = await postMedia(results.data, inputs, token);

    console.log('results', results);
    console.log('mediaResults', mediaResults);

    navigate('/');
  };

  const {handleInputChange, handleSubmit, inputs} = useForm(
    doUpload,
    initValues
  );

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      // TODO: set the file to state
      setFile(evt.target.files[0]);
    }
  };
  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-1 flex flex-wrap border-1 p-4">
          <label className="w-full p-2" htmlFor="title">
            Title
          </label>
          <input
            className="w-full border-2 bg-white p-2"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="m-1 flex flex-wrap border-1 p-4">
          <label className="w-full p-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full border-2 bg-white p-2"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="m-1 flex flex-wrap border-1 p-4">
          <label className="w-full p-2" htmlFor="file">
            File
          </label>
          <input
            className="w-full border-2 bg-white p-2"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
