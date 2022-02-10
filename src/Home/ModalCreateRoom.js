import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const ModalCreateRoom = ({ isOpen, onCloseEvent, getData, setModalIsOpen }) => {
  const [data, setData] = useState({ title: "", description: "" });
  const { title, description } = data;
  function handleValue(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  const onClickCreateRoom = async (title, description) => {
    await axios
      .post(
        "/graphql",
        {
          query: `mutation createDebate($title:String!, $description:String!, $creatorName:String!) {
          createDebate(title:$title, description:$description, creatorName:$creatorName)
        }`,
          variables: {
            title: title,
            description: description,
            creatorName: "아이디라우",
          },
        },
        {
          headers: {
            Accept: "application/json",
            "Api-Key": "demoKeyOfApi",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => setModalIsOpen(false))
      .then(() => getData());
  };

  function onMouseUpOffModal(e) {
    if (e.target.className === "css-1gkwgdl") {
      setModalIsOpen(false);
    } else {
      return;
    }
  }
  return (
    <>
      {isOpen ? (
        <ModalLayer onClick={(e) => onMouseUpOffModal(e)}>
          <ModalContent>
            <ModalHeader>
              <CloseBtn onClick={onCloseEvent}>
                <Circle />
              </CloseBtn>
            </ModalHeader>
            <ModalSection>
              제목 :
              <input
                type='text'
                name='title'
                placeholder='제목'
                value={title}
                onChange={handleValue}
                required
              />
              설명 :
              <input
                type='text'
                name='description'
                placeholder='설명'
                value={description}
                onChange={handleValue}
                required
              />
            </ModalSection>
            <ModalFooter>
              <CreateRoomBtn
                onClick={() => onClickCreateRoom(data.title, data.description)}
              >
                방 만들기
              </CreateRoomBtn>
            </ModalFooter>
          </ModalContent>
        </ModalLayer>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalCreateRoom;

const ModalLayer = styled.div`
  display: none; // hidden by default
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-rows: 50px 3fr 1fr;
  background-color: white;
  width: 50%;
  border: 1px solid gray;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const CloseBtn = styled.button`
  /* background-color: #3281f6; */
  background-color: black;
  height: 100%;
  border: none;
`;

const ModalHeader = styled.header`
  background-color: black;
  display: flex;
  justify-content: flex-end;
`;

const ModalSection = styled.section`
  background-color: wheat;
`;

const ModalFooter = styled.footer`
  background-color: red;
  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 100%;
  background-color: red;
  text-align: center;
`;

const CreateRoomBtn = styled.button`
  width: 100px;
  height: 90%;
  background-color: #3281f6;
  border: none;
`;
