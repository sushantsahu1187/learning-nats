const { connect } = require("nats");

const run = async () => {
  const host = { servers: "127.0.0.1:4222" };
  try {
    const nc = await connect(host);
    console.log(`connected to ${nc.getServer()}`);
    const done = nc.closed();
    await nc.close();
    const err = await done;
    if (err) {
      console.log(`error closing:`, err);
    }
  } catch (error) {
    console.log(`error connecting to ${JSON.stringify(error)}`);
  }
};

run();
