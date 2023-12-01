const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
const path = require('path');
const crypto = require('crypto');

const paymentProto = protoLoader.loadSync(path.resolve(__dirname, 'payment.proto'));
const PaymentPackage = grpc.loadPackageDefinition(paymentProto);

const server = new grpc.Server();

server.addService(PaymentPackage.PaymentService.service, {
  pay: (call, callback) => {
    const tid = crypto.randomUUID();
    const status = "confirmed";

    callback(null, {
      tid,
      status
    });
  },
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running at 127.0.0.1:50051');
  server.start();
});