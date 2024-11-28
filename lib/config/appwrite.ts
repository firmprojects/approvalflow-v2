import { Client, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

// Set the endpoint and project ID
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6747a84c000ae99b0d5a');

// Initialize the Account service
export const account = new Account(client);

export { client };