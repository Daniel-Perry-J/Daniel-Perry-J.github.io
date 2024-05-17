// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description 
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]

var cur_location = "HQ";
var situation = "standby";

// Define a variable to hold the current status
var currentStatus = "nothing"; // Default status is "nothing"

// Function to update the current status
function updateStatus(newStatus) {
  // List of valid statuses
  var validStatuses = ["urgent", "nothing", "alert", "danger", "in combat", "preparing", "reporting"];

  // Check if the new status is valid
  if (validStatuses.includes(newStatus)) {
    // Update the current status
    currentStatus = newStatus;
    console.log("Status updated to: " + currentStatus);
  } else {
    console.log("Invalid status: " + newStatus);
  }
}

// Define a function to extract and store the string after a specific phrase
function extractAndStore(input, phrase) {
  // Find the index of the phrase in the input
  var startIndex = input.indexOf(phrase);
  if (startIndex !== -1) {
    // If the phrase is found, extract the substring after the phrase
    var substring = input.substring(startIndex + phrase.length).trim();
    // Store the extracted substring for later use
    // For example, you can store it in a global variable
    storedString = substring;
  }
}

var elizaInitials = [
  "Greetings, General. What are your orders?",
  "I'm ready to serve. What are your orders?",
  "Sir/Ma'am, What are your orders?",
  "How can serve you today, sir/ma'am?",
  "Reporting for duty and ready to serve!",
  "What are today's objectives?",
];

var elizaFinals = [
  "At ease, General. Until our next briefing.",
  "Mission accomplished, General. Standing by for further orders.",
  "Sir/Ma'am, it's been an honor serving you. Dismissed.",
  "General, your commands have been executed. Signing off.",
  "Reporting completion of assigned tasks, General. Requesting permission to stand down.",
  "Permission to conclude our session, General. Ready for debriefing at your convenience.",
  "Orders fulfilled, General. Requesting permission to retreat.",
  "General, it's been a privilege. Requesting permission to terminate communication.",
];

var elizaQuits = [
  "dismissed",
  "goodbye",
  "done",
  "mission complete",
  "you are free to go",
  "task finished",
];

var elizaPres = [
  "dont", "don't",
  "cant", "can't",
  "wont", "won't",
  "recollect", "remember",
  "recall", "remember",
  "dreamt", "dreamed",
  "dreams", "dream",
  "maybe", "perhaps",
  "certainly", "yes",
  "machine", "computer",
  "machines", "computer",
  "computers", "computer",
  "were", "was",
  "you're", "you are",
  "i'm", "i am",
  "same", "alike",
  "identical", "alike",
  "equivalent", "alike",
  "objective", "goal",
  "task", "mission",
];

var elizaPosts = [
  "am", "are",
  "your", "my",
  "me", "you",
  "myself", "yourself",
  "yourself", "myself",
  "i", "you",
  "you", "I",
  "my", "your",
  "i'm", "you are"
];

var elizaSynons = {
  "be": ["am", "is", "are", "was"],
  "belief": ["feel", "think", "believe", "wish"],
  "cannot": ["can't"],
  "desire": ["want", "need"],
  "everyone": ["everybody", "nobody", "noone"],
  "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
  "happy": ["elated", "glad", "better"],
  "sad": ["unhappy", "depressed", "sick"],
  "greeting": ["hello", "greetings", "what's up"],
  "urgent": ["time-sensitive", "crucial", "pressing", "imperative", "critical"],
  "request": ["ask", "plead", "demand", "petition"],
  "command": ["order", "instruct", "direct", "enjoin"],
  "understand": ["comprehend", "grasp", "get", "fathom"],
  "confused": ["befuddled", "muddled", "puzzled", "perplexed"],
  "excited": ["thrilled", "enthusiastic", "eager", "animated"],
  "discuss": ["talk about", "deliberate", "converse", "debate"],
  "listen": ["heed", "pay attention", "attend", "take note"],
  "respond": ["reply", "answer", "react", "acknowledge"],
  "strategy": ["plan", "tactic", "scheme", "approach"],
  "victory": ["triumph", "success", "win", "achievement"]
};

var elizaKeywords = [

  /*
    Array of
    ["<key>", <rank>, [
      ["<decomp>", [
        "<reasmb>",
        "<reasmb>",
        "<reasmb>"
      ]],
      ["<decomp>", [
        "<reasmb>",
        "<reasmb>",
        "<reasmb>"
      ]]
    ]]
  */

  ["xnone", 0, [
    ["*", [
      "I'm sorry sir/mam'ma, I do not understand.",
      "Could you repeat that?",
      "I'm not sure I can follow through on your orders",
    ]]
  ]],
  ["sorry", 0, [
    ["* sorry *", [
      "No need to apologize",
      "It's on me, I take the blame",
      "Don't worry about we have a mission to complete"
    ]]
  ]],
  ["greetings", 0, [
    ["*", [
      "Good morning to you as well, now what shall I do?"
    ]]
  ]],
  ["hello", 0, [
    ["*@greeting*", [
      "go to greetings"
    ]]
  ]],
  ["mission", 0, [
    ["* mission *", [
      "Your mission is important, General. How can I assist you in achieving it?",
      "Mission acknowledged. How can I support you further?",
      "What are the objectives of this mission, General?",
      "Executing mission protocol. Please provide additional details.",
      "Understood, General. Proceeding with mission readiness checks."
    ]]
  ]],
  ["objective", 0, [
    ["* objective *", [
      "Understood, capturing objective now!",
      "Ambitious goals for a great leader",
      "... Objective is already complete",

    ]]
  ]],
  ["report", 0, [
    ["* report *", [
      `"Reporting from . Situation assessment: ${situation}. Requesting further instructions, General."`,
      `"Sir/Ma'am, reporting in from ${cur_location}. Current status: ${currentStatus}. How should we proceed?"`,
      `"General, this is Eliza reporting from ${cur_location}. All clear at the moment. What are your orders?"`,
      `"Acknowledged. Reporting from ${cur_location}. No hostiles detected. What's the next move?"`,
      `"This is Eliza reporting from ${cur_location}. ${currentStatus} observed. Waiting for your command, General."`
    ]]
  ]],
  ["go to", 0, [
    ["* (go to|advance to|move to|proceed to) *", [
      function (input) {
        cur_location = input.split(/(?:go to|advance to|move to|proceed to) /)[1]; // Extract location from user input
        // Update location variable for future conversations
        // Assuming 'location' is a global variable accessible by Eliza
        cur_location = cur_location.trim(); // Remove leading/trailing spaces
        return "Acknowledged. Proceeding to " + cur_location + ".";
      }
    ]]
  ]],
  ["ambush", 0, [
    ["* ambush *", [
      "Enemy forces spotted! Prepare for ambush!",
      "Ambush set! Await my signal to strike!",
      "Ambush tactics engaged. Keep low and silent."
    ]]
  ]],
  ["Overwatch", 0, [
    ["* overwatch *", [
      "Assume overwatch positions. Keep eyes on the target.",
      "Overwatch established. Maintain visual contact.",
      "Overwatch team, report any movement in the area."
    ]]
  ]],
  ["Extraction", 0, [
    ["* extraction *", [
      "Extraction team inbound. Secure the Landing Zone.",
      "Prepare for extraction. Gather at the designated point.",
      "Extraction vehicle en route. Be ready for immediate departure."
    ]]
  ]],
  ["Priority", 0, [
    ["* Priority *", [
      "This is a priority mission. Stay focused and execute flawlessly.",
      "Priority target identified. Engage with extreme prejudice.",
      "Priority message received. What are your orders, General?"
    ]]
  ]],
  ["Defend", 0, [
    ["* Defend *", [
      "Incoming enemy attack! Prepare to defend our position!",
      "Defensive positions! Hold the line at all costs!",
      "Defend the objective! Our success depends on it!"
    ]]
  ]],
  ["Retreat", 0, [
    ["* Retreat *", [
      "Retreat! Fall back to secondary positions!",
      "Initiate retreat protocol. We're outnumbered!",
      "Retreat and regroup! We'll live to fight another day!"
    ]]
  ]],
  ["Reconnaissance", 0, [
    ["* Recon*", [
      "Begin reconnaissance mission. Gather intel on enemy movements.",
      "Recon team, scout ahead and report any enemy activity.",
      "Reconnaissance is key. Stay hidden and observe"
    ]]
  ]],
  ["Support", 0, [
    ["* support *", [
      "We need air support! Call in an airstrike on target coordinates!",
      "Requesting ground support. Send reinforcements ASAP!",
      "Thank you for your support, General. We won't let you down."
    ]]
  ]],
  ["Training", 0, [
    ["* training *", [
      "Training exercise in progress. Practice your drills.",
      "Training session scheduled for 0800 hours. Be prepared.",
      "Training is essential for success. Push yourself to the limit!"
    ]]
  ]],
];

// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
var elizaPostTransforms = [
  / old old/g, " old",
  /\bthey were( not)? me\b/g, "it was$1 me",
  /\bthey are( not)? me\b/g, "it is$1 me",
  /Are they( always)? me\b/, "it is$1 me",
  /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
  /\bI to have (\w+)/, "I have $1",
  /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];

// eof