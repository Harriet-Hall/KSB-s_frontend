import { server } from "./mocks/node.ts";

server.listen();

async function app() {
  const response = await fetch("http://18.130.252.77:5000/");
  const user = await response.json();
  console.log(user);
}

app();
