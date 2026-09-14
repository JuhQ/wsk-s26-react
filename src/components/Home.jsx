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
        const mediaData = await fetchData(
          import.meta.env.VITE_MEDIA_API + "/media",
        );

        const userListPromises = mediaData.map((media) =>
          fetchData(import.meta.env.VITE_AUTH_API + "/users/" + media.user_id),
        );

        const userListData = await Promise.all(userListPromises);
        console.log("userListData", userListData);

        const combinedData = mediaData.map((item) => {
          const foundUser = userListData.find(
            (user) => user.user_id === item.user_id,
          );

          return {
            ...item,
            user: foundUser,
          };
        });

        setMediaArray(combinedData);
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
            <th>User</th>
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
