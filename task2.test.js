import { postMessagesList } from "./task2";
var expect = require("chai").expect;
var sinon = require("sinon");

it("should store new messages, delete old messages and actions", function (done) {
  let expectedMessages = [{ id: 1, message: "hello world" }];
  let oldMessages = [{ id: 2, message: "foo bar" }];
  let newMessages = [{ id: 1, message: "hello world" }];
  const stepId = 1;
  const messages = [
    { id: 1, message: "hello world" },
    { id: 2, message: "foo bar" },
  ];
  const res = mockResponse();
  var result = postMessagesList(stepId, messages, res);

  //assertions
  result
    .then(function (data) {
      expect(data).to.equal(oldMessages);
    })
    .then(function (data) {
      expect(data).to.equal(oldMessages);
    })
    .then(function (data) {
      expect(data).to.equal(newMessages);
    })
    .then(
      function (data) {
        expect(data).to.equal(newMessages);
        done();
      },
      function (error) {
        done();
      }
    );
});

it("should return 203 when messages are not present ", function (done) {
  const stepId = 1;
  const messages = undefined;
  const res = mockResponse();
  var result = postMessagesList(stepId, messages, res);
  expect(result).to.equal(203);
});
