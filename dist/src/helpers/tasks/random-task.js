import { createRandomId, getRandomWords, randomAnimalName } from "@/lib/utils";
export function getRandomTasks(count) {
    return Array.from({ length: count }, () => ({
        id: createRandomId(),
        name: randomAnimalName(),
        description: getRandomWords(Math.floor(Math.random() * 181) + 20),
        completed: Math.random() < 0.5,
    }));
}
