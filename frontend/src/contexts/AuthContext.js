import { createContext, useState, useEffect, useCallback } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [tokens, tokensSet] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null) // auth tokens
    let [userInfo, userSet] = useState(() => localStorage.getItem('tokens') ? jwt_decode(localStorage.getItem('tokens')) : null)
    let [loading, loadingSet] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.email.value, 'password': e.target.password.value })
        })
        let data = await response.json()
        if (response.status === 200) {
            tokensSet(data)
            userSet(jwt_decode(data.access))
            localStorage.setItem('tokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }

    const logoutUser = useCallback(() => {
        tokensSet(null)
        userSet(null)
        localStorage.removeItem('tokens')
        navigate('/welcome')
    }, [navigate])

    const updateToken = useCallback(async () => {
        console.log('Token updated')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': tokens?.refresh })
        })
        let data = await response.json()

        if (response.status === 200) {
            tokensSet(data)
            userSet(jwt_decode(data.access))
            localStorage.setItem('tokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            loadingSet(false)
        }
    }, [loading, logoutUser, tokens?.refresh])

    let contextData = {
        userInfo: userInfo,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    // lifecycle
    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let refreshTime = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (tokens) {
                updateToken()
            }
        }, refreshTime)
        return () => clearInterval(interval)

    }, [tokens, loading, updateToken])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}