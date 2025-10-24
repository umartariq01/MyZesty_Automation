const monocart = require("monocart-reporter");

(async () => {
  console.log("📊 Generating Monocart report...");

  const options = {
    name: "Android Mobile Automation Report",
    outputFile: "./reports/monocart-report.html",
    outputDir: "./reports",
    autoOpen: true,
    theme: "default",
    timestamp: true,
    resultFile: "./monocart-result.json", // input file that WDIO run creates
  };

  try {
    await monocart.generate(options);
    console.log("✅ Monocart report generated successfully!");
  } catch (err) {
    console.error("❌ Failed to generate Monocart report:", err);
  }
})();
