import { useAuth } from '../../../app/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();

  return <button onClick={login}>Login</button>;
}
