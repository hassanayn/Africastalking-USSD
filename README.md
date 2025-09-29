# AfricasTalking USSD

This is a USSD application built using [Africa's Talking](https://africastalking.com/) API. The application allows users to interact with various services in CBE Portal such as Timetable,Results,Payments,College services through a USSD interface.

## Features
- **USSD Menu Navigation**: Users can navigate through multiple menu options.
- **SMS Notifications**: Sends SMS notifications based on user actions.
- **Dynamic Responses**: Provides tailored responses for different user inputs.

## Prerequisites
- Node.js (v14 or higher)
- Africa's Talking API account (sandbox or production)
- Ngrok (for exposing local server to the internet)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Hassanayn/AfricasTalking-USSD.git

## Install Dependencies
npm install

## Configuration
1. Obtain your Africa's Talking API credentials (API Key and Username).
2. Create a `.env` file in the project root and add the following environment variables:
   ```env
   API_KEY=your_api_key
   USERNAME=your_username
   ```

   ## Running the Application
   1. Start the application:
      ```bash
      npm run dev
      ```
   2. Expose the local server to the internet using Ngrok:
      ```bash
      ngrok http 3000
      ```
   3. Copy the generated Ngrok URL (e.g., `   1. Start the application:
      ```bash
      npm run dev
      ```
   2. Expose the local server to the internet using Ngrok:
      ```bash
      ngrok http 3000
      ```
   3. Copy the generated Ngrok URL (e.g., `URL_ADDRESS-ngrok-subdomain.ngrok.io`).
   
