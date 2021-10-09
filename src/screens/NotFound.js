import { Link } from 'react-router-dom';
import './NotFound.css';


const NotFound = () =>{
    return(
        <div className="Notfound_div">
            <h1>404 Page</h1>
            <h3>This page doesn't exist!</h3>
            <h3><Link to="/">Back to Store</Link></h3>
        </div>
    )
}

export default NotFound;