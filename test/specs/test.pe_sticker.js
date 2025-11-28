import Photo_Editor_Locators from "../pageobjects/PE_Locators.page.js";
import Photo_Editor_Sticker from "../pageobjects/PE_Sticker.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import Slider from "../pageobjects/Slider.page.js";
import { $, browser, driver, expect } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import Logger from "../pageobjects/Logs.page.js";

describe("Photo Editor Sticker Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Photo Editor Sticker Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
    await Logger.start("[COLLECT]");
  });

  after(async () => {
    console.log("===== Photo Editor Sticker Feature Test Suite finished =====");
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify tapping on “Sticker” opens sticker selection screen", async () => {
    await Photo_Editor_Locators.Select_Media_From_Phone(5);
    await browser.pause(2000);
    await Photo_Editor_Sticker.expandMenu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Sticker"]'
    );
    await Photo_Editor_Sticker.Click_Sticker_Tab();
  });

  it("Validate presence of all sticker categories and stickers in these categories.", async () => {
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.FrameLayout[@resource-id="com.myzesty:id/frameLayout"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/categoryRV"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 4,
      restartIndexAfterScroll: 5,
      repeatsPerScroll: 1,
      swipeDuration: 500,
      maxScrolls: 1,
      timeoutBetweenClicks: 1000,
      lastIndex: 5,
    });
    await browser.pause(1000);
  });

  it("Verify search functionality in sticker selection and verify stickers searched successfully", async () => {
    await Photo_Editor_Sticker.Click_Sticker_Search_Bar();
    await Photo_Editor_Sticker.Search_Sticker();
    await Common_function.waitForElementToDisappear(
      '//android.view.View[@resource-id="com.myzesty:id/list_progress"]',
      30000
    );
  });

  it("Verify Back Arrow returns to main Photo Editor", async () => {
    await Photo_Editor_Sticker.Click_Sticker_Back_Button();
    await browser.pause(1000);
  });

  it("Verify Recently Used/History toggle button displays previous stickers", async () => {
    await Photo_Editor_Sticker.Click_Recent_Used_Sticker();
    await browser.pause(1000);
    await Photo_Editor_Sticker.Check_Recent_Sticker_List();
  });

  it("Verify tapping a sticker adds it to canvas", async () => {
    await Photo_Editor_Sticker.Click_Sticker_Category_Tab();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[1]'
    );
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[1]'
    );
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/delete_sticker"]',
      30000
    );
  });

  it("Validate sticker opacity adjustment", async () => {
    await Slider.Slider(14, 914, 1917, 2000, 0.8); // Opacity Slider
  });

  it("Validate sticker Size adjustment", async () => {
    await Slider.Slider(14, 914, 2083, 2166, 0.5); // Size Slider
  });

  it("Verify Add (+) button opens add sticker screen", async () => {
    await Photo_Editor_Sticker.Click_Add_More_Sticker();
    await Common_function.waitForElementToBeVisibleCustom(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[1]',
      30000
    );
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[2]'
    );
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/delete_sticker"]',
      30000
    );
  });

  it("Verify Delete removes selected sticker", async () => {
    await Photo_Editor_Sticker.Click_Delete_Sticker();
    await browser.pause(700);
  });

  it("Verify sticker resizing via two-finger gesture and validate sticker size changes on preview.", async () => {
    await Common_function.clickElementByXPath(
      // Select Applied sticker
      '//android.widget.ImageView[@resource-id="com.myzesty:id/sticker"]'
    );
    const sticker = await $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/sticker"]'
    );
    await sticker.zoom({ duration: 800, scale: 0.7 });
    await browser.pause(1000);
    await sticker.pinch({ duration: 800, scale: 0.5 });
    await browser.pause(1000);
  });

  it("Verify sticker movement and rotation on canvas", async () => {
    await Common_function.clickElementByXPath(
      // Select Applied sticker
      '//android.widget.ImageView[@resource-id="com.myzesty:id/sticker"]'
    );
    await Slider.Drag_Drop_Xpath_with_Distance(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/sticker"]',
      200,
      -500,
      1000
    );
  });

  it("Verify Done button finalizes stickers and sticker id applied to medai.", async () => {
    await Photo_Editor_Sticker.Click_Apply_Changes();
    await browser.pause(500);
    await Photo_Editor_Sticker.Click_Apply_Changes();
    await Common_function.waitForElementToBeVisible(
      '//android.view.View[@content-desc="Post"]'
    );
    await Photo_Editor_Sticker.Handle_Post_Screen();
  });
});
