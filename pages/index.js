import RepoList from "@/components/RepoList";
import { getGithubRepoByUser, getGithubUser } from "@/services/api";
import { useEffect, useState } from "react";

export default function Home() {
    const [User, setUser] = useState('')
    const [IsLoading, setLoading] = useState(false)
    const [GithubData, setGithubData] = useState({
        user: '',
        repo: [],
        total_repo: 0,
        total_page: 0,
        status: false
    })
    const [Params, setParams] = useState({
        per_page: 40,
        page: 1
    })

    const getRepoByUser = async () => {
        setLoading(true)

        try {
            const data = await getGithubRepoByUser(User, Params)
            const user = await getGithubUser(User)
    
            setGithubData({...GithubData,
                user: user.login,
                repo: data,
                total_repo: user.public_repos,
                total_page: Math.ceil(user.public_repos / Params.per_page),
                status: true
            })
            window.scrollTo({ top: 0, behavior: 'auto' })
        } catch (error) {
            setGithubData({...GithubData,
                user: '',
                repo: [],
                total_repo: 0,
                total_page: 0,
                status: false
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        if (User) getRepoByUser()
    }, [Params])

    return (
      <div className="min-h-screen p-5">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Github User</span>
                </label>
                <div className="flex gap-4">
                    <input type="text" placeholder="eg: rizk1" className="input input-bordered w-full max-w-xs" onChange={e => setUser(e.target.value)} />
                    <button className={`btn btn-primary ${IsLoading ? 'loading' : ''}`} onClick={() => getRepoByUser()} disabled={!User || IsLoading}>Search</button>
                </div>
            </div>
        
            <div className="mt-12 w-2/3 m-auto border-current p-4">
                {GithubData.status ? 
                    <div>
                        <h3 className="text-2xl font-medium">Github User {GithubData.user}</h3>
                        <p>Repository ({GithubData.total_repo})</p>
                    </div>
                : <h3 className="text-2xl font-medium text-center">Github User Not Found</h3>
                }

                {GithubData.repo.length ?
                    GithubData.repo.map((v, k) => {
                        return (
                            <div key={k}>
                                <RepoList data={v} />
                            </div>
                        )
                    })
                : ''
                }

                {GithubData.total_page > 1 &&
                    <div className="flex justify-center gap-4 mt-6">
                        <div>
                            <button className="btn btn-sm md:btn-md gap-2 normal-case lg:gap-3" disabled={Params.page === 1 || IsLoading} onClick={() => setParams({...Params, page: (Params.page - 1)})}>
                                <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg> 
                                <div className="flex flex-col items-start">
                                    <span>Prev</span>
                                </div>
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-sm md:btn-md gap-2 normal-case lg:gap-3" disabled={Params.page === GithubData.total_page || IsLoading} onClick={() => setParams({...Params, page: (Params.page + 1)})}>
                                <div className="flex flex-col items-end">
                                    <span>Next</span>
                                </div> 
                                <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
                            </button>
                        </div>
                    </div>
                }
            </div>
      </div>
    )
  }