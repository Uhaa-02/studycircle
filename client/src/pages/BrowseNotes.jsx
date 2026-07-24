import { useState } from 'react';
import { useGetNotesQuery, useCreateNoteMutation } from '../app/api/apiSlice';

function BrowseNotes() {
  const { data: notes, isLoading, isError, error } = useGetNotesQuery();
  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote({
        uploadedBy: '665f1a2b3c4d5e6f7a8b9c0d', // placeholder until real auth exists
        title,
        subject,
        semester: Number(semester),
        branch: 'CSE',
        fileUrl: 'https://example.com/placeholder.pdf',
        tags: [],
      }).unwrap();

      setTitle('');
      setSubject('');
      setSemester('');
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  if (isLoading) return <p className="p-6">Loading notes...</p>;
  if (isError) return <p className="p-6 text-red-600">Error: {error.message || 'Something went wrong'}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Notes</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2 border p-4 rounded">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isCreating ? 'Creating...' : 'Add Note'}
        </button>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note._id} className="border p-3 rounded">
              <p className="font-semibold">{note.title}</p>
              <p className="text-sm text-gray-600">{note.subject} · Semester {note.semester}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BrowseNotes;