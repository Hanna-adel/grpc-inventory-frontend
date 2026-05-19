const { OrderServiceClient } = require("./src/generated/OrderService_pb_service");
const { PlaceOrderRequest, OrderItem } = require("./src/generated/orderModel_pb");

document.getElementById("placeOrderBtn").addEventListener("click", function () {
    const userId = parseInt(document.getElementById("userId").value);
    const productId = parseInt(document.getElementById("productId").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    // Create order item
    const orderItem = new OrderItem();
    orderItem.setProductid(productId);
    orderItem.setQuantity(quantity);

    // Create request
    const request = new PlaceOrderRequest();
    request.setUserid(userId);
    request.addOrderitems(orderItem);

    // Call gRPC service
    const client = new OrderServiceClient("http://localhost:5131");

    client.placeOrder(request, {}, function (err, response) {
        const resultDiv = document.getElementById("result");
        resultDiv.classList.remove("hidden", "success", "error");

        if (err) {
            resultDiv.classList.add("error");
            resultDiv.textContent = "Error: " + err.message;
        } else {
            if (response.getSuccess()) {
                resultDiv.classList.add("success");
                resultDiv.textContent = response.getMessage();
            } else {
                resultDiv.classList.add("error");
                resultDiv.textContent = response.getMessage();
            }
        }
    });
});