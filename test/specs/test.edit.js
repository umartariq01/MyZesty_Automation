import Edit from "../pageobjects/Edit.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";

describe("Edit Feature Test Suite", () => {
  // General function to perform split multiple times
  before(async () => {
    console.log("===== Running pre-checks before Edit Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Edit Feature Test Suite finished =====");
  });

  it("Verify that on clicking Edit, a single media item is not deleted and the correct toast message is displayed.", async () => {
    await Edit.Open_VideoEditor();
    await Edit.Click_Album();
    await Edit.Click_Automation_Album();
    await Edit.Click_Img_Tab();
    await Edit.Select_Media_1();
    await Edit.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Edit.Click_Edit_Tab();
    await Edit.Click_Delete_Media();
    await Edit.Assert_Dlt_Text();
  });

  it("Verify that on clicking Edit, adding two media items allows successful deletion of selected media.", async () => {
    await Edit.Toolbar_Back();
    await Edit.Click_Advance_Add();
    await Edit.Click_Album();
    await Edit.Click_Automation_Album();
    await Edit.Click_Img_Tab();
    await Common_function.selectImages(4);
    await Edit.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Edit.Click_Edit_Tab();
    await Edit.Click_Delete_Media();
    await browser.pause(600);
  });

  it("Verify that on clicking Edit, increasing the media duration updates it to the maximum limit and reflects accurately on the timeline.", async () => {
    await Edit.Click_Edit_Tab();
    await Edit.Click_Media_Duration();
    await Slider.Slider(41, 929, 1680, 1790, 0.2);
    await Edit.Click_Apply_Changes();
    await browser.pause(700);
  });

  it("Verify that on clicking Edit, decreasing the media duration updates it to the minimum limit and reflects accurately on the timeline.", async () => {
    await Edit.Click_Media_Duration();
    await Slider.Slider(41, 929, 1680, 1790, 0);
    await Edit.Click_Apply_Changes();
    await browser.pause(700);
  });

  it("Verify that on clicking Edit, the background of the image can be changed successfully.", async () => {
    await Edit.Apply_BG();
    await Edit.Apply_BG_by_index(1);
    await Edit.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, the background of the image can be changed and scaled properly using the slider.", async () => {
    await Edit.Apply_BG();
    await Edit.Apply_BG_by_index(3);
    await Slider.Slider(158, 929, 1873, 1923, 0.4);
    await Edit.Click_Apply_All();
    await Edit.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, the background can be changed using media selected from the gallery.", async () => {
    await Slider.scrollScreen(247, 1861, 660, 1861);
    await Edit.Apply_BG();
    await Edit.Click_Gallery_BG();
    await Edit.Click_Album();
    await Edit.Click_Automation_Album();
    await Edit.Select_Media_1(2);
    await Edit.Click_Apply_All();
    await Edit.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, the None button works properly and removes any applied background.", async () => {
    await Edit.Apply_BG();
    await Edit.Click_Remove_BG();
    await Edit.Click_Apply_Changes();
  });

  it("Verify that on clicking Edit, applying Horizontal Flip reflects correctly in the media preview.", async () => {
    await Edit.Apply_H_Flip();
    await browser.pause(1000);
  });

  it("Verify that on clicking Edit, applying Vertical Flip reflects correctly in the media preview.", async () => {
    await Edit.Apply_V_Flip();
    await browser.pause(1000);
  });

  it("Verify that on clicking Edit, applying Rotate 90° reflects accurately in the media preview.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Rotate"]',
      914,
      2315,
      236,
      2315
    );
    await Edit.Click_Rotate(); // Rotate 90°
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, applying Rotate 180° reflects accurately in the media preview.", async () => {
    await Edit.Click_Rotate(); // Rotate 180°
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, applying Rotate 270° reflects accurately in the media preview.", async () => {
    await Edit.Click_Rotate(); // Rotate 270°
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, applying Rotate 360° reflects accurately in the media preview.", async () => {
    await Edit.Click_Rotate(); // Rotate 360°
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, applying Full Media displays the media properly in full frame.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Fill"]',
      914,
      2315,
      236,
      2315
    );
    await Slider.scrollScreen(932, 1622, 180, 1622);
    await Edit.Apply_Fill();
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, applying Fit Media adjusts the media properly within the frame.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Fit"]',
      914,
      2315,
      236,
      2315
    );
    await Edit.Apply_Fit();
    await browser.pause(500);
  });

  it("Verify that on clicking Edit, the Duplicate Media option works correctly.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Duplicate"]',
      914,
      2315,
      236,
      2315
    );
    await Edit.Click_Duplicate();
    await Edit.Assert_Duplicate_Toast();
  });

  it("Apply Horizontal Flip and Rotate on a media item, close the project, reopen it from Drafts, and verify that the changes persist in the preview.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Flip H"]',
      170,
      2315,
      880,
      2315
    );
    await Edit.Apply_H_Flip();
    await Edit.Toolbar_Back();
    await Edit.Click_Close_Project();
    await browser.pause(700);
    await Edit.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Apply Horizontal Flip and Rotate on a media item, export it, and verify that the changes are reflected in the exported output.", async () => {
    await Slider.scrollScreen(710, 1636, 440, 1636, 1500);
    await Edit.Click_Edit_Tab();
    await Edit.Apply_H_Flip();
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Rotate"]',
      914,
      2315,
      236,
      2315
    );
    await Edit.Click_Rotate();
    await Edit.Toolbar_Back();
    await Edit.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.view.ViewGroup[@content-desc="Done"]'
    );
    await Edit.Export_Done_Btn();
  });

  // <--------------------------- Video Test Cases ------------------------->

  it("Verify the left trim handler adjusts the video start point correctly.", async () => {
    await Edit.Open_VideoEditor();
    await Edit.Click_Album();
    await Edit.Click_Automation_Album();
    await Edit.Click_Video_Tab();
    await Edit.Select_Media_1(2);
    await Edit.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Edit.Click_Edit_Tab();
    await Edit.Trim_Media();
    await Slider.Drag_Drop(driver, 77, 1806, 214, 1806);
    await browser.pause(500);
  });

  it("Verify the right trim handler adjusts the video endpoint correctly.", async () => {
    await Slider.Drag_Drop(driver, 1006, 1806, 896, 1806);
    await Edit.Click_Apply_Changes();
  });

  it("Verify the video split feature works properly at the selected timestamp.", async () => {
    await Slider.scrollScreen(900, 1622, 710, 1622, 1500);
    await Edit.Split_Media();
    await browser.pause(700);
  });

  it("Verify the video cannot be split if the remaining duration is less than 2 seconds.", async () => {
    await Slider.play_pause(534, 1412);
    await browser.pause(1000);
    await Slider.play_pause(534, 1412);
    await Edit.Split_Media();
    await Edit.Assert_Split_Duration_Toast();
    await browser.pause(700);
  });

  it("Verify multiple splits can be performed smoothly on videos longer than 1 hour.", async () => {
    await Edit.Toolbar_Back();
    await Edit.Click_Advance_Add();
    await Edit.Click_Album();
    await Edit.Click_Automation_Album();
    await Edit.Click_Video_Tab();
    await Edit.Select_Media_1(3);
    await Edit.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Edit.Click_Edit_Tab();
    // Define scroll positions for each split (add more if needed)
    const scrollPositions = [
      [538, 1784, 360, 1784],
      [538, 1784, 300, 1784],
      [538, 1784, 200, 1784],
      [940, 1784, 270, 1784],
    ];
    await Edit.splitMultipleTimes(5, scrollPositions);
    await browser.pause(600);
  });

  it("Verify lowering the volume decreases audio level during playback.", async () => {
    await Edit.Click_Volume();
    await Slider.Slider(124, 929, 1687, 1797, 0.2);
    await Edit.Click_Apply_Changes();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify increasing the volume amplifies audio without distortion.", async () => {
    await Edit.Click_Volume();
    await Slider.Slider(124, 929, 1687, 1797, 0.8);
    await Edit.Click_Apply_Changes();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify setting the volume to 0 mutes the video audio completely.", async () => {
    await Edit.Click_Volume();
    await Slider.Slider(124, 929, 1687, 1797, 0);
    await Edit.Click_Apply_Changes();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
    await browser.pause(500);
  });

  it("Verify the delete video option removes the selected video successfully.", async () => {
    await Edit.Click_Delete_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
  });

  it("Verify adding two videos and deleting one does not remove the other.", async () => {
    await Edit.Click_Advance_Add();
    await Edit.Click_Album();
    await Edit.Click_Automation_Album();
    await Edit.Click_Video_Tab();
    await Edit.Select_Media_1();
    await Edit.Select_Media_1(2);
    await Edit.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Edit.Click_Edit_Tab();
    await Edit.Click_Delete_Media();
    await browser.pause(600);
  });

  it("Verify applying playback speeds (2x, 5x, 10x, 20x) updates the preview accordingly.", async () => {
    await Edit.Click_Edit_Tab();
    await Edit.Select_Media_Speed();
    await browser.pause(500);
    await Slider.tapScreen(627, 1920);
    await Edit.Click_Apply_Changes();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify curve speed presets apply correctly and affect video playback smoothly.", async () => {
    await Edit.Select_Media_Speed();
    await Edit.Apply_Curve_Speed();
    await Edit.Select_Graph_1();
    await Edit.Click_Apply_Changes();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify the reset speed button restores default playback speed.", async () => {
    await Edit.Select_Media_Speed();
    await Edit.Apply_Curve_Speed();
    await Edit.Reset_Speed();
    await Edit.Click_Apply_Changes();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify the reverse function plays the video backward smoothly without issues.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Reverse"]',
      958,
      2315,
      225,
      2315
    );
    await Edit.Reverse_Media();
    await Common_function.waitForElementToDisappearCustom(
      '//android.widget.TextView[@resource-id="com.myzesty:id/dialog_title"]',
      30000
    );
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify Export and the changes are reflected in the exported output. ", async () => {
    await Edit.Toolbar_Back();
    await Edit.Export_Media();
    await browser.pause(20000);
    await Common_function.waitForElementToDisappearCustom(
      '//android.view.ViewGroup[@content-desc="Done"]',
      60000
    );
    await Edit.Export_Done_Btn();
  });
});
