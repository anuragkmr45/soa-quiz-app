import React from 'react';
import { Link } from 'react-router-dom';

const AlertBox = ({ text }) => {
    return (
        <div className="alert alert-info">
            Copy quiz id from hear <Link to='/previous-quizes' >My Quizes</Link>
        </div>
    )
}

export default AlertBox
