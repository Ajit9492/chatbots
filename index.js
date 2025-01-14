const userMessage = [
  ["How do I set up a new source in Segment"],
  ["How can I create a user profile in mParticle"],
  ["How do I build an audience segment in Lytics"],
  ["How can I integrate my data with Zeotap"],
  ["hi", "hey", "hello"],
  ["sure", "yes", "no"],
  ["are you genious", "are you nerd", "are you intelligent"],
  ["i hate you", "i dont like you"],
  ["how are you", "how is life", "how are things", "how are you doing"],
  ["how is corona", "how is covid 19", "how is covid19 situation"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you", "who is your creator"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "ok", "okay", "nice", "welcome"],
  ["thanks", "thank you"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["corona", "covid19", "coronavirus"],
  ["you are funny"],
  ["i dont know"],
  ["boring"],
  ["im tired"],
];

const botReply = [
  ["To set up a new source in Segment, you can refer to the official documentation at Segment Docs. The guide will walk you through creating and managing sources for your projects"],
  ["To create a profile in mParticle, you can refer to the detailed steps provided in their Segment documentation. This includes information on how to create, update, and manage user profiles within the platform. You can find the official documentation and relevant guides on how to implement user profile management using mParticle"],
  ["To build an audience segment in Lytics, you can start by navigating to the Audiences section of the platform. From there, create a new segment by defining rules based on your audience's attributes, behaviors, and actions. You can use filters to refine and target specific users, and then save the segment for future use"],
  ["To integrate your data with Zeotap, you can refer to their official documentation for detailed integration steps. Zeotap provides guides on how to work with their platform, including APIs, data onboarding, and audience targeting"],
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  ["Okay"],
  ["Yes I am! "],
  ["I'm sorry about that. But I like you dude."],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
  ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  ["I am always young."],
  ["I am just a bot", "I am a bot. What are you?"],
  ["Sabitha Kuppusamy"],
  ["I am nameless", "I don't have a name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["You're welcome"],
  ["Briyani", "Burger", "Sushi", "Pizza"],
  ["Dude!"],
  ["Yes?"],
  ["Please stay home"],
  ["Glad to hear it"],
  ["Say something interesting"],
  ["Sorry for that. Let's chat!"],
  ["Take some rest, Dude!"]
];

const alternative = [
  "Our website is always here to help you. You can find various resources regarding your help at our homepage menu bar",
  "Don't worry your safety is our responsibility",
  "You can visit the quicktips tab on the homepage and learn new guidelines",
  "You can refer the helpline section on this website"
];

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-aus";
  u.volume = 1;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText
    ? comparedText
    : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      if (triggerArray[x][y].toLowerCase() === string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
        break;  // Stop searching once a match is found
      }
    }
    if (item) break; // Exit if a valid reply is found
  }

  // If no valid match, fallback to checking predefined messages
  return item || containMessageCheck(string);
}

function containMessageCheck(string) {
  let expectedReply = [
    [
      "Good Bye, dude",
      "Bye, See you!",
      "Dude, Bye. Take care of your health in this situation."
    ],
    ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
    ["Have a pleasant evening!", "Good evening too", "Evening!"],
    ["Good morning, Have a great day!", "Morning, dude!"],
    ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
  ];
  let expectedMessage = [
    ["bye", "tc", "take care"],
    ["night", "good night"],
    ["evening", "good evening"],
    ["morning", "good morning"],
    ["noon"]
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
  voiceControl(product);
}
