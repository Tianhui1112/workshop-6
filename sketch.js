let inputBox, addButton, rhymeSelector;
let userPoem = [];
let rhymeScheme = "Free Rhyme"; // Default rhyme scheme

function setup() {
  createCanvas(500, 500);
  background(180, 210, 250);

  // Input box setup
  inputBox = createInput("");
  inputBox.position(10, 10);
  inputBox.style("font-family", "Serif");

  // Button setup
  addButton = createButton("Add to Poem");
  addButton.position(10, 40);
  addButton.mousePressed(newLine);

  // Rhyme selector setup
  rhymeSelector = createSelect();
  rhymeSelector.position(150, 10);
  rhymeSelector.option("Free Rhyme");
  rhymeSelector.option("AABB Rhyme");
  rhymeSelector.option("ABAB Rhyme");
  rhymeSelector.changed(() => {
    rhymeScheme = rhymeSelector.value();
  });
}

function newLine() {
  let userLine = inputBox.value();
  inputBox.value(""); // Clear input box

  if (userLine.trim() === "") return; // Ignore empty input

  let words = RiTa.tokenize(userLine);
  let r = floor(random(0, words.length));
  let rhymes = RiTa.rhymesSync(words[r]);

  if (rhymeScheme === "Free Rhyme" || rhymes.length === 0) {
    // Free rhyme or no rhymes found, keep original line
    userPoem.push(userLine);
  } else if (rhymeScheme === "AABB Rhyme" || rhymeScheme === "ABAB Rhyme") {
    let rhymeGroup = userPoem.length % 2;

    if (rhymeGroup === 0 || rhymeScheme === "AABB Rhyme") {
      // Ensure the current line rhymes with the previous one (AABB)
      if (userPoem.length > 0) {
        let lastLine = userPoem[userPoem.length - 1];
        let lastWords = RiTa.tokenize(lastLine);
        let lastWord = lastWords[lastWords.length - 1];
        let rhymeOptions = RiTa.rhymesSync(lastWord);
        if (rhymeOptions.length > 0) {
          words[r] = random(rhymeOptions);
        }
      }
    } else {
      // For ABAB rhyme, check two lines back
      if (userPoem.length > 1) {
        let lastLine = userPoem[userPoem.length - 2];
        let lastWords = RiTa.tokenize(lastLine);
        let lastWord = lastWords[lastWords.length - 1];
        let rhymeOptions = RiTa.rhymesSync(lastWord);
        if (rhymeOptions.length > 0) {
          words[r] = random(rhymeOptions);
        }
      }
    }

    userLine = RiTa.untokenize(words);
    userPoem.push(userLine);
  }

  redraw();
}

function draw() {
  background(180, 210, 250);

  fill(0);
  textSize(16);
  textFont("Serif");

  let y = 80;
  for (let line of userPoem) {
    text(line, 10, y, width - 20);
    y += 24; // Move to the next line
  }
}
