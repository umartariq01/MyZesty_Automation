console.log("======= Start Testing =========");


//  Note for Developers:
//                     -> If you want to run specific feature, add onlt 

describe("Combined Feature Suite", () => {
  it("Run Effects suite", async () => {
    // Import and run Effects tests
    await import("../specs/test.effects.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Preset suite", async () => {
    await import("../specs/test.preset.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Sticker suite", async () => {
    await import("../specs/test.sticker.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Text suite", async () => {
    await import("../specs/test.text.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Sort suite", async () => {
    await import("../specs/test.sort.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Tune suite", async () => {
    await import("../specs/test.tune.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Keyframes suite", async () => {
    await import("../specs/test.keyframes.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Freeze suite", async () => {
    await import("../specs/test.freeze.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Edit suite", async () => {
    await import("../specs/test.edit.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Dehazer suite", async () => {
    await import("../specs/test.dehazer.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Overlay suite", async () => {
    await import("../specs/test.overlay.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Canvas suite", async () => {
    await import("../specs/test.canvas.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Audio suite", async () => {
    await import("../specs/test.audio.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Chroma suite", async () => {
    await import("../specs/test.chroma.js");
  });

  it("Wait before next suite", async () => {
    console.log("=== Waiting 2 seconds before next suite ===");
    await browser.pause(2000); // 2 seconds
  });

  it("Run Export suite", async () => {
    await import("../specs/test.export.js");
  });


  // ===============================================================================
  after(async () => {
    console.log("===== All Features Test Suite finished =====");
  });


});
