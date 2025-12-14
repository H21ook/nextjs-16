"use client";

import { AppDispatch, RootState } from '@/lib/redux/store';
import { refreshToken } from '@/lib/redux/thunks';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSelector((s: RootState) => s.auth)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch]);

    console.log(`User auth status: ${status}`)

    return (
        <>{children}</>
    )
}

export default AuthProvider