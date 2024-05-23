const express = require("express");
const { withdrawLogic } = require("./withdrawLogic");
const dotenv = require("dotenv");

const app = express();

const PORT = process.env.PORT || 4000;

dotenv.config();

(async () => {
  console.log(`Listening on port ${PORT}`);

  const users = process.env.USERS;

  if (!users) {
    console.log('No users found in .env file');
    return;
  }

  const parsedUsers = JSON.parse(users);

  if (!Array.isArray(parsedUsers)) {
    console.log('Invalid format for USERS in .env file');
    return;
  }

  const usersStatus = [];

  for (const user of parsedUsers) {
    console.log(`Processing withdrawal for user: ${user.name}`);
    try {
      await withdrawLogic(user.name, user.password);
      usersStatus.push({ name: user.name, success: true });
    } catch (error) {
      console.error(`Error processing withdrawal for user: ${user.name}`, error);
      // If navigation timeout error occurs, set success status to false
      if (error.message.includes('Navigation timeout')) {
        console.error(`Navigation timeout occurred for user: ${user.name}`);
        usersStatus.push({ name: user.name, success: false });
      } else {
        usersStatus.push({ name: user.name, success: false });
      }
    }
  }

  console.log("Withdrawal status:");
  for (const status of usersStatus) {
    console.log(`${status.name}: ${status.success ? "Success" : "Failed"}`);
  }
})();

app.listen(PORT);
