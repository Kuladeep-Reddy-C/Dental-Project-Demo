import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const ProtectDentistRoute = ({ children }) => {
    const { isLoaded, isSignedIn, getToken } = useAuth();
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkUserRole = async () => {
            if (!isLoaded) return;

            if (!isSignedIn) {
                navigate('/login');
                return;
            }

            try {
                const token = await getToken();
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user-role`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (data.role !== 'dentist') {
                    navigate('/unauthorized');
                } else {
                    setAuthorized(true);
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
                navigate('/unauthorized');
            }
        };

        checkUserRole();
    }, [isLoaded, isSignedIn, getToken, navigate]);

    if (!isLoaded || !isSignedIn || !authorized) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectDentistRoute;
