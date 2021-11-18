import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';

const Debate_title = ()=>{
    const [data, setData] = useState(null);

    
    useEffect( () => {
        const getData = async () =>{
            const {
                data: {data}
            } = await axios.post("/graphql",
                        {
                            // id 부분 변수로 변경 필요 $id! 쓰면 되는걸로 알고있음
                            query: `{debate(id:"1"){title}}`
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
        }

        getData();
    }, []);

    return (
        <Fragment>
            <div>
                {data && 
                    <div>
                        <h1>{data.title}</h1>
                    </div>
                }
            </div>
        </Fragment>
    );
}

export default Debate_title;