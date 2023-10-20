import { Server } from "./server";

let server = new Server().app;
let port = parseInt(process.env.PORT) || 3001;
const hostname = process.env.HOST_NAME || "127.0.0.1";
if (process.env) {
  console.log(process.env);
}
server.listen(port, hostname, () => {
  console.log(`Server is running at port ${port}`);
  console.log(`Host Name: ${hostname}`) //Only For Dev, deleted in Production
});
