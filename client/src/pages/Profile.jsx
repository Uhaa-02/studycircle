import { useGetMeQuery } from '../app/api/apiSlice';

function Profile() {
  const { data: user, isLoading, isError } = useGetMeQuery();

  if (isLoading) return <p className="p-6">Loading profile...</p>;
  if (isError) return <p className="p-6 text-red-600">Please log in to view your profile.</p>;

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="border p-4 rounded space-y-2">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Branch:</span> {user.branch}</p>
        <p><span className="font-semibold">Semester:</span> {user.semester}</p>
        <p><span className="font-semibold">Role:</span> {user.role}</p>
        <p><span className="font-semibold">Reputation Score:</span> {user.reputationScore}</p>
      </div>
    </div>
  );
}

export default Profile;