import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import axios from "axios";

import ModalCreateRoom from "./Home/ModalCreateRoom";

const Home = ({ props }) => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [offset, setOffset] = useState(1);
  let history = useHistory();
  const getData = async () => {
    const { data: response } = await axios.post(
      "/graphql",
      {
        query: `query gethomeDebates {
      homeDebates(offset:0, size:7){id title creatorName}
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

  const fetchMoreData = async (offset) => {
    await axios
      .post(
        "/graphql",
        {
          query: `query gethomeDebates {
  homeDebates(offset:${offset}, size:5){id title creatorName}
  }`,
        },
        {
          headers: {
            Accept: "application/json",
            "Api-Key": "demoKeyOfApi",
            "Content-Type": "application/json",
          },
        }
      )
      .then((reponse) => {
        const newData = reponse.data.data.homeDebates;
        const mergeData = data.concat(newData);
        setData(mergeData);
      });
  };

  function checkScroll() {
    const scrollHeight = mainScrollSection.scrollHeight;
    const scrollTop = mainScrollSection.scrollTop;
    const clientHeight = mainScrollSection.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setOffset(offset + 1);
      fetchMoreData(offset);
    }
  }

  const mainScrollSection = document.querySelector(".main");
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    mainScrollSection &&
      mainScrollSection.addEventListener("scroll", checkScroll);

    return () => {
      mainScrollSection &&
        mainScrollSection.removeEventListener("scroll", checkScroll);
    };
  });

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
  height: 120px;
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
