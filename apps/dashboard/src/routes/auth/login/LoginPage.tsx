import { useAuth } from '../../../contexts/AuthContext';

export default function LoginPage() {
  const { loginDummy } = useAuth();

  return <button onClick={loginDummy}>Login</button>;
}
