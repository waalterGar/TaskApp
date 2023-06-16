import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile , setProfile] = useState({
        name: "",
        mail: "",
        phone: "",
        birthdate: "",
        gender: ""
    });

    useEffect(() => {
        const loadProfile = async () => {
            console.log("user",user);
            if(user){
               if(user.role === "trainer"){
                const response = await getTrainer(user.id, user.token);
                console.log("getTainer", response);
                setProfile({
                    name: response.name,
                    mail: response.description,
                    phone: response.session_date,
                    birthdate: response.trainer_notes,
                    gender: response.gender
                });
            }
            if(user.role === "dietitian"){
                const response = await getDietitian(user.id, user.token);
                console.log("getDietirian",response);
                setProfile(response);
            }
        }
        loadProfile();
    }
  }, [user]); 

  return (
    <div>
        <h1>Profile</h1>
        <h2>Name: {profile.name}</h2>
        <h2>Mail: {profile.mail}</h2>
        <h2>Phone: {profile.phone}</h2>
        <h2>Birthdate: {profile.birthdate}</h2> 
    </div>
    )
        
}
  
  export default ProfilePage;