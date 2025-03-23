import { server } from "./mocks/node.ts";

server.listen();

async function app() {
  const response = await fetch("http://35.176.157.141:5000/");
  const user = await response.json();
  console.log(user);
}

app();
