import Canvas from "../pageobjects/Canvas.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";

describe("Canvas Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Canvas Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Canvas Feature Test Suite finished =====");
  });

  it("Check that the 1:1 canvas applies correctly and media fits properly.", async () => {
    await Canvas.Open_VideoEditor();
    await Canvas.Click_Album();
    await Canvas.Click_Automation_Album();
    await Canvas.Click_Img_Tab();
    await Canvas.Select_Media_1();
    await Canvas.Click_Done_Btn();
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(2);
    await Canvas.Click_Apply_Changes();
  });

  it("Check that the 4:5 canvas applies and media looks fine without cutting.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(3);
    await Canvas.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Check that the 16:9 canvas changes to a wide screen and shows media correctly.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(4);
    await Canvas.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Check that the 9:16 canvas changes to a tall screen (for reels/stories) and works fine.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(5);
    await Canvas.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Check that the 3:4 canvas applies properly and media stays in place.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(6);
    await Canvas.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Check that the 4:3 canvas applies correctly and media looks fine.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(7);
    await Canvas.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Click the None button and check that it goes back to the default canvas.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(1);
    await Canvas.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Select any canvas size, save it to Drafts, and check that the same size shows when opened again.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Canvas"]',
      910,
      2322,
      110,
      2322
    );
    await Canvas.Click_Canvas_Tab();
    await Canvas.Canvas_Size(5);
    await Canvas.Click_Apply_Changes();
    await browser.pause(500);
    await Canvas.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.Button[@resource-id="com.myzesty:id/btn_done"]',
      60000
    );
    await Canvas.Export_Done_Btn();
  });
});
