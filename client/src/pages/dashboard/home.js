import React from 'react'
import axios, { all } from 'axios';
import Sidebar from '../../components/Sidebar'
import HomeMain from '../../components/HomeMain'
import { jwtDecode } from 'jwt-decode'

const initialState = {
    name: "",
    gender : "",
    age : 0,
    email: "",
    userId:""
  };

export default function Home(){
    const [data, setData] = React.useState(null);
    // console.log(data);
    const [error, setError] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(initialState);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        // Decode the token to get user information
            const decodedToken = jwtDecode(token);
            // console.log(decodedToken);
            setUserInfo(decodedToken);
        }
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('No token found');
            }
    
            const response = await axios.get('http://localhost:4500/api/v1/dashboard', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            // console.log(response.data.readings)
            setData(response.data);
          } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
          }
        };
    
        fetchData();
      }, []);


    return(
        <div className="home-container">
            <Sidebar name={userInfo.name || 'Loading...'} gender={userInfo.gender} age={userInfo.age} userId={userInfo.userId || "Loading..."} />
            {data ? (
                <HomeMain data={data} />
            ) : (
                <p>Loading...</p>
            ) }
        </div>
    )
}