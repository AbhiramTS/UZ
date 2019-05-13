const Main = artifacts.require("Main");

module.exports = function(deployer) {
  deployer.deploy(Main,"abcd1234","abcd1234");
};
