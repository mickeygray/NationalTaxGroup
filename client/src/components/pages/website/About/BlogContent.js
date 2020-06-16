import React from "react";

const BlogContent = ({
 body,
 img,
 title,
 postDate,
 teaser,
 toggleVisibility,
 showReadMore
}) => (
 <div className='blog-details'>
  {!showReadMore && (
   <div className='blog-image-container'>
    <img src={img} alt='' />
   </div>
  )}
  <h3 className='uk-card-title'>{title}</h3>
  <div className='post-date'>{postDate}</div>
  <div>
   {teaser}&hellip;&nbsp;{!showReadMore && body}
  </div>
  {showReadMore && (
   <div className='button-container'>
    <button
     type='button'
     className='uk-button uk-button-primary uk-button-small'
     onClick={toggleVisibility}>
     Read more
    </button>
   </div>
  )}
 </div>
);

export default BlogContent;
