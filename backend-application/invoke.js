/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const util = require("util");

module.exports = {
    
  register: async function (request, response) {
    try {
      // load the network configuration
      const ccpPath = path.resolve(
        process.cwd(),
        "..",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), "wallet");
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const identity = await wallet.get("appUser");
      if (!identity) {
        console.log(
          'An identity for the user "appUser" does not exist in the wallet'
        );
        console.log("Run the registerUser.js application before retrying");
        return;
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "appUser",
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");

      // Get the contract from the network.
      const contract = network.getContract("Chat");

      // Submit the specified transaction.
      const { userId, key, name } = request.body;
      await contract.submitTransaction("register", userId, key, name);
      console.log("Transaction has been submitted");
      response.send("Transaction has been submitted");
      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      process.exit(1);
    }
  },

  fetchMessage: async function (request, response) {
    try {
      // load the network configuration
      const ccpPath = path.resolve(
        process.cwd(),
        "..",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), "wallet");
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const identity = await wallet.get("appUser");
      if (!identity) {
        console.log(
          'An identity for the user "appUser" does not exist in the wallet'
        );
        console.log("Run the registerUser.js application before retrying");
        return;
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "appUser",
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");

      // Get the contract from the network.
      const contract = network.getContract("Chat");

      const userId = request.body.userId;
      const result = await contract.submitTransaction("fetchMessage", userId);
      // const result = await contract.evaluateTransaction('invokeUser2', userId);
      console.log(
        `Transaction has been evaluated, result is: ${result.toString()}`
      );
      response.send(result.toString());
      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  },

  fetchUser: async function (request, response) {
    try {
      // load the network configuration
      const ccpPath = path.resolve(
        process.cwd(),
        "..",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), "wallet");
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const identity = await wallet.get("appUser");
      if (!identity) {
        console.log(
          'An identity for the user "appUser" does not exist in the wallet'
        );
        console.log("Run the registerUser.js application before retrying");
        return;
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "appUser",
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");

      // Get the contract from the network.
      const contract = network.getContract("complex");

      const userId = request.body.userId;
      const result = await contract.evaluateTransaction("invokeUser", userId);
      console.log(
        `Transaction has been evaluated, result is: ${result.toString()}`
      );
      response.send(result.toString());
      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  },

  sendMessage: async function (request, response) {
    try {
      // load the network configuration
      const ccpPath = path.resolve(
        process.cwd(),
        "..",
        "test-network",
        "organizations",
        "peerOrganizations",
        "org1.example.com",
        "connection-org1.json"
      );
      let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), "wallet");
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      // Check to see if we've already enrolled the user.
      const identity = await wallet.get("appUser");
      if (!identity) {
        console.log(
          'An identity for the user "appUser" does not exist in the wallet'
        );
        console.log("Run the registerUser.js application before retrying");
        return;
      }

      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "appUser",
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");

      // Get the contract from the network.
      const contract = network.getContract("Chat");

      let assetKey = `item-704`;
      const RED = "\x1b[31m\n";
      const GREEN = "\x1b[32m\n";
      const BLUE = "\x1b[34m";
      const RESET = "\x1b[0m";
      try {
        let listener = async (event) => {
          console.log("///////////////////////////////");
          const asset = JSON.parse(event.payload.toString());
          console.log(
            `${GREEN}<-- Contract Event Received: ${
              event.eventName
            } - ${JSON.stringify(asset)}${RESET}`
          );
          // show the information available with the event
          console.log(`*** Event: ${event.eventName}:${asset.ID}`);
          // notice how we have access to the transaction information that produced this chaincode event
          const eventTransaction = event.getTransactionEvent();
          console.log(
            `*** transaction: ${eventTransaction.transactionId} status:${eventTransaction.status}`
          );
          // showTransactionData(eventTransaction.transactionData);
          // notice how we have access to the full block that contains this transaction
          const eventBlock = eventTransaction.getBlockEvent();
          console.log(`*** block: ${eventBlock.blockNumber.toString()}`);
        };
        // now start the client side event service and register the listener
        console.log(
          `${GREEN}--> Start contract event stream to peer in Org1${RESET}`
        );
        await contract.addContractListener(listener);
      } catch (eventError) {
        console.log(
          `${RED}<-- Failed: Setup contract events - ${eventError}${RESET}`
        );
      }

      try {
        console.log(`${GREEN}--> Submit Transaction: SendMessage`);
        const { userId, key, recepients, message } = request.body;
        const recepientsValue = JSON.stringify(recepients);
        const result = await contract.submitTransaction(
          "sendMessage",
          userId,
          key,
          recepientsValue,
          message
        );
        console.log("Transaction has been submitted " + result.toString());
        response.send(result.toString());
      } catch (createError) {
        console.log(
          `${RED}<-- Submit Failed: CreateAsset - ${createError}${RESET}`
        );
        response.send("Error in sending message");
      }

      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      process.exit(1);
    }
  },
};
