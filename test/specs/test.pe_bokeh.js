import Photo_Editor_Locators from "../pageobjects/PE_Locators.page.js";
import PE_Bokeh from "../pageobjects/PE_Bokeh.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import Slider from "../pageobjects/Slider.page.js";
import { $, browser, driver, expect } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import Logger from "../pageobjects/Logs.page.js";

describe("Photo Editor Bokeh Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Photo Editor Bokeh Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
    await Logger.start("[COLLECT]");
  });

  after(async () => {
    console.log("===== Photo Editor Bokeh Feature Test Suite finished =====");
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify that Default Bokeh is applied when open the Bokeh templet.", async () => {
    await Photo_Editor_Locators.Open_PhotoEditor();
    await Photo_Editor_Locators.Click_Album();
    await Photo_Editor_Locators.Click_Automation_Album();
    await Photo_Editor_Locators.Select_Media_1(5);
    await PE_Bokeh.Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Bokeh"]'
    );
    await PE_Bokeh.Click_Bokeh_Tab();
    await browser.pause(1000);
  });

  it("Verify that Bokeh Template variations are applied", async () => {
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/filter_list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 1,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 5,
      timeoutBetweenClicks: 1000,
      lastIndex: 26,
    });
    await browser.pause(1000);
  });

  it("Validate Intensity Bar responsiveness across all Bokeh templates", async () => {
    await Slider.Slider(72, 962, 2068, 2178, 0.7);
    await browser.pause(1000);
  });

  it("Validate Border – Thickness adjustment", async () => {
    await PE_Bokeh.Click_Bokeh_Border();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.SeekBar[@resource-id="com.myzesty:id/thickness_bar"]'
    );
    await Slider.Slider(7, 962, 1820, 1930, 0.5);
  });

  it("Verify Feather and Color controls after increasing thickness", async () => {
    await Slider.Slider(7, 962, 1989, 2099, 0.6);
    await browser.pause(600);
    await Slider.Slider(3, 923, 2151, 2200, 0.4);
    await browser.pause(1000);
  });

  it("Validate Eraser tool visibility and parameter defaults", async () => {
    await PE_Bokeh.Click_Eraser();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/size_title"]'
    );
    const eraseSize = $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/size"]'
    );
    const actual_Erase_Size = await eraseSize.getText();
    await SoftAssert.assertEqual(
      actual_Erase_Size,
      "20",
      "Eraser size mismatched, should be 20 by default"
    );

    const featherSize = $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/feather" and @text="20"]'
    );
    const actual_Feather_Size = await featherSize.getText();
    await SoftAssert.assertEqual(
      actual_Feather_Size,
      "20",
      "Feather size mismatched, should be 20 by default"
    );

    const opacityValue = $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/opacity"]'
    );
    const actual_Opacity_Value = await opacityValue.getText();
    await SoftAssert.assertEqual(
      actual_Opacity_Value,
      "100",
      "Opacity value mismatched, should be 100% by default"
    );
    await PE_Bokeh.Click_Enable_Erase();
    await Slider.Drag_Drop_Xpath_with_Distance(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/photo_container"]/android.widget.LinearLayout',
      400,
      0
    );
    await Slider.Drag_Drop_Xpath_with_Distance(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/photo_container"]/android.widget.LinearLayout',
      -400,
      0
    );
    await Slider.Drag_Drop_Xpath_with_Distance(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/photo_container"]/android.widget.LinearLayout',
      400,
      200
    );
    await Slider.Drag_Drop_Xpath_with_Distance(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/photo_container"]/android.widget.LinearLayout',
      400,
      -200
    );
  });

  it("Verify Eraser settings and verify masking behavior", async () => {
    await Slider.Slider(7, 962, 1730, 1840, 0.4);
    await browser.pause(800);
    await Slider.Slider(7, 962, 1899, 2009, 0.4);
    await browser.pause(800);
    await Slider.Slider(7, 962, 2109, 2219, 0.8);
    await browser.pause(1000);
  });

  it("Validate Undo/Redo functionality for Eraser", async () => {
    await PE_Bokeh.Click_Undo_Changes();
    await browser.pause(1000);
    await PE_Bokeh.Click_Redo_Changes();
    await browser.pause(1000);
  });

  it("Verify View Original toggle functionality on Bokeh screen", async () => {
    await Slider.CompareButton(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/compare"]'
    );
  });

  it("Verify Done applies all Bokeh edits", async () => {
    await PE_Bokeh.Apply_Changes();
  });

  it("Verify Save Functionality of Bokeh", async () => {
    await PE_Bokeh.Click_Done();
    await browser.pause(500);
    await PE_Bokeh.Click_Done();
  });
});
