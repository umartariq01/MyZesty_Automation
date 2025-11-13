import Wizard_BG from "../pageobjects/WizardBG.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { $, browser, expect } from "@wdio/globals";
import commonfunPage from "../pageobjects/commonfun.page.js";
import SoftAssert from "../pageobjects/SoftAssert.page.js";

describe("Wizard Audio Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Wizard Audio Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Wizard Audio Feature Test Suite finished =====");
    await SoftAssert.assertAll();
  });

  it("Verify that tapping the Background icon opens the background options menu successfully.", async () => {
    await Wizard_BG.Open_WizardEditor();
    await Wizard_BG.Click_Album();
    await Wizard_BG.Click_Automation_Album();
    await Wizard_BG.Click_Img_Tab();
    await Wizard_BG.Select_Media_1();
    await Wizard_BG.Click_Done_Btn();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await Wizard_BG.Click_Remove_BG_Tab();
    const isVisible = await Wizard_BG.background_text.getText();
    await SoftAssert.assertEqual(
      isVisible,
      "Background",
      "Background options menu did not open!"
    );
    await browser.pause(1000);
  });

  it("Verify that tapping the drop (blur) icon applies a blur effect on the background.", async () => {
    await Common_function.clickElementByXPath(
      // Select Self Image BG
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_canvas_background"])[2]'
    );
    await browser.pause(1000);
  });

  it("Verify that the scale slider adjusts the zoom level of background correctly.", async () => {
    await Slider.Slider(158, 929, 1873, 1923, 0.3);
    await browser.pause(800);
  });

  it("Verify that tapping close (X) discards background changes and closes menu.", async () => {
    await Wizard_BG.Click_Close_Project(); // Close BG Panel
    await browser.pause(700);
  });

  it("Verify that the scale slider defaults to 90 on opening Background menu.", async () => {
    await Wizard_BG.Click_Remove_BG_Tab();
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_canvas_background"])[2]'
    );
    const value = await Wizard_BG.bg_default_value.getText();
    await SoftAssert.assertEqual(
      value,
      "90",
      "Bg Default value is not correct!"
    );
    await browser.pause(700);
  });

  it("Verify that user cannot slide below 10 or above 200 on scale slider.", async () => {
    await Slider.Slider(158, 929, 1873, 1923, 0);
    const min_value = await Wizard_BG.bg_default_value.getText();
    await SoftAssert.assertEqual(
      min_value,
      "10",
      "Minimum Slider value mismatched!"
    );
    await browser.pause(500);
    await Slider.Slider(158, 929, 1873, 1923, 1);
    const max_value = await Wizard_BG.bg_default_value.getText();
    await SoftAssert.assertEqual(
      max_value,
      "200",
      "Maximum Slider value mismatched!"
    );
    await browser.pause(700);
  });

  it("Verify that user can reset background to None state.", async () => {
    await Common_function.clickElementByXPath(
      // Select None option
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_canvas_background"])[1]'
    );
    await Wizard_BG.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that user can select a photo from the gallery to set as background.", async () => {
    await Wizard_BG.Click_Remove_BG_Tab();
    await Common_function.clickElementByXPath(
      // Add BG from library
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_canvas_background"])[3]'
    );
    await Wizard_BG.Click_Album();
    await Wizard_BG.Click_Automation_Album();
    await Wizard_BG.Select_Media_1(5);
    await Slider.Slider(158, 929, 1873, 1923, 0.4);
    await Wizard_BG.Apply_Changes();
    await browser.pause(600);
  });

  it("Verify that sliding through the solid color row applies different background colors.", async () => {
    await Wizard_BG.Click_Remove_BG_Tab();
    await Wizard_BG.clickByIndexRange(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/color_bg"])',
      1,
      4
    );
    await Wizard_BG.Apply_Changes();
    await browser.pause(800);
  });

  it('Verify that selecting "Apply to all" applies current background settings to all media files in the project.', async () => {
    await Wizard_BG.Click_Advance_Add();
    await Wizard_BG.Click_Album();
    await Wizard_BG.Click_Automation_Album();
    await Wizard_BG.Click_Img_Tab();
    await Common_function.selectImages(4);
    await Wizard_BG.Click_Video_Tab();
    await Wizard_BG.Select_Media_1();
    await Wizard_BG.Click_Done_Btn();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await Wizard_BG.Click_Remove_BG_Tab();
    await Common_function.clickElementByXPath(
      // Select a BG
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/color_bg"])[2]'
    );
    await Wizard_BG.Apply_All();
    await Wizard_BG.Apply_Changes();
    await browser.pause(1000);
    await Slider.Slider(18, 1062, 1477, 1527, 0.8);
  });

  it("Verify that background settings remain intact when project is saved as draft and reopened.", async () => {
    await Wizard_BG.Click_Close_Project();
    await browser.pause(1000);
    await Wizard_BG.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await Slider.Slider(18, 1062, 1477, 1527, 0.5);
  });

  it("Verify that user can overwrite an existing background with a new one.", async () => {
    await Wizard_BG.Click_Remove_BG_Tab();
    await Common_function.clickElementByXPath(
      // Add BG from library
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/color_bg"])[4]'
    );
    await Wizard_BG.Apply_All();
    await Wizard_BG.Apply_Changes();
    await browser.pause(700);
  });

  it.skip("Verify that applied background remains visible in exported output file.", async () => {
    await Wizard_BG.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.view.ViewGroup[@content-desc="Done"]'
    );
    await Wizard_BG.Export_Done_Btn();
  });
});
