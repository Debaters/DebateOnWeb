import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import axios from "axios";

import ModalCreateRoom from "./Home/ModalCreateRoom";

const Home = ({ props }) => {
  const [data, setData] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let history = useHistory();

  const getData = async () => {
    const { data: response } = await axios.post(
      "/graphql",
      {
        query: `query gethomeDebates {
      homeDebates(offset:1, size:5){id title creatorName}
    }`,
      },
      {
        headers: {
          Accept: "application/json",
          "Api-Key": "demoKeyOfApi",
          "Content-Type": "application/json",
        },
      }
    );
    setData(response.data.homeDebates);
  };
  useEffect(() => {
    getData();
  }, []);

  const onClickList = (id) => {
    history.push({ pathname: "/routing", state: { debaterId: id } });
  };
  const onClickModal = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Frame>
      <ButtonWrapper>
        <AddDebateRoomButton onClick={onClickModal}>
          방만들기
        </AddDebateRoomButton>
      </ButtonWrapper>
      {data &&
        data.map((debaterRoom, index) => (
          <Card
            key={debaterRoom.id}
            onClick={() => onClickList(debaterRoom.id)}
          >
            <h3>{debaterRoom.title}</h3>
            <p>{debaterRoom.creatorName}</p>
          </Card>
        ))}
      <ModalCreateRoom
        isOpen={modalIsOpen}
        onCloseEvent={onCloseModal}
        getData={getData}
        setModalIsOpen={setModalIsOpen}
      />
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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  margin: 5px;
`;
const AddDebateRoomButton = styled.button``;
export default Home;
