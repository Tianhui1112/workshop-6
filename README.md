# workshop_6:

You can view the generated effect by visiting the following link:

[View Workshop 6 Effect](   https://tianhui1112.github.io/workshop-6/)


## My Idea


Our code implements a simple poem generator, allowing users to input text through the interface and dynamically generate and display poems based on selected rhyming schemes, such as AABB (where the last words of every two lines rhyme).







## Project workflow




## Using RiTa Library for Poem Processing

Here, we mainly use three features of RiTa: `RiTa.tokenize(userLine)`, `RiTa.rhymesSync(words[r])`, and `RiTa.untokenize(words)`.

1. **RiTa.tokenize(userLine)**
   This function splits the user's input poem `userLine` into a list of words. For example, if the input is "The sun rises above the hill," it will be split into: ["The", "sun", "rises", "above", "the", "hill"]


2. **RiTa.rhymesSync(words[r])**
After obtaining the list of words, we randomly select one word (determined by `let r = floor(random(0, words.length))`). Then, we call `RiTa.rhymesSync(words[r])` to get a list of words that rhyme with it. For instance, if the selected word is "hill," it might return a list like: ["fill", "chill", "still", "drill"]

These are rhyming words.

3. **RiTa.untokenize(words)**
If some words are replaced with rhyming words in step 2, we can use `RiTa.untokenize(words)` to reassemble these words into a complete poem. For example, `["The", "sun", "sets", "in", "the", "west"]` would be reassembled into: "The sun sets in the west"


By using these three steps, we can select words from the user's input poem, replace them with rhyming words, and then reassemble a complete poem.

4: We use this step `let rhymes = RiTa.rhymesSync(words[r]);` to find rhyming words that match the chosen rhyme scheme (such as AABB or ABAB) when the user selects a rhyme rule.
