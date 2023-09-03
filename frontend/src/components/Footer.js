import React  from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation()

  return (
    <>
      {
        location.pathname === '/sign-up' ?
        (<></>) :
          location.pathname === '/sign-in' ?
            (<></>)
           :
          (<footer className="footer">
            <p className="footer__text">&copy; 2021 Mesto Russia</p>
          </footer>)
      }
    </>
  )
}

export default Footer