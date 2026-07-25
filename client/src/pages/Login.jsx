import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../app/api/apiSlice';
import FormInput from '../components/FormInput';

function Login() {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Log In</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-600 text-sm mb-2">{error.data?.message || 'Login failed'}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

export default Login;