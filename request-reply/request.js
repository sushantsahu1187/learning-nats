const { connect, StringCodec, Empty } = require("nats");
const host = { servers: "127.0.0.1:4222" };

const run = async () => {
  const nc = await connect(host);
  const sc = StringCodec();
  await nc
    .request("time", Empty, { timeout: 2000 })
    .then((m) => {
      console.log(`got response: ${sc.decode(m.data)}`);
    })
    .catch((err) => {
      console.log(`problem with request: ${err.message}`);
    });

  await nc.close();
};

run();
