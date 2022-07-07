import mongoose, { ConnectionStates } from "mongoose";

type Connection = { status: ConnectionStates };

const mongoConnection: Connection = {
  status: ConnectionStates.disconnected,
};

export const connect = async () => {
  if (mongoConnection.status) console.log("Already Connected");

  if (mongoose.connections.length > 0) {
    mongoConnection.status = mongoose.connections[0].readyState;

    if (mongoConnection.status === 1) return mongoose.connections[0];

    await mongoose.disconnect();
  }

  mongoConnection.status = ConnectionStates.connecting;

  await mongoose.connect(process.env.MONGO_URL ?? "");

  mongoConnection.status = ConnectionStates.connected;
};

export const disconnect = async () => {
  if (mongoConnection.status) await mongoose.disconnect();
};
