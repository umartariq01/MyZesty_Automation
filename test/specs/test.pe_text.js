import Photo_Editor_Text from "../pageobjects/PE_Text.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { $, browser, driver, expect } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import Logger from "../pageobjects/Logs.page.js";

describe("Photo Editor Text Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Photo Editor Text Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
    await Logger.start("[COLLECT]");
  });

  after(async () => {
    console.log("===== Photo Editor Text Feature Test Suite finished =====");
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify text input field/Add Text Screen opens when tapping “Text”", async () => {
    await Photo_Editor_Text.Open_PhotoEditor();
    await Photo_Editor_Text.Click_Album();
    await Photo_Editor_Text.Click_Automation_Album();
    await Photo_Editor_Text.Select_Media_1(5);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
    await Photo_Editor_Text.Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Text"]'
    );
    await Photo_Editor_Text.Click_Text_Tab();
  });

  it("Verify text entry and confirmation and text is visible on preview", async () => {
    await Common_function.waitForElementToBeVisible(
      '//android.widget.EditText[@resource-id="com.myzesty:id/add_text_edit_text"]'
    );
    await driver.keys("Image Editor");
  });

  it("Validate text size adjustment using slider and text changes are reflected on preview", async () => {
    await Slider.Slider(28, 1052, 1431, 1541, 0.5);
  });

  it("Verify Bold and Italic functionality applied to text and changes are reflected in Preview.", async () => {
    await Photo_Editor_Text.Click_Bold();
    await Photo_Editor_Text.Click_Italic();
    await browser.pause(700);
    await Photo_Editor_Text.Apply_Text();
  });

  it("Verify Delete removes selected text and text is removed from the Preview.", async () => {
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/delete_text"]'
    );
    await Photo_Editor_Text.Delete_Text();
  });

  it("Validate font selection applies correctly", async () => {
    await Common_function.clickElementByXPath(
      // Add text using + button
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//android.widget.EditText[@resource-id="com.myzesty:id/add_text_edit_text"]'
    );
    await driver.keys("Image Editor 2");
    await Photo_Editor_Text.Apply_Text();
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/fonts_list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 2,
      repeatsPerScroll: 1, // how many swipe repeats per scroll call
      swipeDuration: 800,
      maxScrolls: 1,
      timeoutBetweenClicks: 1000,
      lastIndex: 12,
    });
    await browser.pause(1000);
  });

  it("Verify arrow opens detailed font screen with multiple categories.", async () => {
    await Common_function.clickElementByXPath(
      // --> This arrow open the font Categories
      '//android.widget.ImageView[@resource-id="com.myzesty:id/more"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/header_title"]'
    );
    await Photo_Editor_Text.Open_All_Fonts();
    // await Photo_Editor_Text.Close_Fonts_Menu();
    await browser.pause(700);
  });

  it("Verify the fonts can be successfully downloaded and  applied correctly", async () => {
    await Common_function.clickElementByXPath(
      // Select font style from  Display category
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[1]'
    );
    await browser.pause(1000);
  });

  it("Validate font color change and changes reflect on the Preview.", async () => {
    await Photo_Editor_Text.Click_Font_Color();
    await Slider.Slider(28, 936, 2140, 2189, 0.4);
    await browser.pause(700);
  });

  it("Verify opacity change and changes reflect in the preview.", async () => {
    await Photo_Editor_Text.Click_Font_Opacity();
    await Slider.Slider(28, 936, 2140, 2189, 0.8);
    await browser.pause(1000);
  });

  it("Verify shadow slider default and text shadow change and changes reflect on the preview.", async () => {
    await Photo_Editor_Text.Click_Font_Shadow();
    await Slider.Slider(28, 936, 2140, 2189, 0.5);
    await browser.pause(800);
  });

  it("Verify stroke thickness adjustment and validate that changes reflect on the preview", async () => {
    await Photo_Editor_Text.Click_Font_Stroke();
    await Slider.Slider(14, 914, 1978, 2088, 0.5); // Thickness Slider
    await browser.pause(800);
  });

  it("Verify stroke color adjustment and validate that changes reflect on the preview.", async () => {
    await Slider.Slider(28, 936, 2140, 2189, 0.6); // Color Slider
    await browser.pause(800);
  });

  it("Verify media is saved in gallery with all the applied changes.", async () => {
    await Photo_Editor_Text.Apply_Changes();
    await browser.pause(500);
    await Photo_Editor_Text.Apply_Changes();
    await Photo_Editor_Text.Handle_Post_Screen();
  });
});
