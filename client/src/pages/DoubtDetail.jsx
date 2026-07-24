import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnswersForDoubtQuery, useCreateAnswerMutation } from '../app/api/apiSlice';

function DoubtDetail() {
  const { id } = useParams();
  const { data: answers, isLoading, isError, error } = useGetAnswersForDoubtQuery(id);
  const [createAnswer, { isLoading: isCreating }] = useCreateAnswerMutation();

  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnswer({
        doubtId: id,
        answeredBy: '665f1a2b3c4d5e6f7a8b9c0d',
        content,
      }).unwrap();
      setContent('');
    } catch (err) {
      console.error('Failed to post answer:', err);
    }
  };

  if (isLoading) return <p className="p-6">Loading answers...</p>;
  if (isError) return <p className="p-6 text-red-600">Error: {error.message || 'Something went wrong'}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Answers</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2 border p-4 rounded">
        <textarea
          placeholder="Write an answer"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="border p-2 w-full rounded"
          rows={3}
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isCreating ? 'Posting...' : 'Post Answer'}
        </button>
      </form>

      {answers.length === 0 ? (
        <p>No answers yet. Be the first to help!</p>
      ) : (
        <ul className="space-y-2">
          {answers.map((answer) => (
            <li key={answer._id} className="border p-3 rounded">
              <p>{answer.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoubtDetail;