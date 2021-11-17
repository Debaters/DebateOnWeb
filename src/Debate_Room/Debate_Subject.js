import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';

const Debate_Subject = ()=>{
    const [data, setData] = useState(null);

    
    useEffect( () => {
        const getData = async () =>{
            const {
                data: {data}
            } = await axios.post("/graphql",
                        {
                            query: `{debate(id:"id"){description creatorName}}`
                        },
                        {
                            headers: {
                            "Accept": "application/json",
                            "Api-Key": "demoKeyOfApi",
                            "Content-Type": "application/json"
                            }
                        }
            );
            setData(data.debate);
            console.log(data.debate);
        }

        getData();
    }, []);

    return (
        <Fragment>
            <div>
                {data && 
                    <div>
                        creator : {data.creatorName} <br/>
                        subject : {data.description}
                    </div>
                }
            </div>
        </Fragment>
    );
}

export default Debate_Subject;