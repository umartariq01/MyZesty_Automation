import Chroma from "../pageobjects/Chroma.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";

describe("Chroma Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Chroma Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Chroma Feature Test Suite finished =====");
  });

  it("After adding media, verify the toast message appears as expected.", async () => {
    await Chroma.Open_VideoEditor();
    await Chroma.Click_Album();
    await Chroma.Click_Automation_Album();
    await Chroma.Click_Img_Tab();
    await Chroma.Select_Media_1();
    await Chroma.Click_Done_Btn();
    await browser.pause(4000);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Chroma"]',
      1025,
      2322,
      100,
      2322
    );
    await Chroma.Click_Chroma_Tab();
    await Chroma.Verify_Welcome_Tost();
    await browser.pause(500);
  });

  it("Open the Chroma tool and verify the “i” icon (guide/helper) opens correctly.", async () => {
    await Chroma.Click_Chroma_Guide();
    await Chroma.Verify_Help_Text();
    await Slider.tapScreen(520, 217);
    await browser.pause(600);
  });

  it("Apply Chroma effect on an image and verify it applies correctly.", async () => {
    await Chroma.Select_Color_Key();
    await Common_function.waitForElementToDisappear(
      '(//android.view.View[@resource-id="com.myzesty:id/progress"])'
    );
    // await browser.pause(1000);
    await Chroma.Select_BG_Img();
    await Slider.Slider(220, 931, 2074, 2184, 0.7);
    await Chroma.Click_Apply_Changes();
  });

  it("Apply Chroma effect on a video and verify it applies properly.", async () => {
    await Chroma.Click_Advance_Add();
    await Chroma.Click_Album();
    await Chroma.Click_Automation_Album();
    await Chroma.Click_Video_Tab();
    await Chroma.Select_Media_1();
    await Chroma.Click_Done_Btn();
    await browser.pause(4000);
    await Slider.scrollScreen(750, 1622, 505, 1622);
    await browser.pause(600);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Chroma"]',
      1025,
      2322,
      100,
      2322
    );
    await Chroma.Click_Chroma_Tab();
    await Chroma.Select_Color_Key();
    await Common_function.waitForElementToDisappear(
      '(//android.view.View[@resource-id="com.myzesty:id/progress"])'
    );
    await Chroma.Select_BG_Img();
    await Slider.Slider(220, 931, 2074, 2184, 0.6);
    await Chroma.Click_Apply_Changes();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify that the Remove Chroma Effect button works as expected.", async () => {
    await Slider.scrollScreen(80, 1622, 950, 1622, 1000, 2);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Chroma"]',
      1025,
      2322,
      100,
      2322
    );
    await Chroma.Click_Chroma_Tab();
    await Chroma.Click_Reset_Chroma();
    await Chroma.Click_Apply_Changes();
  });

  it("Select a gallery background and check it applies correctly to the media.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Chroma"]',
      1025,
      2322,
      100,
      2322
    );
    await Chroma.Click_Chroma_Tab();
    await Chroma.Select_Color_Key();
    await Chroma.Select_Gallery_BG();
    await Chroma.Click_Album();
    await Chroma.Click_Automation_Album();
    await Chroma.Select_Media_2();
    await browser.pause(1000);
    await Slider.Slider(220, 931, 2074, 2184, 0.7);
    await Chroma.Click_Apply_Changes();
  });

  it("Pick a custom color using the picker tool and confirm it works as expected.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Chroma"]',
      1025,
      2322,
      100,
      2322
    );
    await Chroma.Click_Chroma_Tab();
    await Chroma.Click_Reset_Chroma();
    await Chroma.Select_Color_Picker();
    await Slider.Drag_Drop(538, 800, 860, 461);
    // await Chroma.Select_Color_Key();
    await Common_function.waitForElementToDisappear(
      '(//android.view.View[@resource-id="com.myzesty:id/progress"])'
    );
    await Chroma.Select_BG_Img();
    await Slider.Slider(220, 931, 2074, 2184, 0.1);
    await Chroma.Click_Apply_Changes();
  });

  it("Apply the chroma effect and save the project in Draft, then reopen it to verify the effect is retained.", async () => {
    await Chroma.Click_Close_Project();
    await browser.pause(600);
    await Chroma.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/export"]'
    );
    await Slider.play_pause(534, 1412);
    await browser.pause(5000);
    await Slider.play_pause(534, 1412);
  });
  it("Export the media and verify that the chroma effect is correctly visible in the final output.", async () => {
    await Chroma.Export_Media();
    await browser.pause(15000);
    await Common_function.waitForElementToDisappearCustom(
      '//android.view.ViewGroup[@content-desc="Done"]',
      30000
    );
    await Chroma.Export_Done_Btn();
  });
});
