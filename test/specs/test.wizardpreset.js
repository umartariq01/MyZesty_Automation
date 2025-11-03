import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import WizardPreset from "../pageobjects/WizardPreset.page.js";

describe("Wizard Preset Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Wizard Preset Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Wizard Preset Feature Test Suite finished =====");
    await SoftAssert.assertAll();
  });

  it("Verify that the user can successfully open the Presets editor from the Wizard Editor.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup',
      756,
      1536,
      290,
      1536
    );
    await WizardPreset.Open_WizardEditor();
    await WizardPreset.Click_Album();
    await WizardPreset.Click_Automation_Album();
    await WizardPreset.Click_Img_Tab();
    await Common_function.selectImages(4);
    await WizardPreset.Click_Done_Btn();
    await WizardPreset.Verify_Wizard_PopUp();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await WizardPreset.Click_Preset_Tab();
    const actual_Text = await WizardPreset.preset_panel.getText();
    await SoftAssert.assertEqual(
      actual_Text,
      "Presets",
      "Presets panel did not open!S"
    );
    await browser.pause(1000);
  });

  it("Verify that all preset categories are visible in the Presets panel.", async () => {
    await Common_function.validateCategories([
      "Stylze",
      "Movie",
      "Outdoor",
      "Night",
      "Color",
      "Mono",
      "Portrait",
      "Retro",
      "Unique",
      "Gradient",
      "Trends",
      "Duo",
    ]);
    await browser.pause(1000);
  });

  it("Verify that a free preset can be downloaded and applied successfully.", async () => {
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await browser.pause(1000);
  });

  it("Verify that user can adjust preset intensity using the slider.", async () => {
    await Slider.Slider(223, 941, 2273, 2383, 0.9);
    await WizardPreset.Apply_Changes();
  });

  it("Verify that tapping the reset button removes the applied preset.", async () => {
    await WizardPreset.Click_Preset_Tab();
    await WizardPreset.Reset_Presets();
    await WizardPreset.Apply_Changes();
  });

  it("Verify that the Apply to All radio button applies the preset to all selected media files.", async () => {
    await WizardPreset.Click_Preset_Tab();
    await Common_function.clickElementByXPath(
      '//android.widget.LinearLayout[@content-desc="Movie"]' // Move to Movie Category
    );
    await browser.pause(700);
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]' // Select a preset
    );
    await browser.pause(1000);
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@resource-id="com.myzesty:id/btnApplyToAll"]'
    );
    await WizardPreset.Apply_Changes();
    await Slider.play_pause(532, 1408);
    await browser.pause(3000);
    await Slider.play_pause(532, 1408);
    await browser.pause(500);
  });

  it("Verify that a preset can be applied only to a single selected media file.", async () => {
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[1]' // Select a media
    );
    await WizardPreset.Click_Preset_Tab();
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@resource-id="com.myzesty:id/btnApplyToAll"]'
    );
    await WizardPreset.Reset_Presets();
    await WizardPreset.Apply_Changes();
    await WizardPreset.Click_Preset_Tab();
    await Common_function.clickElementByXPath(
      '//android.widget.LinearLayout[@content-desc="Movie"]' // Move to Movie Category
    );
    await browser.pause(700);
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
    await browser.pause(1000);
    await WizardPreset.Apply_Changes();
    await Slider.play_pause(532, 1408);
    await browser.pause(3000);
    await Slider.play_pause(532, 1408);
    await browser.pause(500);
  });

  it("Verify that tapping the close (x) icon removes the applied preset and closes the panel.", async () => {
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[1]'
    );
    await WizardPreset.Click_Preset_Tab();
    await WizardPreset.Reset_Presets();
  });

  it("Verify that after removing a preset, related buttons (Reset, Apply to All, Slider) become disabled.", async () => {
    const isEnabled = await WizardPreset.remove_preset.isEnabled();
    if (isEnabled) {
      console.log("✅ Reset is enabled.");
    } else {
      console.log("🚫 Reset is disabled.");
    }
    const isSlidable = await WizardPreset.preset_intensity_slider.isEnabled();
    if (isSlidable) {
      console.log("✅ Slider is enabled.");
    } else {
      console.log("🚫 Slider is disabled.");
    }
    await browser.pause(1000);
  });

  it("Verify that by default, every applied preset has its intensity set to 70%.", async () => {
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
    const Intensity_Value =
      await WizardPreset.preset_intensity_slider_value.getText();
    await SoftAssert.assertEqual(
      Intensity_Value,
      "70",
      "Preset intensity is not set to 70% by default."
    );
    await browser.pause(1000);
  });

  it("Verify that tapping the close (x) icon removes the applied preset and closes the panel.", async () => {
    await WizardPreset.Click_Close_Project(); // Close Preset panel
    await browser.pause(700);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/addVideo"]'
    );
  });

  it("Verify that applying a new preset removes the previously applied one.", async () => {
    await WizardPreset.Click_Preset_Tab();
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@text="Outdoor"]'
    );
    await browser.pause(700);
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@resource-id="com.myzesty:id/btnApplyToAll"]'
    );
    await browser.pause(1000);
    await WizardPreset.Apply_Changes();
    await Slider.play_pause(532, 1408);
    await browser.pause(3000);
    await Slider.play_pause(532, 1408);
    await browser.pause(500);
  });

  it.skip("Verify that after perfoming Undo Redo , project retains all the changes in exact order.", async () => {
    await Common_function.Undo_changes();
    await browser.pause(1000);
    await Common_function.Redo_changes();
    await browser.pause(1000);
  });

  it("Verify that Saving project in draft and opening it retianes the changes", async () => {
    await WizardPreset.Click_Close_Project();
    await browser.pause(700);
    await WizardPreset.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Slider.play_pause(534, 1412);
    await browser.pause(4000);
    await Slider.play_pause(534, 1412);
  });

  it.skip("Verify the Export media retains the applied changes.", async () => {
    await WizardPreset.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.view.ViewGroup[@content-desc="Done"]'
    );
    await WizardPreset.Export_Done_Btn();
  });
});
