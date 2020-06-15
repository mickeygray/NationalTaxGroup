import React, { useContext, useState, Link } from "react";

const BlogModal = ({
  blog: { id, img, title, teaser, body, postDate, visible },
}) => {
  const pageContext = useContext(PageContext);
  const blog = { id, img, title, teaser, body, postDate, visible };
  const { setInvisible } = pageContext;

  return (
    <div className='bg-light'>
      <nav className='navbar'>
        <button onClick={() => setInvisible(blog)}>x</button>
        <h3 className='lead text-primary text-center'>{title}</h3>
      </nav>
    </div>
  );
};

export default BlogModal;
