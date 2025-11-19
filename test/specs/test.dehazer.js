import Dehazer from "../pageobjects/Dehazer.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import { browser } from "@wdio/globals";

describe("Dehaze Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Dehazer Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Dehazer Feature Test Suite finished =====");
  });

  it("From the landing screen, apply Dehazer on an image and verify the effect is visible in the preview.", async () => {
    await Slider.scrollScreen(960, 2000, 92, 2000, 1000, 2);
    await Dehazer.Open_dehazer();
    await Dehazer.Click_Album();
    await Dehazer.Click_Automation_Album();
    await Dehazer.select_img_tab();
    await Dehazer.Select_Media_1();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/compare"]'
    ); // Wait untill Compare button
  });

  it("Apply Dehazer on an image, adjust Intensity to low and high, and verify the preview updates correctly.", async () => {
    await Slider.Slider(driver, 7, 962, 2111, 2221, 0.9);
    await browser.pause(1000);
  });

  it("Apply Dehazer on an image, adjust Intensity, then use the Default Intensity button and verify it reverts to the original state", async () => {
    await Dehazer.Intensity_Reset_Btn();
    await browser.pause(500);
  });

  it("Switch between Dehazer 1, Dehazer 2, and Dehazer 3, and verify each change is reflected in the preview", async () => {
    await Dehazer.Click_Dehaze2();
    await browser.pause(1000);
    await Dehazer.Click_Dehaze3();
    await browser.pause(500);
  });

  it("Click the Expand button and verify whether the Dehazer effect is hidden or not.", async () => {
    await Dehazer.Minimize_Dehaze();
    await Common_function.waitForElementToDisappear(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
  });

  it("Apply the dehazer on the image and click on “compare” button to see the changes reflected or not ", async () => {
    await Dehazer.Compare_Image();
    await browser.pause(1000);
  });

  it.only("Apply Dehazer on an image, Save the media, and verify the save file retains the effect or not.", async () => {
    await Dehazer.Apply_Dehaze();
    await Dehazer.Apply_Dehaze(); // To save image in Gallery
    await Dehazer.Verify_export("Your media is saved to your phone gallery");
    await Dehazer.Click_export_done();
    await browser.pause(500);
  });

  // ========================= Dehaze Inside Full Editor Test Cases =========================

  it("Apply Dehazer on an image and verify the effect is visible in the preview. :", async () => {
    await Dehazer.Open_VideoEditor();
    await Dehazer.Click_Album();
    await Dehazer.Click_Automation_Album();
    await Dehazer.Click_Img_Tab();
    await Dehazer.Select_Media_1();
    await Dehazer.Click_Done_Btn();
    await Dehazer.waitForElementVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
    await Dehazer.Vid_Ediotr_Dehazer();
    await Dehazer.Vid_Ediotr_Dehazer1();
    await Dehazer.Click_apply_dehazer();
    await browser.pause(1000);
  });

  it("Apply Dehazer on an image, save it to Drafts, reopen, and verify the effect remains applied in the preview :", async () => {
    await Dehazer.Click_Close_Project();
    await browser.pause(500);
    await Dehazer.Open_Draft_Proj();
    await Dehazer.Vid_Ediotr_Dehazer();
  });

  it("Switch between Dehazer 1, Dehazer 2, and Dehazer 3, and verify each change reflects in the preview", async () => {
    await Dehazer.Vid_Ediotr_Dehazer2();
    await browser.pause(500);
    await Dehazer.Vid_Ediotr_Dehazer3();
    await browser.pause(700);
  });

  it("Adjust the Correction and Intensity bars forward and backward and verify the preview updates accordingly.", async () => {
    await Slider.Slider(driver, 255, 914, 2099, 2149, 1); // Correction Bar
    await browser.pause(1000);
    await Slider.Slider(driver, 233, 931, 2215, 2275, 0.8); // Intensity Bar
    await Dehazer.Click_apply_dehazer();
    await browser.pause(1000);
  });

  it("Remove the Dehazer effect and verify it is no longer applied.", async () => {
    await Dehazer.Vid_Ediotr_Dehazer();
    await Dehazer.Vid_Editor_Remove_Dehazer();
    await Dehazer.Click_apply_dehazer();
    await browser.pause(1000);
    await Dehazer.Vid_Ediotr_Dehazer();
    await browser.pause(2000);
    await Dehazer.Click_apply_dehazer();
  });

  it("Add video and Verify Video Imported Successfully", async () => {
    await Dehazer.Click_Advance_Add();
    await Dehazer.Click_Album();
    await Dehazer.Click_Automation_Album();
    await Dehazer.select_video_tab();
    await Dehazer.Select_Video();
    await Dehazer.Click_Done_Btn();
    await browser.pause(3000);
    await Dehazer.waitForElementVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
  });

  it("Apply Dehazer on a video and verify the effect appears correctly in the preview.", async () => {
    await Dehazer.Vid_Ediotr_Dehazer();
    await Dehazer.Vid_Ediotr_Dehazer1();
    await Dehazer.Click_apply_dehazer();
    await Slider.play_pause(534, 1408);
    await browser.pause(5000);
    await Slider.play_pause(534, 1408);
  });

  it("Apply Dehazer on media, export the media, and verify the exported file retains the effect", async () => {
    await Dehazer.checkUploadedMedia(); // Export based on Imported Media
    await browser.pause(50000);
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.Button[@resource-id="com.myzesty:id/btn_done"]',
      40000
    );
    await Dehazer.Click_export_done();
  });
});
