describe("Get deals from API tests", () => {
  it("gets deals from API", () => {
    cy.request("GET", "http://localhost:3000/api/deals?sort=hot").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("items");
        expect(response.body.items).to.be.an("array");
      },
    );
  });

  const testCases = [
    { limit: 0, expectedLength: 8 }, // Default limit is 8
    { limit: 1, expectedLength: 1 },
    { limit: 50, expectedLength: 50 },
    { limit: 51, expectedLength: 50 }, // Should be capped at 50
    { limit: -1, expectedLength: 8 }, // Default limit is 8
    { limit: "abc", expectedLength: 8 }, // Default limit is 8
  ];

  testCases.forEach((testCase) => {
    it(
      "checks deals API - Boundary Value Analysis for limit " + testCase.limit,
      () => {
        cy.request(
          "GET",
          `http://localhost:3000/api/deals?limit=${testCase.limit}`,
        ).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("items");
          expect(response.body.items).to.have.length(testCase.expectedLength);
        });
      },
    );
  });
});
