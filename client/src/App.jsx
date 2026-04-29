import React from 'react';
import AuthProvider from './context/auth-provider';
import { DashboardProvider } from './context/DashboardContext';
import HomePage from "./pages/HomePage";
import Users from './pages/users';
import Vet from './pages/Vet'
import Nutritions from './pages/Nutritions'
import CleaningPage from './pages/CleaningPage'
import SystemPage from './pages/SystemPage'
import PreventionPage from './pages/PreventionPage'
import ProductionPage from './pages/ProductionPage'
import FuelPage from './pages/FuelPage'
import ResourcePage from './pages/ResourcePage'
import FoodPage from './pages/FoodPage'
import ActivityPage from './pages/ActivityPage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import PricingPage from './pages/PricingPage'
import FuelReportsPage from './pages/FuelReportsPage';
import MedicalReportsPage from './pages/MedicalReportsPage';
import HealthSafetyReportsPage from './pages/HealthSafetyReportsPage';
import ProductivityReportsPage from './pages/ProductivityReportsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "tailwindcss";
import Employee from './pages/Employee';
import SanitationReportsPage from './pages/SanitationReportsPage';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedHome from './pages/RoleBasedHome'; 
import DashboardFormPage from './pages/DashboardFormPage';
import FeedingPlansPage from './pages/FeedingPlansPage';
import PackingOperationsPage from './pages/PackingOperationsPage'
import PackingReportsPage from './pages/PackingReportsPage'
import FoodCunsumptionPage from './pages/FoodCunsumptionPage'
import FoodConsumptionReportsPage from './pages/FoodConsumptionReportsPage'
import FuelConsumptionPage from './pages/FuelConsumptionPage';
import FuelConsumptionReportsPage from './pages/FuelConsumptionReportsPage'
import MedicalRequestPage from './pages/MedicalRequestPage';
function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
      <BrowserRouter>
        <Routes>
          {/* الصفحات العامة - متاحة للجميع */}
          <Route path="/" element={<SignupPage />} />
          <Route path="/sign-in" element={<SigninPage />} />

          {/* الصفحة الرئيسية حسب الدور - مهمة جداً */}
          <Route path="/home" element={<RoleBasedHome />} />

          {/* الصفحات المحمية - تتطلب صلاحيات محددة */}
          <Route 
            path="/dashbourd" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <HomePage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/users" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Users />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/employee" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Employee />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/activity-logs" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ActivityPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/settings" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SystemPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/health-checks" 
            element={
              <ProtectedRoute allowedRoles={['vet']}>
                <Vet />
              </ProtectedRoute>
            } 
          />

 <Route 
            path="/medication-requests" 
            element={
              <ProtectedRoute allowedRoles={['vet','admin']}>
                <MedicalRequestPage />
              </ProtectedRoute>
            } 
          />





          <Route 
            path="/packing-operations" 
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <PackingOperationsPage />
              </ProtectedRoute>
            } 
          />
<Route 
            path="/packing-reports" 
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <PackingReportsPage />
              </ProtectedRoute>
            } 
          />



          <Route 
            path="/health-reports" 
            element={
              <ProtectedRoute allowedRoles={['vet', 'employee', 'admin']}>
                <MedicalReportsPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/daily-feeding" 
            element={
              <ProtectedRoute allowedRoles={['food_supplier']}>
                <Nutritions />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/fuel-reports" 
            element={
              <ProtectedRoute allowedRoles={['fuel_supplier', 'employee', 'admin']}>
                <FuelReportsPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/hygiene-reports" 
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <CleaningPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/hygiene-docs" 
            element={
              <ProtectedRoute allowedRoles={['employee', 'admin']}>
                <SanitationReportsPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/prevention-plans" 
            element={
              <ProtectedRoute allowedRoles={['vet']}>
                <PreventionPage />
              </ProtectedRoute>
            } 
          />


          <Route 
            path="/feeding-plans" 
            element={
              <ProtectedRoute allowedRoles={['vet']}>
                <FeedingPlansPage />
              </ProtectedRoute>
            } 
          />


         <Route 
            path="/general-feeding" 
            element={
              <ProtectedRoute allowedRoles={['food_supplier']}>
                <FoodCunsumptionPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/general-feeding-reports" 
            element={
              <ProtectedRoute allowedRoles={['food_supplier']}>
                <FoodConsumptionReportsPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/prevention-reports" 
            element={
              <ProtectedRoute allowedRoles={['vet', 'employee', 'admin']}>
                <HealthSafetyReportsPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/reports" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <ProductionPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/resource-planning" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'employee']}>
                <ResourcePage />
              </ProtectedRoute>
            } 
          />

  <Route 
            path="/daily-data" 
            element={
              <ProtectedRoute allowedRoles={[ 'employee', 'admin']}>
                
                  <DashboardFormPage />
               
              </ProtectedRoute>
            } 
          />

  <Route 
            path="/productivity-reports" 
            element={
              <ProtectedRoute allowedRoles={[  'admin']}>
                
             <ProductivityReportsPage />
               
              </ProtectedRoute>
            } 
          />


          <Route 
            path="/fuel" 
            element={
              <ProtectedRoute allowedRoles={['fuel_supplier','admin']}>
                <FuelPage />
              </ProtectedRoute>
            } 
          />

 <Route 
            path="/fuel-consumption" 
            element={
              <ProtectedRoute allowedRoles={['fuel_supplier']}>
                <FuelConsumptionPage />
              </ProtectedRoute>
            } 
          />


 <Route 
            path="/fuel-consumption-reports" 
            element={
              <ProtectedRoute allowedRoles={['fuel_supplier']}>
                <FuelConsumptionReportsPage />
              </ProtectedRoute>
            } 
          />


          <Route 
            path="/food" 
            element={
              <ProtectedRoute allowedRoles={['food_supplier','admin']}>
                <FoodPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/pricing" 
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <PricingPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;