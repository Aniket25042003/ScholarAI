import { useAuthContext } from '../context/AuthContext';

// Just returns the AuthContext value for convenience
const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
