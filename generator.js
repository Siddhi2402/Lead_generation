const axios = require("axios");

const SERVER_URL = "http://localhost:3000/api/leads";

const names = [
  "Rahul Sharma",
  "Priya Mehta",
  "Amit Patel",
  "Sneha Joshi",
  "Vikas Singh",
  "Neha Verma",
];

const cities = [
  "Mumbai",
  "Pune",
  "Delhi",
  "Bangalore",
  "Hyderabad",
];

const products = [
  "Industrial Ball Valve",
  "Hydraulic Pump",
  "Air Compressor",
  "Steel Pipe",
  "Bearing",
];

const categories = [
  "Valves & Valve Parts",
  "Hydraulic Equipment",
  "Industrial Machinery",
  "Pipes & Tubes",
  "Bearings",
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  return String(
    9000000000 + Math.floor(Math.random() * 999999999)
  );
}

function randomPincode() {
  return String(
    100000 + Math.floor(Math.random() * 899999)
  );
}

function generateLead() {
  const name = randomItem(names);
  const product = randomItem(products);

  return {
    UNIQUE_QUERY_ID: `QU${Date.now()}${Math.floor(
      Math.random() * 10000
    )}`,

    SENDER_NAME: name,
    SENDER_EMAIL: `${name
      .toLowerCase()
      .replace(/ /g, ".")}@example.com`,

    SENDER_MOBILE: randomPhone(),
    SENDER_MOBILE_ALT: randomPhone(),

    SENDER_EMAIL_ALT: `${name
      .toLowerCase()
      .replace(/ /g, ".")}.alt@example.com`,

    SENDER_ADDRESS: `${Math.floor(
      Math.random() * 500
    )}, MG Road, Andheri West`,

    SENDER_CITY: randomItem(cities),
    SENDER_STATE: "Maharashtra",
    SENDER_COUNTRY_ISO: "IN",
    SENDER_PINCODE: randomPincode(),

    SENDER_COMPANY: `${name.split(" ")[0]} Traders Pvt Ltd`,

    QUERY_TYPE: Math.random() > 0.5 ? "BUY" : "SELL",

    QUERY_TIME: new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),

    QUERY_MESSAGE: `I need ${
      Math.floor(Math.random() * 1000) + 1
    } units of ${product} urgently.`,

    QUERY_PRODUCT_NAME: product,
    QUERY_MCAT_NAME: randomItem(categories),

    RECEIVER_MOBILE: randomPhone(),

    CALL_DURATION: Math.floor(
      Math.random() * 300
    ),
  };
}

setInterval(async () => {
  const lead = generateLead();

  try {
    const response = await axios.post(
      SERVER_URL,
      lead
    );

    console.log(
      `Sent: ${lead.UNIQUE_QUERY_ID}`,
      response.data
    );
  } catch (error) {
    console.error(
      "Failed:",
      error.response?.data || error.message
    );
  }
}, 2000);