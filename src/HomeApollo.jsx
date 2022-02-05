import { gql, useQuery } from "@apollo/client";

const GET_HomeDebates = gql`
  query gethomeDebates {
    homeDebates(offset: 0, size: 7) {
      id
      title
      creatorName
    }
  }
`;

function HomeApollo() {
  const { loading, error, data } = useQuery(GET_HomeDebates);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log(data);
  return <></>;
}

export default HomeApollo;
