"use strict";
const { Contract } = require("fabric-contract-api");
class Chat extends Contract {
  async register(ctx, userId, key, name) {
    let userAsBytes = await ctx.stub.getState(userId);
    if (!userAsBytes || userAsBytes.toString().length <= 0) {
      let userData = {
        UserId: userId,
        Name: name,
        SentMessages: [],
        ReceivedMessages: [],
        AccessKey: key,
      };
      await ctx.stub.putState(userId, Buffer.from(JSON.stringify(userData)));
      return "User Registration Successful..";
    } else {
      return "Username is already taken.!";
    }
  }
  async invokeUser(ctx, userId) {
    let userAsBytes = await ctx.stub.getState(userId);
    if (!userAsBytes || userAsBytes.toString().length <= 0) {
      return "Error:Incorrect UserId..!";
    }
    let user = JSON.parse(userAsBytes);

    return user;
  }
  async fetchMessage(ctx, userId) {
    let userAsBytes = await ctx.stub.getState(userId);
    if (!userAsBytes || userAsBytes.toString().length <= 0) {
      return "Error:Incorrect UserId..!";
    }
    let user = JSON.parse(userAsBytes);
    if (user.ReceivedMessages.length <= 0) {
      return "No Message Received";
    }
    let ReceivedMessages = user.ReceivedMessages;

    for (let i = 0; i < ReceivedMessages.length; i++) {
      if (!ReceivedMessages[i].isRead) {
        let senderAsBytes = await ctx.stub.getState(ReceivedMessages[i].From);
        let sender = JSON.parse(senderAsBytes);
        let SentMessages = sender.SentMessages;
        let objIndex = SentMessages.findIndex(
          (val) => val.Time == ReceivedMessages[i].Time
        );
        SentMessages[objIndex].ReadBy.push(ReceivedMessages[i].To);
        sender.SentMessages = SentMessages;
        await ctx.stub.putState(
          ReceivedMessages[i].From,
          Buffer.from(JSON.stringify(sender))
        );
        user.ReceivedMessages[i].isRead = true;
        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
      }
    }
    return user;
  }
  async testArray(ctx, userId, key, recipients, message) {
    let value = JSON.parse(recipients);
    return value[0];
  }

  async sendMessage(ctx, userId, key, recipient, message) {
    const recipients = JSON.parse(recipient);
    let userAsBytes = await ctx.stub.getState(userId);
    let user = JSON.parse(userAsBytes);
    let time = await ctx.stub.getTxTimestamp();
    const timestamp = new Date(time.getSeconds() * 1000).toISOString();
    for (let i = 0; i < recipients.length; i++) {
      let recipientAsBytes = await ctx.stub.getState(recipients[i]);
      if (!userAsBytes || userAsBytes.toString().length <= 0) {
        return "Error:Incorrect UserId..!";
      }
      if (user.AccessKey != key) {
        return "Error:Incorrect AccessKey..!";
      }
      if (!recipientAsBytes || recipientAsBytes.toString().length <= 0) {
        return "Error:Incorrect RecipientId..!";
      } else {
        let Recipients = JSON.parse(recipientAsBytes);
        let messageData = {
          Message: message,
          Time: timestamp,
          From: userId,
          To: recipients[i],
          isRead: false,
        };
        Recipients.ReceivedMessages.push(messageData);
        await ctx.stub.putState(
          recipients[i],
          Buffer.from(JSON.stringify(Recipients))
        );
      }
    }

    const sendMessageEvent = {
      Sender: userId,
      Receiver: recipients,
      Time: timestamp,
    };

    const sendMessageEventBuffer = Buffer.from(
      JSON.stringify(sendMessageEvent)
    );
    await ctx.stub.setEvent("sendMessage", sendMessageEventBuffer);

    let sentmessageData = {
      Message: message,
      Time: timestamp,
      From: userId,
      To: recipients,
      ReadBy: [],
    };
    user.SentMessages.push(sentmessageData);
    await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
    return "Message has been sent.";
  }
}
module.exports = Chat;
