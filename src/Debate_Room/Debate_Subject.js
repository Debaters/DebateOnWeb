import React, {useEffect} from 'react';
import axios from 'axios';


// API연동하여 주제를 가져온다.

const Debate_Subject = ()=>{
    useEffect( () => {
            axios.get('/graphql', {
            body: `{"query":"{titles}"}`,
            headers: {
            Accept: "application/json",
            "Api-Key": "demoKeyOfApi",
            "Content-Type": "application/json",
            }
        }).then( response => console.log ( response.data )
      ); 
    }, [])

    return (
        <div>
            LandingPage

        </div>
    );
}

export default Debate_Subject;