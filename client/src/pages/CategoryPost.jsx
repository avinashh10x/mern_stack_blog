import React, { useEffect, useState } from 'react'
import { DummyPosts } from '../data'
import PostItem from '../component/PostItem'
import axios from 'axios'
import Loader from './../component/Loader';
import { useParams } from 'react-router-dom';

const categoryPost = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [posts, setPosts] = useState([])
  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/posts/categories/${category}`)
        setPosts(response?.data)

      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }
    fetchPosts();
  }, [category])

  if (isLoading) {
    return <Loader />
  }


  return (
    <>
      <section className="posts">
        {posts.length > 0 ? <div className="container posts__container">
          {
            posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt }) => <PostItem key={id} thumbnail={thumbnail} title={title} postID={id} category={category} description={description} authorID={creator} createdAt={createdAt} />)
          }

        </div> : <h2 className='center'>No Posts</h2>
        }
      </section>
    </>
  )
}


export default categoryPost