import { createId } from "@paralleldrive/cuid2";
import randomAnimalNamePkg from "random-animal-name";
import { generate as randomWords } from "random-words";

export function createRandomId() {
  return createId();
}
export function randomAnimalName() {
  return randomAnimalNamePkg();
}

export function getRandomWords(count: number): string {
  return (randomWords(count) as string[]).join(" ");
}
