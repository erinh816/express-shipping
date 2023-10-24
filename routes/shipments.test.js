"use strict";

const request = require("supertest");
const fetchMock = require("fetch-mock");

const app = require("../app");
const { shipProduct } = require("../shipItApi");
shipProduct = jest.fn();

const { json } = require("express");

describe("POST /", function () {
  test("valid", async function () {
    shipProduct.mockReturnValue({ shipped: 7544 });

    const shipId = await shipProduct({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(shipId).toEqual({ shipped: 7544 });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app).post("/shipments").send();
    expect(resp.statusCode).toEqual(400);
  });
});
