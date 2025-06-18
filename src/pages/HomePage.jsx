import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardCards from '../components/DashboardCards';
import RecentActivity from '../components/RecentActivity';
import TasksOverview from '../components/TasksOverview';
import AlertsSection from '../components/AlertsSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <DashboardCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            <div>
              <RecentActivity />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TasksOverview />
            <AlertsSection />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
