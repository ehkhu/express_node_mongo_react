import axios from '@/lib/axios';
import User from '@/types/User';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
    // const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("auth");
        const storedUser = localStorage.getItem('user');
        const storedAuthenticated = localStorage.getItem('authenticated');

        if (storedAuthenticated && storedUser) {
            // setAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (userData:any) => {
        try {
            const response = await axios.post('/api/v1/users/login', userData);
            localStorage.setItem('token', response.data.token); // Store token in local storage
            // localStorage.setItem('token', response.data.token); // Store token in local storage
            setUser(response.data.data.user);
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            navigate('/dashboard', { replace: true });
            // console.log(response.data.data.user)
            // Redirect user to another page or do something else
        } catch (error) {
            console.error('Login error:', error);
            // Handle login errors (display error message, etc.)
        }
        // setAuthenticated(true);
        
    };

    const logout = () => {
        // setAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('authenticated');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    };

    const isAuthenticated =  () => {
        const storedAuthenticated = localStorage.getItem('authenticated');
        return storedAuthenticated;
        // return authenticated;
    };

    return { login, logout, isAuthenticated, user };
};

export default useAuth;
