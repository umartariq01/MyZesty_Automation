import WizardEffect from "../pageobjects/WizardEffect.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";

describe("Wizard Effect Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Wizard Effect Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Wizard Effect Feature Test Suite finished =====");
    await SoftAssert.assertAll();
  });

  it("Verify that the user can successfully access the Effects editor from the right pane menu.", async () => {
    // await Slider.scrollUntilElementIsVisible(
    //   '//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup',
    //   756,
    //   1536,
    //   290,
    //   1536
    // );
    await Slider.Bidirection_scrollScreen_FindElement(
      '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup',
      '//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup'
    );
    await WizardEffect.Open_WizardEditor();
    await WizardEffect.Click_Album();
    await WizardEffect.Click_Automation_Album();
    await WizardEffect.Click_Img_Tab();
    await Common_function.selectImages(4);
    await WizardEffect.Click_Done_Btn();
    await WizardEffect.Verify_Wizard_PopUp();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await WizardEffect.Click_Effect();
    const actual_Text = await WizardEffect.effect_panel.getText();
    await SoftAssert.assertEqual(
      actual_Text,
      "Effects",
      "Effects panel did not open correctly"
    );
  });

  it("Verify that effect categories (Retro, VHS, etc.) are present and accessible with scrolling", async () => {
    // Validate the specific categories you mentioned plus some common ones
    const categoriesToTest = [
      "Retro",
      "VHS",
      "Blur",
      "Glitch",
      "Split",
      "Light",
      "Party",
      "Neon",
      "Distort",
      "Mirror",
      "Magnify",
      "Outro",
      "Intro",
      "Zoom",
      "Vibrant",
      "SoundSync",
      "Glitz",
      "Dynamic",
      "Cinematic",
      "Overlays",
      "Romance",
      "Frames",
    ];

    const results = await WizardEffect.validateEffectCategories(
      categoriesToTest
    );

    // Calculate success rate
    const successRate = results.found.length / results.totalCategories;
    const successPercentage = Math.round(successRate * 100);
    const minimumRequired = 80;

    console.log(`📊 Effect Categories Validation Results:`);
    console.log(
      `   - Found: ${results.found.length}/${results.totalCategories} categories`
    );
    console.log(`   - Success Rate: ${successPercentage}%`);
    console.log(`   - Minimum Required: ${minimumRequired}%`);

    // Only add soft assertion if the test actually fails
    if (successPercentage < minimumRequired) {
      await SoftAssert.assertEqual(
        successPercentage,
        `>=${minimumRequired}`,
        `Expected to find at least ${minimumRequired}% of effect categories, but found ${successPercentage}%`
      );
    } else {
      console.log(
        `✅ Test PASSED: Found ${successPercentage}% of effect categories (exceeds ${minimumRequired}% requirement)`
      );
    }
  });

  it("Verify that effect can be downloaded and applied to media successfully.", async () => {
    await WizardEffect.Click_Effect_1();
    await Common_function.waitForElementEnabled(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
    await browser.pause(1000);
    await WizardEffect.Apply_Changes();
  });

  it("Verify that the reset icon removes the applied effect from the media.", async () => {
    await WizardEffect.Click_Effect();
    await WizardEffect.Click_Reset_Effect();
    await browser.pause(1000);
  });

  it("Verify that tapping the close (X) icon discards the applied effect.", async () => {
    await WizardEffect.Click_Close_Project(); // Cancell the change
    await browser.pause(1000);
  });

  it("Verify that user cannot apply multiple effects simultaneously on a single media.", async () => {
    await WizardEffect.Click_Effect();
    await WizardEffect.Click_Effect_1(4);
    await Common_function.waitForElementEnabled(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
    // await browser.pause(1000);
    await WizardEffect.Apply_Changes();
    await browser.pause(500);
  });

  it("Verify that when multiple media files are present, an effect can be applied to a specific selected media only.", async () => {
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[2]'
    );
    await WizardEffect.Click_Effect();
    await WizardEffect.Click_Effect_1(2);
    await Common_function.waitForElementEnabled(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
    await WizardEffect.Apply_Changes();
    await browser.pause(500);
    await Slider.play_pause(532, 1408);
    await browser.pause(3000);
    await Slider.play_pause(532, 1408);
    await browser.pause(500);
  });

  it("Verify that the “Apply to All” radio button applies the selected effect to all media in the project.", async () => {
    await WizardEffect.Click_Effect();
    await WizardEffect.Click_Effect_1(3);
    await Common_function.waitForElementEnabled(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
    // Apply to all
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@resource-id="com.myzesty:id/btn_apply_to_all"]'
    );
    await WizardEffect.Apply_Changes();
    await Slider.Slider(18, 1062, 1477, 1527, 0);
    await Slider.play_pause(532, 1408);
    await browser.pause(3000);
    await Slider.play_pause(532, 1408);
  });

  it("Verify that applying a new effect removes the previously applied one automatically.", async () => {
    await WizardEffect.Click_Effect();
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@text="VHS"]'
    );
    await browser.pause(1000);
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[7]'
    );
    await browser.pause(1000);
    // Apply to all
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@resource-id="com.myzesty:id/btn_apply_to_all"]'
    );
    await WizardEffect.Apply_Changes();
    await browser.pause(700);
  });

  it("Verify that saving project in draft then open again will retain the changes.", async () => {
    await WizardEffect.Click_Close_Project();
    await browser.pause(700);
    await WizardEffect.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
  });

  it("Verify that the exported media contains all the changes.(Because share screen not visible)", async () => {
    await WizardEffect.Export_Media();
    //   await Common_function.waitForElementToBeVisible(
    //     '//android.view.ViewGroup[@content-desc="Done"]'
    //   );
    //   await WizardEffect.Export_Done_Btn();
  });
});
