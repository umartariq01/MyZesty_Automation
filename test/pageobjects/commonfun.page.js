import { Browser } from "puppeteer";
import { $, browser } from "@wdio/globals";
class Common_function {
  get premium() {
    return $('//android.widget.ImageView[@content-desc="Premium"]');
  }

  get adv_edit() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/advanceEdit"]'
    );
  }

  get subscriptioon() {
    return $(
      '//android.widget.Button[@resource-id="com.myzesty:id/btnContinue"]'
    );
  }

  get subscripe_pkg() {
    return $(
      '//android.widget.Button[@resource-id="com.android.vending:id/0_resource_name_obfuscated"]'
    );
  }

  get processing_text() {
    return $(
      '//android.widget.TextView[@resource-id="com.android.vending:id/0_resource_name_obfuscated"]'
    );
  }

  //=====================================================================

  get preiumCloseBtn() {
    return $('//android.widget.ImageButton[@content-desc="Close"]');
  }

  async Close_Premium() {
    const isDisplayed = await this.preiumCloseBtn.isDisplayed();
    if (isDisplayed) {
      await this.preiumCloseBtn.click();
    } else {
      console.log("Premium Screen not Displayed!");
    }
  }

  // ========================================================================

  async Advance_edit(expected_text) {
    const isvisible = await this.premium.isDisplayed();

    if (!isvisible) {
      console.log("Already have premium subscription...");
      await this.adv_edit.click();
    } else {
      await this.Buy_Subscription(expected_text);
    }
  }

  async Buy_Subscription(expected_text) {
    await this.adv_edit.click();
    await this.subscriptioon
      .waitForDisplayed({ timeout: 3000 })
      .catch(() => false);
    await this.subscriptioon.click();

    await this.subscripe_pkg
      .waitForDisplayed({ timeout: 5000 })
      .catch(() => false);
    await this.subscripe_pkg.click();

    const processing_visible = await this.processing_text.isDisplayed();
    if (processing_visible) {
      await this.verify_processing(expected_text);
    } else {
      console.log("Subscription Processing is not visible...");
    }
  }

  async verify_processing(expected_text) {
    await this.processing_text.waitForDisplayed({ timeout: 5000 });
    const actual_text = await this.processing_text.getText();
    assert.strictEqual(
      actual_text,
      expected_text,
      "Subscription Processing text not asserted!"
    );
  }

  async Check_Upload_progress() {
    console.log("Checking upload progress...");

    let progress = 0;

    while (progress < 100) {
      try {
        // Wait until the element appears (10 seconds max wait time)
        await browser.waitUntil(
          async () => {
            return await $(
              '//android.widget.TextView[contains(@text, "Uploading Media")]'
            ).isDisplayed();
          },
          {
            timeout: 10000,
            timeoutMsg: "Progress element did not appear within 10 seconds.",
          }
        );

        // Dynamically locate the element
        const progress_element = await $(
          '//android.widget.TextView[contains(@text, "Uploading Media")]'
        );
        const progressText = await progress_element.getText();
        console.log(`Progress text: ${progressText}`);

        // Break if progress reaches 95% or more
        if (progressText.includes("95%") || progressText.includes("100%")) {
          console.log("Upload is about to complete!");
          await browser.pause(5000);
          break;
        }

        // Extract progress percentage from the text
        const match = progressText.match(/(\d+)%/);
        if (match) {
          progress = parseInt(match[1], 10);
          console.log(`Current progress: ${progress}%`);
        }
      } catch (error) {
        console.warn("Warning: Progress element not found. Retrying...");
      }

      await browser.pause(1000); // Short pause before the next check
    }

    console.log("Media uploaded successfully.");
  }

  async play_pause(selector) {
    try {
      const element = await $(selector); // Locate the element
      const location = await element.getLocation(); // Get element coordinates

      await driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: location.x, y: location.y },
            { type: "pointerDown", button: 0 },
            { type: "pause", duration: 100 },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      console.log("Tapped on the element successfully");
    } catch (error) {
      console.error("Error while tapping the element:", error);
    }
  }

  // get export_progress()
  // {
  //     return $('//android.widget.TextView[@resource-id="com.myzesty:id/progress_perc"]');
  // }
  // async Check_export_progress() {
  //     console.log("Checking export progress...");

  //     let progress = 0;

  //     // Wait until the progress reaches 100%
  //     while (progress < 100) {
  //         // Get the text of the progress bar
  //         const progressText = await this.export_progress.getText();

  //         // Parse the progress percentage from the text
  //         progress = parseInt(progressText.replace('%', ''), 10);
  //         console.log(`Current progress: ${progress}%`);

  //         // Break if the progress reaches 100%
  //         if (progressText >= 100) {
  //             console.log("Export is complete!");
  //             break;
  //         }

  //         await browser.pause(1000);
  //     }

  //     console.log("Video successfully exported!");
  // }

  async Check_export_progress(xpath) {
    console.log("Checking export progress...");

    let progress = 0;

    // Wait until the progress reaches 100%
    while (progress < 100) {
      // Find the element using the provided XPath
      const exportProgressElement = await $(xpath);

      // Get the text of the progress bar
      const progressText = await exportProgressElement.getText();

      // Parse the progress percentage from the text
      progress = parseInt(progressText.replace("%", ""), 10);
      console.log(`Current progress: ${progress}%`);

      // Break if the progress reaches 100%
      if (progress >= 100) {
        console.log("Export is complete!");
        break;
      }

      await browser.pause(1000);
    }

    console.log("Video successfully exported!");
  }

  get uploading() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/progress_perc"]'
    );
  }

  async Check_Upload_progress() {
    console.log("Checking uploading progress...");

    let upload_progress = 0;

    // Wait until the progress reaches 100%
    while (upload_progress < 100) {
      // Get the text of the progress bar
      const progressText = await this.uploading.getText();

      // Parse the progress percentage from the text
      progress = parseInt(progressText.replace("%", ""), 10);
      console.log(`Current progress: ${upload_progress}%`);

      // Break if the progress reaches 100%
      if (progressText >= 100) {
        upload_progress.log("Export is complete!");
        break;
      }

      await browser.pause(1000);
    }

    console.log("Video successfully exported!");
  }

  async waitForElementToDisappearCustom(xpath, timeout) {
    const element = await $(xpath);

    await browser.waitUntil(
      async () => {
        return !(await element.isDisplayed()); // Wait until the element is NOT displayed
      },
      {
        timeout: timeout, // Maximum wait time (default 15 seconds)
        timeoutMsg: `Element with XPath "${xpath}" is still visible after ${
          timeout / 1000
        } seconds`,
      }
    );
  }

  async longPressElement(selector, durationInSeconds = 1) {
    const element = await $(selector);
    const location = await element.getLocation();

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: Math.floor(location.x),
            y: Math.floor(location.y),
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: durationInSeconds },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    await driver.releaseActions();
  }

  async waitForElementToDisappear(xpath, timeout = 15000) {
    const element = await $(xpath);

    await browser.waitUntil(
      async () => {
        return !(await element.isDisplayed()); // Wait until the element is NOT displayed
      },
      {
        timeout: timeout, // Maximum wait time (default 15 seconds)
        timeoutMsg: `Element with XPath "${xpath}" is still visible after ${
          timeout / 1000
        } seconds`,
      }
    );
  }

  async waitForElementToBeVisible(xpath) {
    const element = await $(xpath);

    await browser.waitUntil(
      async () => {
        return (await element.isExisting()) && (await element.isDisplayed()); // Wait until the element is displayed
      },
      {
        timeout: 15000, // Maximum wait time (15 seconds)
        interval: 500,
        timeoutMsg: `Element with XPath "${xpath}" did not become visible within 15 seconds`,
      }
    );
  }

  async waitForElementToBeVisibleCustom(xpath, timeout = 15000) {
    const element = await $(xpath);

    await browser.waitUntil(
      async () => {
        return (await element.isExisting()) && (await element.isDisplayed());
      },
      {
        timeout: timeout, // Use the passed timeout value
        interval: 500,
        timeoutMsg: `Element with XPath "${xpath}" did not become visible within ${
          timeout / 1000
        } seconds`,
      }
    );
  }

  async selectImages(count) {
    for (let i = 2; i <= count; i++) {
      const xpath = `(//android.view.View[@resource-id="com.myzesty:id/hover"])[${i}]`;
      const image = await $(xpath);

      if (await image.isDisplayed()) {
        await image.click();
        console.log(`Image ${i} selected.`);
      } else {
        console.log(`Image ${i} not found or not visible.`);
      }
    }
    await browser.pause(1000);

    console.log(`✅ ${count} images selection completed.`);
  }

  get undo() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/undo"]');
  }
  get redo() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/redo"]');
  }
  async Undo_changes() {
    try {
      while (await this.undo.isEnabled()) {
        await this.undo.click();
        await browser.pause(500);
      }
    } catch (error) {
      console.log("Error while undoing changes:", error.message);
    }
  }

  async Redo_changes() {
    try {
      while ((await this.redo.getAttribute("enabled")) === "true") {
        await this.redo.click();
        await browser.pause(500);
      }
    } catch (error) {
      console.log("Error while redoing changes:", error.message);
    }
  }

  async softAssertElementPresent(selector) {
    try {
      const elem = await $(selector);

      // Wait up to 5s for the element to exist
      const isPresent = await elem.waitForExist({ timeout: 5000 });

      if (isPresent) {
        console.log(`✅ Effect Sub bar is present.`);
      } else {
        console.warn(`❌ Effect Sub bsr is not present`);
      }
    } catch (err) {
      console.warn(`⚠️ Could not check effect sub bar: ${err.message}`);
    }
  }

  async waitForElementEnabled(selector, timeout = 5000) {
    const elem = await $(selector);
    await elem.waitForEnabled({ timeout });
    console.log("✅ Element is enabled");
  }

  async Apply_All_Effects(xpathBase, maxScrolls = 2, startIndex = 1) {
    let index = startIndex;
    let processCount = 0;
    let scrollCount = 0;

    // Set value of While == true if you want to check all effects available in the list
    while (processCount < 6) {
      try {
        const fullXpath = `(${xpathBase})[${index}]`;
        const effect = await $(fullXpath);

        if (!(await effect.isExisting())) {
          console.log(`No more effects found at index ${index}.`);
          break;
        }

        console.log(`Clicking on effect ${index + scrollCount * 5}`);
        await effect.click();
        await browser.pause(1500);
        index++;
        processCount++;

        if (index > 5) {
          if (scrollCount < maxScrolls) {
            scrollCount++;
            await Sliders.scrollScreen(940, 1773, 107, 1773, 1500);
            await browser.pause(1000);
            index = 2; // Restart from 2 to avoid repeating first effect
          } else {
            console.log("Reached max scroll count. Ending.");
            break;
          }
        }
      } catch (error) {
        console.log(`Error clicking effect ${index}:`, error.message);
        break;
      }
    }
  }

  async validateCategories(
    categories = ["Retro", "VHS", "Glitch", "Film", "Light", "Color", "Blur"]
  ) {
    console.log("🎬 Starting effect categories validation...");

    const results = {
      found: [],
      notFound: [],
      totalCategories: categories.length,
    };

    // Scroll coordinates for horizontal scrolling in effects panel
    const scrollY = 1664; // Approximate Y position of categories
    const maxScrollAttempts = 5; // Reduced since we're doing bidirectional

    // Scroll configurations for both directions
    const scrollConfigs = {
      rightToLeft: { startX: 969, endX: 180 },
      leftToRight: { startX: 180, endX: 969 },
    };

    for (const category of categories) {
      console.log(`🔍 Searching for category: ${category}`);
      let categoryFound = false;
      const categoryXpath = `//android.widget.TextView[@text="${category}"]`;

      // Check if category is visible initially (without scrolling)
      try {
        const categoryElement = await $(categoryXpath);
        if (
          (await categoryElement.isExisting()) &&
          (await categoryElement.isDisplayed())
        ) {
          console.log(`✅ Found category: ${category} (initial position)`);
          results.found.push(category);
          categoryFound = true;

          // Click on the category to verify it's interactive
          await categoryElement.click();
          await browser.pause(500);
          console.log(`🎯 Successfully clicked on ${category} category`);
          continue;
        }
      } catch (error) {
        console.log(
          `🔍 Category ${category} not in initial view, will scroll to find it`
        );
      }

      // If not found initially, try scrolling in both directions
      if (!categoryFound) {
        // First try scrolling right to left using Slider function
        categoryFound = await this.scrollAndSearchCategoryWithSlider(
          category,
          categoryXpath,
          scrollConfigs.rightToLeft,
          scrollY,
          maxScrollAttempts,
          "right-to-left"
        );

        // If still not found, reset position and try left to right
        if (!categoryFound) {
          console.log(
            `🔄 Category ${category} not found scrolling right-to-left, trying left-to-right...`
          );
          await this.resetToBeginningUsingSlider();

          categoryFound = await this.scrollAndSearchCategoryWithSlider(
            category,
            categoryXpath,
            scrollConfigs.leftToRight,
            scrollY,
            maxScrollAttempts,
            "left-to-right"
          );
        }

        if (categoryFound) {
          results.found.push(category);
        } else {
          console.log(
            `❌ Category not found after bidirectional scrolling: ${category}`
          );
          results.notFound.push(category);
        }
      }

      // Reset to beginning position for next category search
      await this.resetToBeginningUsingSlider();
    }

    // Generate summary report
    console.log("\n🎬 ===== EFFECT CATEGORIES VALIDATION REPORT =====");
    console.log(`📊 Total Categories Tested: ${results.totalCategories}`);
    console.log(`✅ Categories Found: ${results.found.length}`);
    console.log(`❌ Categories Not Found: ${results.notFound.length}`);

    if (results.found.length > 0) {
      console.log(`✅ Found Categories: ${results.found.join(", ")}`);
    }

    if (results.notFound.length > 0) {
      console.log(`❌ Missing Categories: ${results.notFound.join(", ")}`);
    }

    console.log("🎬 ===============================================\n");

    return results;
  }

  // Helper function to scroll in a specific direction and search for category using Slider functions
  async scrollAndSearchCategoryWithSlider(
    category,
    categoryXpath,
    scrollConfig,
    scrollY,
    maxAttempts,
    direction
  ) {
    let scrollAttempts = 0;

    while (scrollAttempts < maxAttempts) {
      try {
        const categoryElement = await $(categoryXpath);

        // Check if element exists and is displayed
        if (
          (await categoryElement.isExisting()) &&
          (await categoryElement.isDisplayed())
        ) {
          console.log(
            `✅ Found category: ${category} (after ${direction} scroll #${
              scrollAttempts + 1
            })`
          );
          // Click on the category to verify it's interactive
          await categoryElement.click();
          await browser.pause(500);
          console.log(`🎯 Successfully clicked on ${category} category`);

          return true;
        }
      } catch (error) {
        console.log(
          `❌ Category ${category} not visible during ${direction} scroll attempt ${
            scrollAttempts + 1
          }`
        );
      }
      // Perform scroll if category not found and we haven't reached max attempts
      if (scrollAttempts < maxAttempts - 1) {
        // Use Slider's scrollScreenHorizontally function
        await Slider.scrollScreenHorizontally(
          scrollConfig.startX,
          scrollConfig.endX,
          scrollY,
          800 // duration
        );

        await browser.pause(1000);
        console.log(
          `📱 Performed ${direction} scroll ${
            scrollAttempts + 1
          } for ${category} using Slider function`
        );
      }

      scrollAttempts++;
    }
    return false;
  }

  // Helper function to scroll back to the beginning using Slider functions
  async resetToBeginningUsingSlider() {
    console.log("🔄 Scrolling back to beginning of categories using Slider...");

    // Scroll left to right multiple times to ensure we're at the start
    for (let i = 0; i < 3; i++) {
      await Slider.scrollScreenHorizontally(200, 800, 1400, 800);
      await browser.pause(500);
    }

    console.log("✅ Scrolled back to beginning using Slider");
  }
  // Function to wait for element to be enabled (helper function)
  async waitForElementEnabled(xpath, timeout = 10000) {
    const element = await $(xpath);
    await browser.waitUntil(
      async () => {
        const isEnabled = await element.isEnabled();
        return isEnabled;
      },
      {
        timeout: timeout,
        timeoutMsg: `Element ${xpath} was not enabled within ${timeout}ms`,
      }
    );
  }

  async clickElementByXPath(xpath) {
    const element = await $(xpath);

    // wait until element is visible
    await element.waitForDisplayed({
      timeout: 15000,
      timeoutMsg: `Element not visible: ${xpath}`,
    });

    await element.click();
    console.log(`Clicked element: ${xpath}`);
  }
}

export default new Common_function();
