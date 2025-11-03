import { $, browser } from "@wdio/globals";
import Slider from "../pageobjects/Slider.page.js";

class WizardEffect {
  get wizardEditor() {
    return $(
      `//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup`
    );
  }
  get images_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Images"]'
    );
  }
  get video_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Videos"]'
    );
  }
  get done_button() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/done"]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get advance_add() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/addVideo"]'
    );
  }
  get close_project() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"]'
    );
  }
  get open_draft() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/img"])[1]'
    );
  }
  get export() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/export"]'
    );
  }
  get export_done() {
    return $('//android.view.ViewGroup[@content-desc="Done"]');
  }
  get album() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/album_name"]'
    );
  }
  get automation_album() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/tv_folder_name" and @text="Automation"]'
    );
  }
  get go_back() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
    );
  }
  get wizard_popup() {
    return $('//android.widget.TextView[@text="Start Creating"]');
  }
  get effects() {
    return $(
      '//android.widget.LinearLayout[@resource-id="com.myzesty:id/effect"]/android.widget.ImageView'
    );
  }
  get effect_panel() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/title"]');
  }
  get rest_effect() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
  }

  async Open_WizardEditor() {
    await this.wizardEditor.click();
  }
  async Click_Img_Tab() {
    await this.images_tab.click();
  }
  async Click_Video_Tab() {
    await this.video_tab.click();
  }
  async Click_Advance_Add() {
    await this.advance_add.click();
    await browser.pause(500);
  }
  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Close_Project() {
    await (await this.close_project).click();
  }
  async Open_Draft_Proj() {
    await (await this.open_draft).click();
  }
  async Click_Done_Btn() {
    await this.done_button.click();
    await browser.pause(2000);
  }
  async Apply_Changes() {
    await this.apply_changes.click();
  }
  async Toolbar_Back() {
    await this.go_back.click();
  }
  async Export_Media() {
    await this.export.click();
  }
  async Export_Done_Btn() {
    const isVisible = await this.export_done.waitForDisplayed();
    if (isVisible) {
      await this.export_done.click();
    } else {
      console.log("Done Button not visible.");
    }
  }
  async Select_Media_1(index = 1) {
    const selector = `(//android.view.View[@resource-id="com.myzesty:id/hover"])[${index}]`;
    await $(selector).click();
  }
  async Verify_Wizard_PopUp() {
    const isVisible = await this.wizard_popup.isExisting();
    if (isVisible) {
      await this.wizard_popup.click();
    } else {
      console.log("Wizard Popup is not displayed.");
    }
  }

  async applyEffects(xpathBase, totalEffects = 1, startIndex = 1) {
    let index = startIndex;
    let applied = 0;

    while (applied < totalEffects) {
      const fullXpath = `(${xpathBase})[${index}]`;
      const effect = await $(fullXpath);

      if (!(await effect.isExisting())) {
        console.log(`❌ No effect found at index ${index}.`);
        break;
      }

      console.log(`🎨 Applying effect #${applied + 1} (index ${index})`);
      await effect.click();
      await this.waitForElementEnabled(
        '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
      );
      // await browser.pause(1000);

      // Click Done
      const doneBtn = await $(
        '//android.widget.ImageView[@resource-id="com.myzesty:id/done"]'
      );
      await doneBtn.waitForDisplayed({ timeout: 10000 });
      await doneBtn.click();
      console.log("✅ Clicked Done");
      await browser.pause(500);

      // Click Add
      if (applied + 1 < totalEffects) {
        const addBtn = await $(
          '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
        );
        await addBtn.waitForDisplayed({ timeout: 5000 });
        await addBtn.click();
        console.log("➕ Clicked Add");
        await browser.pause(1000);
      }

      index++;
      applied++;
    }

    console.log(`✨ Applied ${applied} effects successfully`);
  }
  async Click_Effect() {
    await this.effects.click();
  }

  // Function to validate effect categories with scrolling
  async validateEffectCategories(
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
  async Click_Effect_1(index = 1) {
    const effectSelector = `(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[${index}]`;
    await $(effectSelector).click();
  }
  async Click_Reset_Effect() {
    await this.rest_effect.click();
  }
}

export default new WizardEffect();
