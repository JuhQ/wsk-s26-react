import MediaRows from './MediaRows';
import SingleView from './SingleView';
import {useMedia} from '../hooks/apiHooks';
import {useState} from 'react';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {mediaArray} = useMedia(true);

  console.log('mediaArray', mediaArray);

  return (
    <>
      <h2>My Media</h2>
      {selectedItem ? (
        <SingleView media={selectedItem} setSelectedItem={setSelectedItem} />
      ) : (
        ''
      )}
      <table>
        <thead>
          <tr>
            <th>Likes</th>
            <th>Thumbnail</th>
            <th>Ops</th>
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
