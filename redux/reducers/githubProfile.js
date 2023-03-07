import { createSlice } from "@reduxjs/toolkit";

const GithubProfileSlice = createSlice({
    name: 'githubProfile',
    initialState: {
        user: '',
        repo: [],
        total_repo: 0,
        total_page: 0,
        status: false
    },
    reducers: {
        SetGitProfile(state, action){
            return {
                ...state, ...action.payload
            }
        }
    }
})

export const {SetGitProfile} = GithubProfileSlice.actions

export default GithubProfileSlice.reducer