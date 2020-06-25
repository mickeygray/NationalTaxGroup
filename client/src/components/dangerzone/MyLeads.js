import React, { Fragment } from 'react'

const MyLeads = () => {
    return (
     
      <Fragment>    
        <form className='form-text'>
        <input
          type='text'
          name='text'
          placeholder='Search...' 
        />
        
        <input
          type='submit'
          value='My Leads'
          className='btn-success btn-sm btn'

        />
        </form>  
</Fragment>
  
    )
}

export default MyLeads
