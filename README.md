# Chatbot Application UI

This project is a user interface for a chatbot application that facilitates efficient and intuitive interaction for Customer Support Agents. It is built using React with JavaScript, Redux for state management, Material UI for UI styling, and leverages the OpenAI API to generate automated responses.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Dependencies](#dependencies)

## Introduction

The Chatbot Application UI aims to provide Customer Support Agents with a seamless and efficient tool for interacting with customers. By integrating advanced AI-generated responses, the application enhances the overall customer support experience.

## Features

- Intuitive user interface built with React and Material UI
- State management using Redux
- AI-generated responses via the OpenAI API
- Responsive design for use on various devices

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/ceedeno/chatbot.git
```

2. **Navigate to the project directory:**

```bash
cd chatbot
```

3. **Install dependencies:**

Make sure you have Node.js version 20.0.0 or higher installed. Then run:

```bash
npm install
```

4. **Set up environment variables:**

Create a .env file in the project root directory and add your OpenAI API key:

```bash
VITE_OPENAI_API_KEY=your_api_key_here
```

5. **Run the project:**

```bash
npm run dev
```

The application should now be running on http://localhost:5173/

## Usage
Once the application is up and running, Customer Support Agents can use the chatbot interface to interact with customers. The automated responses generated by the OpenAI API will assist in providing quick and accurate support.

![general](https://github.com/ceedeno/r_digital/blob/master/General%20Screenshot.png)

The React application comprises several key components:

1. **Customer Chat Interface:** This component enables the exchange of rich text formatted messages with customers, facilitating enhanced communication. It also includes functionality to copy customer queries for reference and analysis.

![general](https://github.com/ceedeno/r_digital/blob/master/toggle%20component.png)

The chat component features a toggle button located at the top, allowing users to simulate customer queries by sending messages as if they were a customer. Users can then toggle back to the agent interface. This functionality enhances the creation of dynamic content by enabling seamless role switching during interactions.

2. **Message Templates:** This component offers a library of pre-defined templates for frequently asked questions, streamlining responses and ensuring consistency in communication.

3. **AI Assistant Component:** Leveraging the OpenAI API with the ChatGPT 4 mini engine, this component generates recommended responses based on customer queries, enhancing the efficiency and relevance of interactions.

4. **Customer Sentiment Analysis Component:** This component analyzes customer messages in real time, providing insights into customer sentiment to help tailor responses and improve service quality.

## Dependencies
Node.js (>= 20.0.0)

React

Redux

Material UI

OpenAI API

Vite
