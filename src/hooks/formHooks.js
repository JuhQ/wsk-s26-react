import { useState } from "react";

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback(inputs);
  };

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value);
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));

    // For uploading files
    // TODO: check if this is needed at all here
    if (event.target.files) {
      setInputs((inputs) => ({
        ...inputs,
        [event.target.name]: event.target.files[0],
      }));
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useForm;
