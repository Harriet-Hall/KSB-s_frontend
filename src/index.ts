import { server } from "./mocks/node.ts";

server.listen();

async function app() {
  const response = await fetch("https://m7sq42zktc.execute-api.eu-west-2.amazonaws.com/prod/");
  const user = await response.json();
  console.log(user);
}

app();
