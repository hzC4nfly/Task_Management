import React from 'react'
const SocialForms = React.memo(
  function SocialForms(props) {
  return (
    <>
        <div className="divider-container">
                <hr className="line" />
                <span className="text">{props.title}</span>
                <hr className="line" />
        </div>
        <div className='registerWays'>
            <div className='facebookForm'id={props.id}>
              <i className='fa fa-facebook'></i>
              <p>facebook</p>
            </div>
            <div className='googleForm' id={props.id}>
              <i className='fa fa-google'></i>
              <p>google</p>
            </div>
         </div>
    </>
    
  )
}
);
export default SocialForms;