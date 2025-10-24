import Tune from "../pageobjects/Tune.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";

describe("Tune Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Tune Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Tune Feature Test Suite finished =====");
  });

  it("Apply Tune filters on Image and verify changes in Preview", async () => {
    await Tune.Open_VideoEditor();
    await Tune.Click_Album();
    await Tune.Click_Automation_Album();
    await Tune.Click_Img_Tab();
    await Tune.Select_Media_1();
    await Tune.Click_Done_Btn();
    await browser.pause(2000);
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Tune"]',
      1025,
      2329,
      96,
      2329
    );
    await Tune.Click_Tune_Tab();
    await Tune.Click_Tune_Magic();
    await Tune.Click_Tune_Brightness();
    await Tune.Click_Tune_Contrast();
    await Tune.Click_Tune_Saturation();
    await Tune.Click_Tune_Tint();
    await Sliders.scrollScreen(1039, 1854, 192, 1854, 1000);
    await Tune.Click_Tune_Temperature();
    await Tune.Click_Tune_Hue();
    await Tune.Click_Tune_Highlight();
    await Tune.Click_Tune_Shadow();
    await Sliders.scrollScreen(1039, 1854, 192, 1854, 1000);
    await Tune.Click_Tune_Vibrance();
    await Tune.Click_Tune_Sharpen();
    await Tune.Click_Apply_Changes();
  });

  it("Save the Project in draft , Reopen project and verify changes.", async () => {
    await Tune.Click_Close_Project();
    await browser.pause(500);
    await Tune.Open_Draft_Proj();
    await browser.pause(2000);
  });

  it("Undo / Redo all changes and  verify the that changes reflect in preview.", async () => {
    await Common_function.Undo_changes();
    await browser.pause(1000);
    await Common_function.Redo_changes();
  });

  it("Apply Tune filters on Image and verify changes in Preview", async () => {
    await Tune.Click_Advance_Add();
    await Tune.Click_Album();
    await Tune.Click_Automation_Album();
    await Tune.Click_Video_Tab();
    await Tune.Select_Media_1();
    await Tune.Click_Done_Btn();
    await browser.pause(4000);
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Tune"]',
      1025,
      2329,
      96,
      2329
    );
    await Tune.Click_Tune_Tab();
    await Tune.Click_Tune_Magic();
    await Tune.Click_Tune_Brightness();
    await Tune.Click_Tune_Contrast();
    await Tune.Click_Tune_Saturation();
    await Tune.Click_Tune_Tint();
    await Sliders.scrollScreen(1039, 1854, 192, 1854, 1000);
    await Tune.Click_Tune_Temperature();
    await Tune.Click_Tune_Hue();
    await Tune.Click_Tune_Highlight();
    await Tune.Click_Tune_Shadow();
    await Sliders.scrollScreen(1039, 1854, 192, 1854, 1000);
    await Tune.Click_Tune_Vibrance();
    await Tune.Click_Tune_Sharpen();
    await Tune.Click_Apply_Changes();
  });

  it("Verify Remove tune effect button is working as expected.", async () => {
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Tune"]',
      1025,
      2329,
      96,
      2329
    );
    await Tune.Click_Tune_Tab();
    await Tune.Remove_Tune_Effects();
    await Tune.Click_Apply_Changes();
  });

  it("Verify Export media with tune effects.", async () => {
    await Common_function.Redo_changes();
    await Tune.Export_Media();
    await browser.pause(8000);
    await Tune.Export_Done_Btn();
  });
});
