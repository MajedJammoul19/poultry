import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

const RoleBasedHome = () => {
  const { userRole, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!userRole) {
      navigate('/sign-in');
      return;
    }

    // توجيه المستخدم حسب دوره
    switch (userRole) {
      case 'admin':
        navigate('/dashbourd');
        break;
      case 'employee':
        navigate('/reports');
        break;
      case 'vet':
        navigate('/health-checks');
        break;
      case 'fuel_supplier':
        navigate('/fuel');
        break;
      case 'food_supplier':
        navigate('/food');
        break;
      default:
        navigate('/sign-in');
    }
  }, [userRole, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">جاري التوجيه...</div>
    </div>
  );
};

export default RoleBasedHome;