import { useGetNotesQuery } from '../app/api/apiSlice';

function BrowseNotes() {
  const { data: notes, isLoading, isError, error } = useGetNotesQuery();

  if (isLoading) return <p className="p-6">Loading notes...</p>;
  if (isError) return <p className="p-6 text-red-600">Error: {error.message || 'Something went wrong'}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Notes</h1>
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