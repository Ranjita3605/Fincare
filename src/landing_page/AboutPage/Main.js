import React from 'react';

function Main() {
    return (  
        <div  style={{backgroundColor:'#66BB6A', padding:'80px', borderRadius:'10px', marginBottom:'5px',width:'100%',height:'60vh'}}>
            <h1 className='main-heading' style={{color:'white', textAlign:'center', fontFamily:'Arial', fontSize:'50px',fontWeight:'bold'}}>About Us</h1>
            <p className='main-paragraph' style={{color:'#F1F8E9', textAlign:'center', fontFamily:'Arial',padding: '50px 150px 50px 150px', fontSize:'18px' }}>Fincare was created with a simple goal — to make government financial support easily accessible to every farmer, regardless of literacy level or language barriers. We understand that many rural communities struggle to navigate complex online portals and banking procedures, which often leads to missed opportunities and dependence on intermediaries. </p>
        </div>
    );
}

export default Main;