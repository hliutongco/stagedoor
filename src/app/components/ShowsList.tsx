import { trpc } from '../../server/clients/server-api';

export default async function ShowsList() {
  const shows = await trpc.shows.getShows();
  return (
    <div>
      <h1>Current Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.title}</li>
        ))}
      </ul>
    </div>
  );
}
