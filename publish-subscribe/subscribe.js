const { connect, StringCodec } = require("nats");
const host = { servers: "127.0.0.1:4222" };

const run = async () => {
  const sc = StringCodec();
  const nc = await connect(host);
  const sub = nc.subscribe("hello");
  (async () => {
    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }
    console.log("subscription closed");
  })();
};

run();
