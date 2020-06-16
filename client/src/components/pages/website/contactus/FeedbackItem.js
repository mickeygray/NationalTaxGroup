import React from 'react';



const FeedbackItem = ({feedback:{body, clientName, clientPicture}}) => {
        return (
        <div className="card text-center">
                
                <p>
                    {body}
                </p>
                <h3>{clientName}<span style={{float:'right'}}><img src={clientPicture} alt="" className="round-img" style={{width:"60px"}} /></span></h3>
        
        </div>
        );
    
};



export default FeedbackItem
