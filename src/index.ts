import { Server } from "./server";

let server = new Server().app;
let port = parseInt(process.env.PORT) || 3001;

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  // console.log(`Host Name: ${hostname}`); //Only For Dev, deleted in Production
});
