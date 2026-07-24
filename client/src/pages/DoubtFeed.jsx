import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDoubtsQuery, useCreateDoubtMutation } from '../app/api/apiSlice';
import FormInput from '../components/FormInput';

function DoubtFeed() {
  const { data: doubts, isLoading, isError, error } = useGetDoubtsQuery();
  const [createDoubt, { isLoading: isCreating }] = useCreateDoubtMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await createDoubt({
        postedBy: '665f1a2b3c4d5e6f7a8b9c0d',
        title,
        description,
        tags,
      }).unwrap();

      setTitle('');
      setDescription('');
      setTagsInput('');
    } catch (err) {
      console.error('Failed to create doubt:', err);
    }
  };

  if (isLoading) return <p className="p-6">Loading doubts...</p>;
  if (isError) return <p className="p-6 text-red-600">Error: {error.message || 'Something went wrong'}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Doubt Feed</h1>

      <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded">
        <FormInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <FormInput
          label="Tags (comma-separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="e.g. javascript, recursion"
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
              {doubt.tags.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {doubt.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoubtFeed;