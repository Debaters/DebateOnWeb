import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { debaterRoom } from "../../types/home";
import homeQuery from "./HomeQuery";

const OFFSET = 0;
const SIZE = 7;
const GET_HomeDebates = gql(homeQuery.getHomeDebates(OFFSET, SIZE));

function HomeApollo() {
  const { loading, error, data } = useQuery(GET_HomeDebates);
  let history = useHistory();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const onClickList = (id: string) => {
    history.push({ pathname: "/routing", state: { debaterId: id } });
  };
  return (
    <Frame>
      {data?.homeDebates?.map((debaterRoom: debaterRoom) => (
        <Card key={debaterRoom.id} onClick={() => onClickList(debaterRoom.id)}>
          <h3>{debaterRoom.title}</h3>
          <p>{debaterRoom.creatorName}</p>
        </Card>
      ))}
    </Frame>
  );
}
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

export default HomeApollo;
