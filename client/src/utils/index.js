// utility functions or utils are the functions that we can use throughout our app

import FileSaver from "file-saver";

import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); // to get a random number from 1 to 49 as the length of surpriseMePrompts is 50
  const randomPrompt = surpriseMePrompts[randomIndex];

  //-> to check that we do not get the same prompt two times in a row, if get the same prompt as the one passed to the function then the getRandomPrompt() will be
  //called recursively until a different prompt is found.
  //-> here '===' will be used intead of '==' as in Js '===' as inn JavaScript, the === operator is used for strict equality comparison.
  // It checks both the value and the type of the operands to ensure they are exactly the same.
  // as === does not perform type coercion. This means that if you are comparing two values of different types, it will return false.
  //For example, 1 === '1' will return false because one is a number and the other is a string. Using == would return true in this case because it performs type coercion.
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpeg`);
}
