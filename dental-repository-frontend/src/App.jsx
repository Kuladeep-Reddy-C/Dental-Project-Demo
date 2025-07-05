import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Patients from './pages/dentist/Patients';
import ProtectDentistRoute from './components/ProtectRoute/ProtectDentistRoute';
import UnAuthorized from './pages/UnAuthorized';
import Appointments from './pages/dentist/Appointments';
import MedicalRecords from './pages/dentist/MedicalRecords';
import Analytics from './pages/analyst/Analytics';
import ProtectAnalystRoute from './components/ProtectRoute/ProtectAnalystRoute';
import Reports from './pages/analyst/Reports';
import DataExport from './pages/analyst/DataExport';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />

        {/* dentist Routes Below */}
        <Route path="/patients" element={<ProtectDentistRoute><Patients /></ProtectDentistRoute>} />
        <Route path="/appointments" element={<ProtectDentistRoute><Appointments /></ProtectDentistRoute>} />
        <Route path="/records" element={<ProtectDentistRoute><MedicalRecords /></ProtectDentistRoute>} />

        {/* analyst Routes Below */}
        <Route path="/analytics" element={<ProtectAnalystRoute><Analytics /></ProtectAnalystRoute>} />
        <Route path="/reports" element={<ProtectAnalystRoute><Reports /></ProtectAnalystRoute>} />
        <Route path="/data" element={<ProtectAnalystRoute><DataExport /></ProtectAnalystRoute>} />

        {/* Catch-all route for undefined paths */}
      </Routes>
    </BrowserRouter>
  )
};

export default App;
