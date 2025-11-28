import Overlay from "../pageobjects/Overlay.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";
import assert from "assert";

describe("Overlay Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Overlay Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Overlay Feature Test Suite finished =====");
  });

  it("Apply an overlay on an image and verify that it appears correctly in the Preview.", async () => {
    await Overlay.Open_VideoEditor();
    await Overlay.Click_Album();
    await Overlay.Click_Automation_Album();
    await Overlay.Click_Img_Tab();
    await Overlay.Select_Media_1();
    await Overlay.Click_Done_Btn();
    await browser.pause(3000);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Overlay"]',
      980,
      2322,
      130,
      2322
    );
    await Overlay.Click_Overlay_Tab();
    // await Overlay.Click_Add_Overlay();
    await Overlay.Click_Album();
    await Overlay.Click_Automation_Album();
    await Overlay.Click_Img_Tab();
    await Overlay.Select_Media_2();
    await browser.pause(3000);
  });

  it("Verify that the overlay can be resized and the changes are accurately reflected in the preview.", async () => {
    await Overlay.Pinch();
    await Slider.Drag_Drop(480, 737, 265, 416);
  });

  it("Check that the overlay sub-bar can be extended and applied to other media clips.", async () => {
    await Overlay.Toolbar_Back();
    await Overlay.Click_Advance_Add();
    await Overlay.Click_Album();
    await Overlay.Click_Automation_Album();
    await Overlay.Click_Img_Tab();
    await Common_function.selectImages(4);
    await Overlay.Click_Done_Btn();
    await browser.pause(4000);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Overlay"]',
      980,
      2322,
      130,
      2322
    );
    await Overlay.Click_Overlay_Tab();
    await Overlay.addPixelsToElementXAndClick(
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View',
      50
    );
    await Slider.Extender(
      driver,
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View[3]',
      400
    );
    await browser.pause(900);
  });

  let SavedOpacityValue;
  it("Verify the functionality of the opacity feature and ensure the changes reflect correctly", async () => {
    await Slider.scrollScreen(317, 1622, 641, 1622);
    await Overlay.Click_Overlay_Opacity();
    await Slider.Slider(41, 929, 1680, 1790, 0.8);
    SavedOpacityValue = await Overlay.Get_Opacity_Text();
    await Overlay.Click_Apply_Changes();
  });

  it("Save the project as a Draft, reopen it, and confirm that the overlay opacity remains consistent. ", async () => {
    await Overlay.Toolbar_Back();
    await Overlay.Click_Close_Project();
    await browser.pause(600);
    await Overlay.Open_Draft_Proj();
    await browser.pause(4000);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Overlay"]',
      980,
      2322,
      130,
      2322
    );
    await Overlay.Click_Overlay_Tab();
    await Overlay.addPixelsToElementXAndClick(
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View',
      50
    );
    await Overlay.Click_Overlay_Opacity();
    const NewOpacityValue = await Overlay.Get_Opacity_Text();
    assert.strictEqual(
      NewOpacityValue,
      SavedOpacityValue,
      "Opacity value do not Match!",
      console.log("Opacity value is same.")
    );
    await Overlay.Click_Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that the overlay can be deleted and is removed from the preview and timeline.", async () => {
    await Slider.scrollScreen(960, 2315, 490, 2315);
    await Overlay.Click_Delete_Overlay();
  });

  it("Apply an overlay on a video and ensure it displays properly.", async () => {
    await Overlay.Toolbar_Back();
    await Overlay.Click_Advance_Add();
    await Overlay.Click_Album();
    await Overlay.Click_Automation_Album();
    await Overlay.Click_Video_Tab();
    await Overlay.Select_Vidoe_1();
    await Overlay.Click_Done_Btn();
    await browser.pause(4000);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Overlay"]',
      980,
      2322,
      130,
      2322
    );
    await Overlay.Click_Overlay_Tab();
    // await Overlay.Click_Add_Overlay();
    await Overlay.Click_Album();
    await Overlay.Click_Automation_Album();
    await Overlay.Click_Video_Tab();
    await Overlay.Select_Overlay_Video();
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
    await browser.pause(1000);
  });

  it("Trim the overlay video using trim handles and verify correct behavior in the preview.", async () => {
    await Slider.Extender(
      driver,
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View',
      200
    );
    // await Slider.scrollScreen(744, 1622, 630, 1622, 1500);
    // await browser.pause(100);
    // await Slider.Extender(
    //   driver,
    //   '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View[2]',
    //   -100
    // );
    await browser.pause(700);
  });

  it("Save the project in Draft, reopen it, and confirm that the overlay settings are retained.", async () => {
    await Overlay.Toolbar_Back();
    await Overlay.Click_Close_Project();
    await browser.pause(500);
    await Overlay.Open_Draft_Proj();
    await browser.pause(4500);
    await Slider.scrollScreen(900, 1622, 41, 1622, 1000, 1);
    await Slider.play_pause(534, 1412);
    await browser.pause(4000);
    await Slider.play_pause(534, 1412);
  });

  it("Export the media and verify that the overlay is correctly applied in the exported output.", async () => {
    await Overlay.Export_Media();
    await browser.pause(20000);
    await Common_function.waitForElementToBeVisible(
      '//android.view.ViewGroup[@content-desc="Done"]'
    );
    await Overlay.Export_Done_Btn();
  });
});
