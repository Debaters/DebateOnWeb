import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import { offsetLimitPagination } from "@apollo/client/utilities";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Accept: "application/json",
      "Api-Key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
  };
});

const httplink = createHttpLink({
  uri: "/graphql",
});

// 캐시에서 서로 다른 리스트로 보기 떼문에 데이터가 지워짐, 필드 policy를 수정해서 캐시 행동을 고쳐줄것임
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        homeDebates: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://debaters.world:9090",
  cache: cache,
  link: authLink.concat(httplink),
});

ReactDOM.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
    <App />
    {/* </ApolloProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
