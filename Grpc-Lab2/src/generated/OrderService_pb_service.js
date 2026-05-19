// package: 
// file: OrderService.proto

var OrderService_pb = require("./OrderService_pb");
var orderModel_pb = require("./orderModel_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var OrderService = (function () {
  function OrderService() {}
  OrderService.serviceName = "OrderService";
  return OrderService;
}());

OrderService.PlaceOrder = {
  methodName: "PlaceOrder",
  service: OrderService,
  requestStream: false,
  responseStream: false,
  requestType: orderModel_pb.PlaceOrderRequest,
  responseType: orderModel_pb.PlaceOrderResponse
};

exports.OrderService = OrderService;

function OrderServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

OrderServiceClient.prototype.placeOrder = function placeOrder(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(OrderService.PlaceOrder, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.OrderServiceClient = OrderServiceClient;

