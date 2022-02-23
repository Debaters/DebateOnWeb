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

const client = new ApolloClient({
  uri: "http://debaters.world:9090",
  cache: new InMemoryCache(),
  link: authLink.concat(httplink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
