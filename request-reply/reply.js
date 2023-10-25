const { connect, StringCodec } = require("nats");
const host = { servers: "127.0.0.1:4222" };

const run = async () => {
  const nc = await connect(host);
  const sc = StringCodec();
  const subscription = nc.subscribe("time");
  (async (sub) => {
    console.log(`listening for ${sub.getSubject()} requests...`);
    for await (const m of sub) {
      if (m.respond(sc.encode(new Date().toISOString()))) {
        console.info(`[time] handled #${sub.getProcessed()}`);
      } else {
        console.log(`[time] #${sub.getProcessed()} ignored - no reply subject`);
      }
    }
    console.log(`subscription ${sub.getSubject()} drained.`);
  })(subscription);

  await nc.closed().then((err) => {
    let m = `connection to ${nc.getServer()} closed`;
    if (err) {
      m = `${m} with an error: ${err.message}`;
    }
    console.log(m);
  });
};

run();
