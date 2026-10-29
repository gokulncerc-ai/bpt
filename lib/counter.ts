import fs from "node:fs/promises";
import path from "node:path";
/**
 * Sequential application number (001, 002, ...), like N-newfile.txt in the PHP version.
 * Stored OUTSIDE public/ in D:\BPT\data\application-counter.txt
 * To start from a different number, put the LAST used number in that file (e.g. 000).
 */
const counterFile = () =>
  process.env.COUNTER_FILE || path.join(process.cwd(), "data", "application-counter.txt");

let queue: Promise<unknown> = Promise.resolve();

export function nextApplicationNumber(): Promise<number> {
  const run = queue.then(async () => {
    const file = counterFile();
    await fs.mkdir(path.dirname(file), { recursive: true });
    let n = 0;
    try {
      n = parseInt((await fs.readFile(file, "utf8")).trim(), 10) || 0;
    } catch {
      /* first application: start at 0 */
    }
    n += 1;
    await fs.writeFile(file, String(n).padStart(3, "0"));
    return n;
  });
  queue = run.catch(() => undefined); // one at a time, even if a previous one failed
  return run;
}