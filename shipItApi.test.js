"use strict";

const fetchMock = require("fetch-mock");
const { shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY } = require("./shipItApi");

test("shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL, {
    receipt: {
      itemId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
      // key: SHIPIT_API_KEY,
      shipId: 5272,
    },
  });

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(5272);
});
