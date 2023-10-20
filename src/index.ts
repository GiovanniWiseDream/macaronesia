import { Server } from "./server";
import { keyvault } from "./keyvault";
let server = new Server().app;
let port = parseInt(process.env.PORT) || 3001;
const hostname = process.env.HOST_NAME || "127.0.0.1";
let secret = new keyvault();

if (secret) {
  console.log(secret);
}
server.listen(port, hostname, () => {
  console.log(`Server is running at port ${port}`);
  console.log(`Host Name: ${hostname}`); //Only For Dev, deleted in Production
});
