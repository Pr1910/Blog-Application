import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import HomePost from '../components/HomePost'

const MyBlogs = () => {

    const [posts,setPosts]=useState([])
    return (
        <div>
            <Navbar />
            <div className="px-8 md:px-[200px] min-h-[80vh]">
                {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResults ?
                    posts.map((post) => (
                        <>
                            <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                                <HomePost key={post._id} post={post} />
                            </Link>
                        </>

                    )) : <h3 className="text-center font-bold mt-16">No posts available</h3>}
            </div>
            <Footer />
        </div>
    )
}

export default MyBlogs