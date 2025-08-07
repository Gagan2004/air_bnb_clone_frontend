// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const { data } = await axiosInstance.post('/auth/login', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('role', data.user.role);




//     if(localStorage.role =='ADMIN'){
//         navigate(`/admin-dash`)
//     }
//     else if(localStorage.role =='OWNER'){
        
//         navigate(`/owner-dash`)

//     }
//     else{
//               navigate(`/`)

//     }
    
//   }


//    catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full text-white p-2 rounded transition ${
//             loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Authenticating...' : 'Login'}
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Don’t have an account?{' '}
//         <Link to="/register" className="text-blue-600 hover:underline">
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const TEST_USERS = {
  ADMIN:  { email: 'test0@gmail.com', password: 'test0', redirect: '/admin-dash' },
  OWNER:  { email: 'roka@gmail.com',  password: 'roka',  redirect: '/owner-dash' },
  RENTER: { email: 'zoro@gmail.com',  password: 'zoro',  redirect: '/' },
};

const Login = () => {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate            = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const doLogin = async ({ email, password, redirect }) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doLogin({ ...form, redirect:
      form.email === TEST_USERS.ADMIN.email   ? TEST_USERS.ADMIN.redirect   :
      form.email === TEST_USERS.OWNER.email   ? TEST_USERS.OWNER.redirect   :
      form.email === TEST_USERS.RENTER.email  ? TEST_USERS.RENTER.redirect  :
      '/' 
    });
  };

  const handleTestClick = roleKey => {
    const creds = TEST_USERS[roleKey];
    setForm({ email: creds.email, password: creds.password });
    doLogin(creds);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {/* Test Credentials */}
      <div className="mb-6 text-center">
        <p className="font-medium">TEST CREDENTIALS:</p>
        <div className="flex justify-center gap-2 mt-2">
          {Object.keys(TEST_USERS).map(key => (
            <button
              key={key}
              onClick={() => handleTestClick(key)}
              disabled={loading}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              {key.charAt(0)+key.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-2 rounded transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Authenticating...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
