import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../app/api/apiSlice';
import FormInput from '../components/FormInput';

function Signup() {
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup({
        name,
        email,
        password,
        branch,
        semester: Number(semester),
      }).unwrap();

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <FormInput label="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} required />
        <FormInput label="Semester" type="number" value={semester} onChange={(e) => setSemester(e.target.value)} required />
        {error && <p className="text-red-600 text-sm mb-2">{error.data?.message || 'Signup failed'}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Signup;