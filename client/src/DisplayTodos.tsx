import { useQuery, gql } from "@apollo/client";

export function DisplayTodos() {
  const GET_LOCATIONS = gql`
    query GetTodos {
      getTodos {
        title
        user {
          username
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getTodos.map((todo: any, ind: number) => (
    <div key={ind}>
      <p>
        {todo.title} by {todo.user.username}
      </p>
    </div>
  ));
}
