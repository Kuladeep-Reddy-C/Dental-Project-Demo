import React, { useEffect, useState } from 'react';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const { isLoaded, isSignedIn, getToken } = useAuth();
    const navigate = useNavigate();

    const [showRoleSelection, setShowRoleSelection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkRoleAndRedirect = async () => {
            if (!isSignedIn) return;

            try {
                const token = await getToken();

                const res = await fetch(`${url}/api/user-role`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                console.log("Role check:", data);

                if (data.role) {
                    navigate('/');
                } else {
                    setShowRoleSelection(true);
                }
            } catch (err) {
                console.error("Error checking role:", err);
                setError("Failed to check role.");
            }
        };

        checkRoleAndRedirect();
    }, [isSignedIn]);

    const handleRoleSelect = async (role: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();

            const response = await fetch(`${url}/api/user-role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`Role '${role}' set successfully`);
                navigate('/');
            } else {
                console.error("Failed to set role:", data);
                setError(data.error || "Failed to set role.");
            }
        } catch (err) {
            console.error("Error setting role:", err);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Dental Repository</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full space-y-8">
                    {!showRoleSelection ? (
                        /* Sign In Section */
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                                <p className="text-gray-600 mb-8">Please sign in to continue to your dental repository.</p>

                                <div className="space-y-4">
                                    <SignInButton mode='modal'>
                                        <button className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </div>

                                {error && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-red-700 text-sm">{error}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Role Selection Section */
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>

                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Role</h2>
                                <p className="text-gray-600">Please choose your role to customize your experience.</p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleRoleSelect("dentist")}
                                    disabled={loading}
                                    className="w-full p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <div className="flex items-center justify-center">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-semibold text-gray-900">Dentist</h3>
                                            <p className="text-sm text-gray-600">Access patient records and clinical tools</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleRoleSelect("analyst")}
                                    disabled={loading}
                                    className="w-full p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <div className="flex items-center justify-center">
                                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-semibold text-gray-900">Analyst</h3>
                                            <p className="text-sm text-gray-600">View analytics and generate reports</p>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {loading && (
                                <div className="mt-6 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600 mr-2"></div>
                                    <span className="text-gray-600">Setting up your account...</span>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-red-700 text-sm">{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Features Preview */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-sm mb-4">Trusted by dental professionals worldwide</p>
                        <div className="flex justify-center space-x-8 text-gray-400">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-sm">Secure</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-sm">Fast</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">Reliable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;