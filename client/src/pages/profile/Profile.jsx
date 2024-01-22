import Header from '../../components/header/Header'
import Body from '../../components/body/Body'
import ProfileSection from '../../components/profileSection/ProfileSection'
import { useState, useEffect, } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import './profile.css'

export default function Profile() {
    const [userFetched, setUserFetched] = useState({});
    const params = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/?username=${params.username}`);
            setUserFetched(res.data);
        }
        fetchUser();
    }, [params.username]);

    return (
        <>
            <Header />
            <div className="profileContainer">
                {Object.keys(userFetched).length !== 0 ? <ProfileSection user={userFetched} /> : null}
                <hr className="profileHr" />
                <div className="profileBottom">
                    <Body username={params.username} page="profile" />
                </div>
            </div>
        </>
    )
}
