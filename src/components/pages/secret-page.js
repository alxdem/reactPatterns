import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLoggedIn }) => {
  if(isLoggedIn) {
    return(
      <div className='jumbotrom text-center'>
        <h3>Эта страница полна секретов!</h3>
      </div>
    );
  }

  return <Redirect to={'/login'} />;
};

export default SecretPage;