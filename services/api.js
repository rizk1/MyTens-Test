import axios from 'axios'

const GithubAPI = `https://api.github.com/`

export const getGithubRepoByUser = async (user, params) => {
    const response =  await axios.get(`${GithubAPI}users/${user}/repos`, {params})
    return response.data
}

export const getGithubUser = async (user) => {
    const response =  await axios.get(`${GithubAPI}users/${user}`)
    return response.data
}