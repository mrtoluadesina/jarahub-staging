import socket from 'socket.io';

export default {
  start: (appServer: any, handler: any) => {
    const io = socket(appServer);
    handler(io);
    return io;
  },
};
