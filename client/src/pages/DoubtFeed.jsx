import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDoubtsQuery, useCreateDoubtMutation } from '../app/api/apiSlice';

function DoubtFeed() {
  const { data: doubts, isLoading, isError, error } = useGetDoubtsQuery();
  const [createDoubt, { isLoading: isCreating }] = useCreateDoubtMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDoubt({
        postedBy: '665f1a2b3c4d5e6f7a8b9c0d',
        title,
        description,
        tags: [],
      }).unwrap();

      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Failed to create doubt:', err);
    }
  };

  if (isLoading) return <p className="p-6">Loading doubts...</p>;
  if (isError) return <p className="p-6 text-red-600">Error: {error.message || 'Something went wrong'}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Doubt Feed</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2 border p-4 rounded">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Describe your doubt"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 w-full rounded"
          rows={3}
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isCreating ? 'Posting...' : 'Post Doubt'}
        </button>
      </form>

      {doubts.length === 0 ? (
        <p>No doubts yet.</p>
      ) : (
        <ul className="space-y-2">
          {doubts.map((doubt) => (
            <li key={doubt._id} className="border p-3 rounded">
              <Link to={`/doubts/${doubt._id}`} className="font-semibold text-blue-700 hover:underline">
                {doubt.title}
              </Link>
              <p className="text-sm text-gray-600">{doubt.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoubtFeed;