import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Home = () => {
  const [data, setData] = useState("");
  const getData = async () => {
    const response = await fetch("/graphql", {
      body: `{"query":"{homeDebates{title creatorName}}"}`,
      headers: {
        Accept: "application/json",
        "Api-Key": "demoKeyOfApi",
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());
    setData(response.data.homeDebates);
  };

  useEffect(() => {
    getData();
  }, []);

  const onClickList = () => {
    console.log("handling");
  };
  return (
    <Frame>
      {data &&
        data.map((debates, index) => (
          <Card key={index} onClick={onClickList}>
            <h3>{debates.title}</h3>
            <p>{debates.creatorName}</p>
          </Card>
        ))}
    </Frame>
  );
};

const Frame = styled.div`
  width: 80vw;
`;

const Card = styled.div`
  height: 100px;
  min-width: 300px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  margin: 20px 0px 15px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  cursor: pointer;
`;

export default Home;
