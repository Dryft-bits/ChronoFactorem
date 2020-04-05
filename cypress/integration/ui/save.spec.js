/// <reference types="cypress" />
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let chai = require("chai"),
  expect = chai.expect;
let chaiHttp = require("chai-http");
var server = require("../../../server.js");

chai.use(chaiHttp);


context('Actions', () => {
  before(() => {
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/create');
  })

  it('should have two buttons at the start', () => {
    server.request.isAuthenticated = () => { return true; }
    testUser = {
      name: "Why you wanna know it?",
      email: "secret@secret.com",
      branch: ["your head", "my foot"],
      year: 1
    };
    server.request.user = testUser;
    cy.get('#3').click();
  })

})
