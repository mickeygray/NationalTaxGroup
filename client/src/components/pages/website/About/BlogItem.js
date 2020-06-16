import React, { useState, useCallback } from "react";
import Modal from "./Modal";
import BlogContent from "./BlogContent";

const BlogItem = ({ blog }) => {
 const [isPreviewing, setPreviewState] = useState(false);
 const [showModal, setModalState] = useState(false);

 const toggleVisibility = useCallback(() => {
  setModalState(prevState => !prevState);
 }, []);

 const handleMouseEnter = useCallback(() => {
  setPreviewState(true);
 }, []);

 const handleMouseLeave = useCallback(() => {
  setPreviewState(false);
 }, []);

 return (
  <div
   className='card'
   onMouseEnter={handleMouseEnter}
   onMouseLeave={handleMouseLeave}>
   <div>
    <img src={blog.img} alt='' />
    {isPreviewing && !showModal ? (
     <BlogContent {...blog} showReadMore toggleVisibility={toggleVisibility} />
    ) : null}
    {showModal && <Modal {...blog} toggleVisibility={toggleVisibility} />}
   </div>
  </div>
 );
};

export default BlogItem;
