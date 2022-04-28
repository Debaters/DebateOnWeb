import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { debaterRoom } from "../../types/home";
import { useHistory } from "react-router-dom";

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { responsePathAsArray } from "graphql";

// const HOME_QUERY = gql`
//   query gethomeDebates($offset: Int!, $size: Int!) {
//     homeDebates(offset: $offset, size: $size) {
//       id
//       title
//       creatorName
//     }
//   }
// `;

function HomeTest() {
  const [offset, setOffset] = useState<number>(0);
  const [data, setData] = useState<debaterRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  // const { data } = useQuery(HOME_QUERY, {
  //   variables: {
  //     offset: offset,
  //     size: 7,
  //   },
  // });

  const getData = async () => {
    const response = await fetch("/graphql", {
      body: `{"query":"{homeDebates(offset:${offset},size:6){id title creatorName}}"}`,
      headers: {
        Accept: "application/json",
        "Api-Key": `${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log("1, is it workin?");
    const result = await response.json();
    const a: debaterRoom[] = result.data.homeDebates;
    setData((prev: debaterRoom[]) => [...prev, ...a]);
    setIsLoading(true);
    console.log("2, set true");
  };

  function createObserver(isLoading: boolean) {
    if (isLoading) {
      console.log("데이터 패치 후 옵저버 생성하기");

      const observer: IntersectionObserver = new IntersectionObserver(
        (entries) => {
          if (data.length === 0) return;
          if (!entries[0].isIntersecting) return;
          console.log("3, 교차");
          setOffset((prev) => prev + 1);
        }
      );

      const observeTarget = observerRef.current as Element;
      observer.observe(observeTarget);
    } else {
      console.log("최초 false이기 때문에 무조건 요게 실행되야함");
    }
  }

  useEffect(() => {
    getData();
  }, [offset]);

  useEffect(() => {
    createObserver(isLoading);
  }, [isLoading]);

  const history = useHistory();
  const onClickList = (id: string) => {
    history.push({ pathname: "/room", state: { debaterId: id } });
    console.log(id);
  };

  return (
    <Frame>
      {data &&
        data.map((debaterRoom: debaterRoom) => (
          <Card
            key={debaterRoom.id}
            onClick={() => onClickList(debaterRoom.id)}
          >
            <h3>{debaterRoom.title}</h3>
            <p>{debaterRoom.creatorName}</p>
          </Card>
        ))}
      <ObserveDiv ref={observerRef}></ObserveDiv>
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

const ObserveDiv = styled.div`
  visibility: hidden;
  height: 30px;
`;

export default HomeTest;
