import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, useAuth, UserButton, useUser } from '@clerk/clerk-react';
import HomeHeader from '../components/HomeHeader';

const HomePage = () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const { isLoaded, isSignedIn, getToken } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!isLoaded || !isSignedIn) return;

            try {
                const token = await getToken();
                const res = await fetch(`${url}/api/user-role`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (data.role) {
                    setRole(data.role);
                } else {
                    console.warn('No role found for the user');
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
            }
        };

        fetchUserRole();
    }, [isLoaded, isSignedIn]);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/login');
        }
    }, [isLoaded, isSignedIn]);

    const handleChangeRole = async () => {
        
        if (!isLoaded || !isSignedIn) return;
        console.log('Changing role...');

        try {
            setLoading(true);
            const token = await getToken();
            const newRole = role === 'dentist' ? 'analyst' : 'dentist'; // Toggle role for demonstration
            const response = await fetch(`${url}/api/user-role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                setRole(newRole);
                console.log(`Role changed to '${newRole}' successfully`);
            } else {
                console.error('Failed to change role');
            }
        } catch (err) {
            console.error('Error changing role:', err);
        }finally{
            setLoading(false);
        }
    }

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            {/* Header */}
            <HomeHeader role={role} />

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Welcome to the
                        <span className="block text-blue-600">Dental Repository</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        A comprehensive platform for managing dental records and resources with precision and care.
                    </p>
                </div>

                {/* Role Card */}
                {role && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 transform hover:scale-105 transition-all duration-300">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your Role</h3>
                            <p className="text-lg text-gray-600 mb-6">
                                Currently signed in as:
                                <span className="ml-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium inline-block">
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </span>
                            </p>
                            <button
                                onClick={handleChangeRole}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                Switch Role
                            </button>
                        </div>
                    </div>
                )}


            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 mt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2025 Dental Repository. All rights reserved, Kuladeep.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;