import axios from 'axios';
import { Fragment, Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import TourItem from '../components/TourItem';
import BufferIcon from '../ui/BufferIcon';

function ToursPage() {
  const { tours } = useLoaderData();

  console.log(tours);

  return (
    <Fragment>
      <main className="main">
        <div className="card-container">
          <Suspense fallback={<BufferIcon />}>
            <Await resolve={tours}>
              {(loadedTours) =>
                loadedTours.map((tour, ind) => (
                  <TourItem tour={tour} key={ind} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </main>
    </Fragment>
  );
}
export default ToursPage;

async function loadTours() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await axios.get(`${apiUrl}api/v1/tours`);
    const { tours } = response.data.data;

    return tours;
  } catch (error) {
    throw json({ message: error.message }, { status: 500 });
  }
}

export function loader() {
  return defer({
    tours: loadTours(),
  });
}
