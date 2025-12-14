'use client'

import { Provider } from 'react-redux'
import { store } from '@/lib/redux/store'
import AuthProvider from './auth-provider'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
    </Provider>
}