"use strict";

const { shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY } = require("./shipItApi");
const fetchMock = require("fetch-mock");

test("shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL, {
    shipped: {
      itemId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
      shipId: 5272,
    },
  });

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(expect.any(Number));
});
