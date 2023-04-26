import React, { useState } from 'react'
type LoaderProps = {
    active:Boolean
};

const Loader: React.FC<any> = (props: LoaderProps) => {
    const [active, setActive] = useState(false);

  return (
    // <div hidden={active} className="loading-overlay" >
    <div className="bounce-loader">
      <div className="bounce1" style={{backgroundColor:"black"}} />
      <div className="bounce2" style={{backgroundColor:"white"}}/>
      <div className="bounce3" style={{backgroundColor:"blue"}}/>
    </div>
  // </div>
  )
}

export default Loader
