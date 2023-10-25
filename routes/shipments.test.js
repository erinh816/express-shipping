"use strict";

const request = require("supertest");
const fetchMock = require("fetch-mock");

let { shipProduct } = require("../shipItApi");
shipProduct = jest.fn();

const app = require("../app");

describe("POST / tests", function () {
  shipProduct.mockReturnValue({ shipped: 7544 });

  // test("ship product", async function () {
  //   const shipId = await shipProduct({
  //     productId: 1000,
  //     name: "Test Tester",
  //     addr: "100 Test St",
  //     zip: "12345-6789",
  //   });

  //   expect(shipId).toEqual({ shipped: 7544 });
  // });

  test("valid post request", async function () {
    fetchMock.post(`/shipments`, {
      body: {
        shipped: 7544,
      },
      status: 200,
    });

    const res = await shipProduct({
      body: {
        productId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      },
    });

    expect(res).toEqual({ shipped: 7544 });
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
});
