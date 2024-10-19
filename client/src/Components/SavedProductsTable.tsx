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

    //if (loggedIn)
        //access products table for this user and return json data

        //Iterate through data and present in table. Have table be function to 
        //conditionally show below

    return (
        <>
            {loggedIn ? (
                <h1>I guess you're logged in</h1>
                //show the function that creates the table
            ) : (
                <h1>I guess youre not logged in</h1>
            )}
        </>
    );
  };

  export default SavedProductsTable;