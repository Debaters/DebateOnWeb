import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ModalCreateRoom = ({ isOpen, onCloseEvent, getData, setModalIsOpen }) => {
  const [data, setData] = useState({ title: "", description: "" });
  // 아래 input value으로 넣어주기 위해
  const { title, description } = data;
  // console.log(isOpen);
  function handleValue(e) {
    const { name, value } = e.target;
    console.log(e.target);
    setData({
      ...data,
      [name]: value,
    });
  }
  const onClickCreateRoom = async (title, description) => {
    console.log("클릭 누름");
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

  return (
    <>
      {isOpen ? (
        <ModalLayer onClick={() => setModalIsOpen(false)}>
          <ModalContent>
            <button onClick={onCloseEvent}>창 닫기</button>
            <div>
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
              <button
                onClick={() => onClickCreateRoom(data.title, data.description)}
              >
                방 만들기
              </button>
            </div>
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
  background-color: white;
  width: 70%;
  border: 1px solid gray;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
