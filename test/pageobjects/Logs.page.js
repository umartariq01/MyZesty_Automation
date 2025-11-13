// test/utils/collectLogs.js
class Logger {
  constructor() {
    this.messages = [];
    this.originalLog = console.log;
  }

  // start collecting; only capture logs that contain a tag/keyword
  start(filterKeyword = "[COLLECT]") {
    this.filterKeyword = filterKeyword;
    console.log = (...args) => {
      const msg = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");

      // ✅ only collect tagged logs
      if (msg.includes(this.filterKeyword)) {
        this.messages.push(msg);
      } else {
        // print all other logs immediately
        this.originalLog(...args);
      }
    };
  }

  flush(header = "\n======= FILTERED LOG SUMMARY =======") {
    console.log = this.originalLog;
    if (!this.messages.length) return;
    console.log(header);
    this.messages.forEach((m) => console.log(m));
    console.log("====================================\n");
    this.messages = [];
  }
}

export default new Logger(); // ESM
