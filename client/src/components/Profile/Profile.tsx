import { Link, useParams } from 'react-router-dom';

const Profile = () => {
    const { teste } = useParams();
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>{teste}</div>
            </div>
            <div>This is the profile page.</div>
            <Link to='/'>
                <button>
                    Home
                </button>
            </Link>
        </div>
    );
}

export default Profile;