import React from 'react';
import { Link } from 'react-router-dom';

const AlertBox = () => {

    const roomPassword = 'WAm97kdo'

    return (
        <div className="alert alert-info">

            {
                roomPassword ? (
                    <p>
                        Passord of last quize organised: <b>{roomPassword}</b>
                    </p>
                ) : (
                    <p>
                        Copy quiz id from hear :- <Link to='/previous-quizes' >My Quizes</Link>
                    </p>
                )
            }

        </div>
    )
}

export default AlertBox
