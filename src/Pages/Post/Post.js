import React from 'react'

export default function Post({ postData, authUser, handleClickLike }) {
  return (
    <li>
      <div className='flex items-center'>
        <a href={`/posts/${postData._id}`}>{postData.title}</a>
        <a href={`http://${postData.url}`} className="text-slate-500 ml-2 mr-2">({postData.url})</a>
        <button 
          onClick={handleClickLike}
          className='p-1'
        >[{postData.likedBy.length}] 
        {!postData.likedBy.some(u => u === authUser.id) 
          ? '✊'
          : '👍'
        }
        </button>
      </div>
    </li>
  )
}