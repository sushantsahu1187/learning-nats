const { connect, StringCodec } = require("nats");
const host = { servers: "127.0.0.1:4222" };

const run = async () => {
  const sc = StringCodec();
  const nc = await connect(host);

  nc.publish("hello", sc.encode("world"));
  nc.publish("hello", sc.encode("again"));

  await nc.drain();
};

run();
