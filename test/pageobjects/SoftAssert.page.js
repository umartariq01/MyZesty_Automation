import assert from "assert";

class SoftAssert {
  constructor() {
    this.errors = [];
  }

  async assertEqual(actual, expected, message) {
    try {
      assert.strictEqual(actual, expected, message);
    } catch (error) {
      this.errors.push(error.message);
      console.error("❌ Soft assertion failed:", error.message);
    }
  }

  async assertNotEqual(actual, expected, message) {
    try {
      assert.notStrictEqual(actual, expected, message);
    } catch (error) {
      this.errors.push(error.message);
      console.error("❌ Soft assertion failed:", error.message);
    }
  }

  // Print all collected errors at the end
  async assertAll() {
    if (this.errors.length > 0) {
      console.log("\n===== ❌ SOFT ASSERTION SUMMARY =====");
      this.errors.forEach((err, index) => {
        console.log(`${index + 1}. ${err}`);
      });
      console.log("=====================================\n");

      // Fail the suite at the end if needed
      assert.fail(
        `${this.errors.length} soft assertions failed. See details above.`
      );
    } else {
      console.log("\n✅ All soft assertions passed successfully.\n");
    }
  }
}

export default new SoftAssert();
