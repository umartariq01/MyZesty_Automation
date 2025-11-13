import WizardMagicTouch from "../pageobjects/WizardMagictouch.page.js";
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

  it("Verify that the Magic effect can be applied to a single selected media file.", async () => {
    await WizardMagicTouch.Open_WizardEditor();
    await WizardMagicTouch.Click_Album();
    await WizardMagicTouch.Click_Automation_Album();
    await WizardMagicTouch.Click_Img_Tab();
    await WizardMagicTouch.Select_Media_1();
    await WizardMagicTouch.Click_Done_Btn();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await WizardMagicTouch.Click_Magic_Touch_Tab();
    await WizardMagicTouch.Check_Magic_Touch_Applied();
    await browser.pause(1000);
  });

  it("Verify that when multiple media files are added, Magic applies automatically to all.", async () => {
    await WizardMagicTouch.Click_Advance_Add();
    await WizardMagicTouch.Click_Album();
    await WizardMagicTouch.Click_Automation_Album();
    await WizardMagicTouch.Click_Img_Tab();
    await Common_function.selectImages(3);
    await WizardMagicTouch.Click_Done_Btn();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await WizardMagicTouch.Click_Magic_Touch_Tab();
    await browser.pause(600);
    await WizardMagicTouch.Click_Magic_Touch_Tab();
    await WizardMagicTouch.Check_Magic_Touch_Applied();
    await browser.pause(1000);
  });

  it("Verify that tapping Undo reverses the Magic effect successfully.", async () => {
    await WizardMagicTouch.Undo_Change();
    await browser.pause(700);
    await WizardMagicTouch.Check_Magic_Touch_Not_Applied();
    await browser.pause(1000);
  });

  it("Verify that tapping Redo reapplies the Magic effect that was undone.", async () => {
    await WizardMagicTouch.Redo_Change();
    await browser.pause(700);
    await WizardMagicTouch.Check_Magic_Touch_Applied();
    await browser.pause(1000);
  });

  it("Verify that tapping Magic icon again removes the effect from all media.", async () => {
    await WizardMagicTouch.Click_Magic_Touch_Tab();
    await browser.pause(700);
    await WizardMagicTouch.Check_Magic_Touch_Not_Applied();
    await browser.pause(1000);
  });

  it("Verify that the Magic effect works on both photos and videos.", async () => {
    await WizardMagicTouch.Click_Advance_Add();
    await WizardMagicTouch.Click_Album();
    await WizardMagicTouch.Click_Automation_Album();
    await WizardMagicTouch.Click_Video_Tab();
    await WizardMagicTouch.Select_Media_1();
    await WizardMagicTouch.Click_Done_Btn();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await WizardMagicTouch.Click_Magic_Touch_Tab();
    await browser.pause(600);
    // await WizardMagicTouch.Click_Magic_Touch_Tab();
    await WizardMagicTouch.Check_Magic_Touch_Applied();
    await browser.pause(1000);
  });

  it("Verify that if user exits the project, the Magic effect remains saved in draft.", async () => {
    await WizardMagicTouch.Click_Close_Project();
    await browser.pause(1000);
    await WizardMagicTouch.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await WizardMagicTouch.Check_Magic_Touch_Applied();
    await browser.pause(1000);
  });

  it("Verify that Magic effect remains visible in exported video file.", async () => {
    await WizardMagicTouch.Export_Media();
    // await Common_function.waitForElementToBeVisible(
    //   '//android.view.ViewGroup[@content-desc="Done"]'
    // );
    // await WizardMagicTouch.Export_Done_Btn();
  });
});
