import { useState } from 'react';
import { useGetNotesQuery, useCreateNoteMutation, useDeleteNoteMutation } from '../app/api/apiSlice';
import FormInput from '../components/FormInput';

function BrowseNotes() {
  const { data: notes, isLoading, isError, error } = useGetNotesQuery();
  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('subject', subject);
      formData.append('semester', semester);
      formData.append('branch', branch);
      tags.forEach((tag) => formData.append('tags', tag));
      if (file) formData.append('file', file);

      await createNote(formData).unwrap();

      setTitle('');
      setSubject('');
      setSemester('');
      setBranch('');
      setTagsInput('');
      setFile(null);
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id).unwrap();
    } catch (err) {
      console.error('Failed to delete note:', err);
      alert(err.data?.message || 'Failed to delete note');
    }
  };

  if (isLoading) return <p className="p-6">Loading notes...</p>;
  if (isError) return <p className="p-6 text-red-600">Error: {error.message || 'Something went wrong'}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Notes</h1>

      <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded">
        <FormInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <FormInput label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <FormInput label="Semester" type="number" value={semester} onChange={(e) => setSemester(e.target.value)} required />
        <FormInput label="Branch (e.g. CSE, ECE, MECH)" value={branch} onChange={(e) => setBranch(e.target.value)} required />
        <FormInput
          label="Tags (comma-separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="e.g. arrays, sorting, midterm"
        />
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">File (PDF or image)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isCreating ? 'Uploading...' : 'Add Note'}
        </button>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note._id} className="border p-3 rounded">
              <p className="font-semibold">{note.title}</p>
              <p className="text-sm text-gray-600">
                {note.subject} · Semester {note.semester} · {note.branch}
              </p>
              {note.tags.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {note.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-1">
                <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">View File</a>
                <button onClick={() => handleDelete(note._id)} className="text-red-600 text-sm hover:underline ml-2">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BrowseNotes;