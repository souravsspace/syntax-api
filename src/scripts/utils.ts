import readline from "node:readline";

export async function confirmDeletion(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `\x1B[31m⚠️  ${message} Are you sure? (yes/no): \x1B[0m`,
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === "yes");
      },
    );
  });
}
