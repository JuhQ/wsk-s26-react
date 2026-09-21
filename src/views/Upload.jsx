import { useFile, useMedia } from "../hooks/apiHooks";

import useForm from "../hooks/formHooks";
import { useNavigate } from "react-router";
import { useState } from "react";

const Upload = () => {
  const { postMedia } = useMedia();
  const { uploadFile } = useFile();
  const [file, setFile] = useState();

  const initValues = {
    description: "",
  };

  const doUpload = async (inputs) => {
    console.log("inputs", inputs);
    const token = localStorage.getItem("token");

    // TODO: wrap in try/catch blocks
    const results = await uploadFile(file, token);

    const mediaResults = await postMedia(results.data, inputs, token);

    console.log("results", results);
    console.log("mediaResults", mediaResults);
  };

  const { handleInputChange, handleSubmit, inputs } = useForm(
    doUpload,
    initValues,
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
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
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
              : "https://placehold.co/200?text=Choose+image"
          }
          alt="preview"
          width="200"
        />
        <button
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
