import Text from "../pageobjects/Text.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";
import { text } from "stream/consumers";

describe("Text Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Text Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Text Feature Test Suite finished =====");
  });

  it("Verify that the text is visible on the selected image or video.", async () => {
    await Text.Open_VideoEditor();
    await Text.Click_Album();
    await Text.Click_Automation_Album();
    await Text.Click_Img_Tab();
    await Text.Select_Media_1();
    await Text.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
    await Text.Click_Add_Text();
    await Text.VE_Add_Text();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.EditText[@resource-id="com.myzesty:id/edit_text_area"]'
    );
    await Text.Enter_Text();
    await Text.Click_Apply_Changes();
    await browser.pause(1500);
  });

  it("Verify that font styles can be applied correctly to the text.", async () => {
    await Text.Apply_Font_Style();
  });

  it("Verify that text color changes are applied properly.", async () => {
    await Text.Click_Color_Tab();
    await Slider.Slider(36, 989, 1823, 1916, 0.6); // Color Slider
    await Slider.Slider(196, 955, 1916, 2026, 0.8); // Opacity Slider
    await browser.pause(700);
  });

  it("Verify that bold and italic styles can be applied to the text.", async () => {
    await Text.Click_Style_Tab();
    await Text.Click_Bold();
    await Text.Click_Italic();
    await browser.pause(700);
  });

  it("Verify that stroke can be applied to the text and displays correctly.", async () => {
    await Text.Click_Stroke_Tab();
    await Slider.Slider(133, 955, 1823, 1933, 0.5);
    await Slider.Slider(36, 989, 2019, 2112, 0.4);
    await browser.pause(700);
  });

  it("Verify that the label (or tag) appears properly on the text.", async () => {
    await Text.Click_Label_Tab();
    await Text.Select_Label();
    await Slider.Slider(36, 989, 1988, 2081, 0.4);
    await Text.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Verify that the Reset button works correctly and reverts all text changes.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Label"]',
      918,
      2315,
      170,
      2315
    );
    await Text.Click_VE_Label_Tab();
    await Text.Reset_Changes_Btn();
    await Text.Click_Apply_Changes();
    await browser.pause(500);
  });

  it("Verify the maximum text length allowed on media and ensure it doesn’t overflow or cut off.", async () => {
    await Text.Toolbar_Back();
    await Text.Click_Advance_Add();
    await Text.Click_Album();
    await Text.Click_Automation_Album();
    await Text.Click_Img_Tab();
    await Common_function.selectImages(4);
    await Text.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Text.Click_Edit_Text();
    await Slider.tapScreen(435, 1762);
    await Slider.Extender(
      driver,
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View[3]',
      500
    );
    await browser.pause(500);
  });

  it("Verify that the applied text settings (font, color, style) are saved and restored correctly when opened from Drafts.", async () => {
    await Text.Toolbar_Back();
    await Text.Click_Close_Project();
    await browser.pause(700);
    await Text.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Slider.play_pause(534, 1412);
    await browser.pause(4000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify that the text and its applied styles are retained correctly in the exported output.", async () => {
    await Text.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.Button[@resource-id="com.myzesty:id/btn_done"]'
    );
    await Text.Export_Done_Btn();
  });
});
