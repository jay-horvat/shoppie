import React from 'react';
import { useNavigate } from 'react-router-dom';

const SavedProductsTable: React.FC = () => {

    let loggedIn: boolean;
    if (!localStorage.getItem('token')) {
        loggedIn = false;
    }
    else {
        loggedIn = true;
    }



    return (
        <>
            {loggedIn ? (
                <h1>I guess you're logged in</h1>
            ) : (
                <h1>I guess youre not logged in</h1>
            )}
        </>
    );
  };

  export default SavedProductsTable;