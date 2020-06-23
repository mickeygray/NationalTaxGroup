import React, { useContext } from 'react';
import LienContext from '../../context/contact/lienContext';


const Upload = () => {
  const lienContext = useContext(LienContext);



  const onSubmit = e => {
    e.preventDefault();
    lienContext.addList();
  };

 return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input type="file"/>
        <input
          type='submit'
          value='upload json'
          className='btn btn-dark btn-block'
        />
      </form>
    </div>
  );
};

export default Upload;