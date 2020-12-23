


import { Button } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";

function Home(props) {


    


    return (
        <div>
            <h2>A simple home page, providing links to the other pages:</h2>
            <Link to="/account">
                <Button>
                    Account manipulation
                </Button>
            </Link>
            <Link to="/link-strategy">
                <Button>
                    Link strategies to subaccounts
                </Button>
            </Link>
            <Link to="/trades">
                <Button>
                    See trades
                </Button>
            </Link>
            

        </div>
    )
}


export default withRouter(Home);