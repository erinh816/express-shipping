"use strict";

const request = require("supertest");

let shipItAPI = require("../shipItApi");
shipItAPI.shipProduct = jest.fn();

const app = require("../app");

describe("POST / tests", function () {


  test("ship product", async function () {
    shipItAPI.shipProduct.mockReturnValue(7544);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "okay",
      addr: '100 test street',
      zip: "2139019",
    });

    expect(resp.body).toEqual({ shipped: 7544 });
  });


});

test("throws error if empty request body", async function () {
  const resp = await request(app).post("/shipments").send();
  expect(resp.statusCode).toEqual(400);
});

test("throws error if invalid request body", async function () {
  const resp = await request(app).post("/shipments").send({
    productId: "ds",
    name: "okay",
    addr: true,
    zip: "2139019",
  });

  expect(resp.statusCode).toEqual(400);
  expect(resp.body).toEqual({
    error: {
      message: [
        "instance.productId is not of a type(s) integer",
        "instance.addr is not of a type(s) string",
      ],
      status: 400,
    },
  });
});
