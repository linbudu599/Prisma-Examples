import "reflect-metadata";
import { ItemType } from "./../types/Todo.type";
import {
  createClient,
  everything,
  QueryRequest,
  MutationRequest,
} from "../generated/genql";

const client = createClient({
  url: "http://localhost:5999/graphql",
});

async function main() {
  // common select fields
  const selectFieldsQuery = await client.query({
    QueryAllTodos: {
      ...everything,
      creator: {
        ...everything,
      },
    },
  });

  console.log("selectFieldsQuery: ", selectFieldsQuery);

  const fields: MutationRequest = {
    CreateUser: [
      {
        createParams: {
          name: `${Math.floor(Math.random() * 1000)}*Name`,
        },
      },
      {
        ...everything,
        todos: {
          ...everything,
        },
      },
    ],
  };

  const selectFieldsMutation = await client.mutation(fields);

  console.log("selectFieldsMutation: ", selectFieldsMutation);

  // chain syntax
  const chainCreateTodo = await client.chain.mutation

    .CreateTodo({
      createParams: {
        title: `${Math.floor(Math.random() * 1000)}*Title`,
        type: ItemType.BUG,
        // FIXME: seems like to be bug of genql
        userId: Number(selectFieldsMutation.CreateUser.id),
      },
    })
    .get({ ...everything });

  console.log("chainCreateTodo: ", chainCreateTodo);
}

main();
