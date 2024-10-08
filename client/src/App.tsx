// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";
import { DisplayTodos } from "./DisplayTodos";

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <DisplayTodos />
    </div>
  );
}
