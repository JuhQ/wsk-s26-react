import { useEffect, useState } from "react";

import MediaRows from "./MediaRows";
import SingleView from "./SingleView";
import fetchData from "../utils/fetchData";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  // TODO: this is a todo comment
  useEffect(() => {
    const getMedia = async () => {
      try {
        const data = await fetchData("test.json");
        setMediaArray(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      {selectedItem ? (
        <SingleView media={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        ""
      )}
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          <MediaRows items={mediaArray} setSelectedItem={setSelectedItem} />
        </tbody>
      </table>
    </>
  );
};

export default Home;
