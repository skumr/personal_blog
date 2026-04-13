import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <div>
            <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>
                    Home
                </Link>
                <Link to="/posts" style={{ marginRight: '1rem' }}>
                    Posts
                </Link>
                <Link to="/about">About</Link> 
            </nav>
        </div> 
    );
}