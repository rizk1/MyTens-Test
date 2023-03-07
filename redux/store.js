import { configureStore } from "@reduxjs/toolkit";
import gitProfileReducer from './reducers/githubProfile';

export default configureStore({
    reducer: {
        gitProfile: gitProfileReducer
    }
})