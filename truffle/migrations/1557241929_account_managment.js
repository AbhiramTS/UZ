const AccountManagment = artifacts.require("AccountManagment");

module.exports = function(deployer) {
  deployer.deploy(AccountManagment);
};