// src/slices/auth.tsx
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    // user: string | null; 
}

const initialState: AuthState = {
    isAuthenticated: false,
    // user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login: (state, action: PayloadAction<string>) => {
            login: (state) => {
            state.isAuthenticated = true;
            // state.user = action.payload; 
        },
        logout: (state) => {
            state.isAuthenticated = false;
            // state.user = null;
        },
    },
});

// Export actions
export const authActions = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
