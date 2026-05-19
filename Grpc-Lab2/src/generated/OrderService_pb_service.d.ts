// package: 
// file: OrderService.proto

import * as OrderService_pb from "./OrderService_pb";
import * as orderModel_pb from "./orderModel_pb";
import {grpc} from "@improbable-eng/grpc-web";

type OrderServicePlaceOrder = {
  readonly methodName: string;
  readonly service: typeof OrderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof orderModel_pb.PlaceOrderRequest;
  readonly responseType: typeof orderModel_pb.PlaceOrderResponse;
};

export class OrderService {
  static readonly serviceName: string;
  static readonly PlaceOrder: OrderServicePlaceOrder;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class OrderServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  placeOrder(
    requestMessage: orderModel_pb.PlaceOrderRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: orderModel_pb.PlaceOrderResponse|null) => void
  ): UnaryResponse;
  placeOrder(
    requestMessage: orderModel_pb.PlaceOrderRequest,
    callback: (error: ServiceError|null, responseMessage: orderModel_pb.PlaceOrderResponse|null) => void
  ): UnaryResponse;
}

