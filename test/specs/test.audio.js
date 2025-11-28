import Audio from "../pageobjects/Audio.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";
import assert from "assert";

describe("Audio Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Audio Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Audio Feature Test Suite finished =====");
  });

  it("Verify that the user can successfully add audio to a video from any available source.", async () => {
    await Audio.Open_VideoEditor();
    await Audio.Click_Album();
    await Audio.Click_Automation_Album();
    await Audio.Click_Video_Tab();
    await Audio.Select_Media_1(2);
    await Audio.Click_Done_Btn();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await Audio.Click_Mute_Unmute();
    await Audio.Click_Add_Audio();
    await Audio.Click_VE_Add_Audio();
    await Slider.Music_tab_Click();
  });

  it("Verify that the user can record custom audio and apply it to the video.", async () => {
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Record"]'
    );
    await Audio.Click_Record();
    await Audio.Click_Start_Stop_Record();
    await browser.pause(5000);
    await Slider.play_pause(553, 2244);
    await Audio.Click_Apply_Audio();
  });

  it("Verify that the user can extract and apply audio from a video file.", async () => {
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Extract"]'
    );
    await Audio.Extract_Audio();
    await Audio.Click_Album();
    await Audio.Click_Automation_Album();
    await Audio.Select_Media_1(2);
    await browser.pause(600);
  });

  it("Verify that the user can expand or reduce the seek bar to adjust audio duration on the video timeline.", async () => {
    await Slider.dragSliderHandle(
      '(//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"])[3]/android.view.View[2]',
      600
    );
    await browser.pause(600);
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
    await browser.pause(600);
  });

  it("Verify that fade-in and fade-out effects can be applied to the audio.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Volume"]',
      890,
      2311,
      340,
      2311
    );
    await Audio.Click_Volume_Tab();
    await Slider.Slider(124, 929, 1687, 1797, 0);
    await Audio.Click_Apply_Audio();
    await browser.pause(300);
    await Slider.tapScreen_Xpath(
      '(//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"])[1]'
    );
    // await Slider.tapScreen(630, 1762);
    await Audio.Click_Fade_Tab();
    await Slider.Slider(276, 944, 1880, 1990, 0.5); // Fade In
    await Slider.Slider(276, 944, 1990, 2100, 0.4); // Fade Out
    await Audio.Click_Apply_Audio();
    await Slider.scrollScreen(240, 1622, 700, 1622);
    await Slider.play_pause(534, 1412);
    await browser.pause(5000);
    await Slider.play_pause(534, 1412);
    await browser.pause(600);
  });

  it("Verify that the user can increase or decrease the volume up to 200%.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Volume"]',
      890,
      2311,
      340,
      2311
    );
    await Audio.Click_Volume_Tab();
    await Slider.Slider(124, 929, 1687, 1797, 1);
    await Audio.Click_Apply_Audio();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
    await Audio.Click_Volume_Tab();
    await Slider.Slider(124, 929, 1687, 1797, 0.3);
    await Audio.Click_Apply_Audio();
    await Slider.play_pause(534, 1412);
    await browser.pause(3000);
    await Slider.play_pause(534, 1412);
    await browser.pause(400);
  });

  it("Verify that the user can replace the existing audio with a new one.", async () => {
    await Slider.scrollScreen(80, 1622, 950, 1622);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Replace"]',
      900,
      2315,
      200,
      2315
    );
    await Audio.Replace_Audio();
    await Slider.Music_tab_Click();
  });

  it("Verify that the user can trim the audio clip to adjust its duration.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Trim"]',
      900,
      2323,
      200,
      2323
    );
    await browser.pause(500);
    await Audio.Click_Trim_Tab();
    await Slider.dragSliderHandle(
      '(//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"])[4]/android.view.View[2]',
      150
    );
    // await Slider.Drag_Drop(driver, 140, 1850, 320, 1850);
    await browser.pause(500);
    await Audio.Click_Apply_Audio();
    await browser.pause(500);
  });

  it("Verify that the user can delete an applied audio track from the video.", async () => {
    // await Slider.tapScreen(943, 1931);
    await Slider.tapScreen_Xpath(
      '(//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"])[3]'
    );
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Delete"]',
      925,
      2322,
      200,
      2322
    );
    await Audio.Delete_Audio();
    await browser.pause(500);
  });

  it("Verify that the user can mute or unmute a audio track on the video.", async () => {
    await Audio.Click_Mute_Unmute();
    await Slider.play_pause(534, 1412);
    await browser.pause(5000);
    await Slider.play_pause(534, 1412);
    await browser.pause(400);
  });
  it("Verify that the user can remove background noise using the denoise feature.", async () => {
    await Slider.Bidirection_scrollScreen(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Extract"]',
      990,
      2322,
      200,
      2322
    );
    await Audio.Extract_Audio();
    await Audio.Click_Album();
    await Audio.Click_Automation_Album();
    await Audio.Select_Media_1(3);
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="DeNoise"]',
      990,
      2315,
      200,
      2315
    );
    await Audio.Click_Denoise_Tab();
    await Audio.Click_Denoise_Now();
    await Audio.waitAndClickOrFallback(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      '//android.widget.ImageView[@resource-id="com.myzesty:id/img_close"]'
    );
    await browser.pause(600);
    await Audio.Click_Mute_Unmute();
    await browser.pause(100);
    await Slider.play_pause(534, 1412);
    await browser.pause(5000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify the Export", async () => {
    await Audio.Toolbar_Back();
    await Audio.Export_Media();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.view.ViewGroup[@content-desc="Done"]',
      30000
    );
    await Audio.Export_Done_Btn();
  });
});
