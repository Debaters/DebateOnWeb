import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = ({ props }) => {
  const [data, setData] = useState("");
  let history = useHistory();

  const getData = async () => {
    const response = await fetch("/graphql", {
      body: `{"query":"{homeDebates(offset:5,size:5){title creatorName}}"}`,
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
    history.push("/routing");
  };
  return (
    <Frame>
      {data &&
        data.map((debaterRoom, index) => (
          <Card key={index} onClick={onClickList}>
            <h3>{debaterRoom.title}</h3>
            <p>{debaterRoom.creatorName}</p>
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
