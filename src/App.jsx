import React from 'react';
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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "tailwindcss";
import Employee from './pages/Employee';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
        
        </Route>
        <Route path="/users" element={<Users />}>
        
        </Route>
         <Route path="/employee" element={<Employee />}>
        
        </Route>

  <Route path="/activity-logs" element={<ActivityPage/>}>
        
        </Route>

         <Route path="/health-checks" element={<Vet/>}>
        
        </Route>
        <Route path="/daily-feeding" element={<Nutritions/>}>
        
        </Route>
        <Route path="/hygiene-reports" element={<CleaningPage/>}>
        
        </Route>
        <Route path="/settings" element={<SystemPage/>}>
        
        </Route> 
        <Route path="/prevention-plans" element={<PreventionPage/>}>
        
        </Route>
        <Route path="/reports" element={<ProductionPage/>}>
        
        </Route>

 <Route path="/resource-planning" element={<ResourcePage/>}>
        
        </Route>

        <Route path="/fuel" element={<FuelPage/>}>
        
        </Route>
        <Route path="/food" element={<FoodPage/>}>
        
        </Route>
        <Route path="/sign-up" element={<SignupPage/>}>
        
        </Route>
         <Route path="/sign-in" element={<SigninPage/>}>
        
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;