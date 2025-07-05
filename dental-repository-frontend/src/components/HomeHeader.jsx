import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

const HomeHeader = ({ role }) => {
    const navigate = useNavigate();
    const renderNavigation = () => {
        if (role === 'dentist') {
            return (
                <>
                    <Link to="/patients" className="text-sm font-medium text-gray-700 hover:text-blue-600">Patients</Link>
                    <Link to="/appointments" className="text-sm font-medium text-gray-700 hover:text-blue-600">Appointments</Link>
                    <Link to="/records" className="text-sm font-medium text-gray-700 hover:text-blue-600">Medical Records</Link>
                </>
            );
        }

        if (role === 'analyst') {
            return (
                <>
                    <Link to="/analytics" className="text-sm font-medium text-gray-700 hover:text-blue-600">Analytics Dashboard</Link>
                    <Link to="/reports" className="text-sm font-medium text-gray-700 hover:text-blue-600">Reports</Link>
                    <Link to="/data" className="text-sm font-medium text-gray-700 hover:text-blue-600">Data Exports</Link>
                </>
            );
        }

        return null;
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Dental Repository</span>
                    </div>

                    {/* Navigation Links based on role */}
                    <nav className="hidden md:flex space-x-6">
                        {renderNavigation()}
                    </nav>

                    {/* User button */}
                    <div className="ml-4">
                        <UserButton />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HomeHeader;
