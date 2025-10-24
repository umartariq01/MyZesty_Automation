import Sort from "../pageobjects/Sort.page.js";
import Slider from '../pageobjects/Slider.page.js'
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";

describe("Sort Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Sort Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Sort Feature Test Suite finished =====");
  });

  it("Verify that there should be no sort option in the bottom menu when user only select one media", async () => {
    await Sort.Open_VideoEditor();
    await Sort.Click_Album();
    await Sort.Click_Automation_Album();
    await Sort.Click_Img_Tab();
    await Sort.Select_Img_1();
    await Sort.Click_Done_Btn();
    await browser.pause(2000);
    await Sort.Verify_Sort_Single_Media();
  });

  it("Verify that the user can press and hold a media item and successfully drag it to a new position in the same list.", async () => {
    await Sort.Click_Advance_Add();
    await Sort.Click_Album();
    await Sort.Click_Automation_Album();
    await Sort.Click_Img_Tab();
    await Common_function.selectImages(7);
    await Sort.Click_Done_Btn();
    await browser.pause(5000);
    await Slider.Drag_Drop(driver, 428, 1630, 1000, 1630);
  });

  it("Verify that after rearranging media items, the new order is correctly saved and reflected in the timeline.", async () => {
    await Slider.play_pause(534, 1412);
    await browser.pause(4000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify that multiple media items can be reordered one after another without breaking the sequence", async () => {
    await Slider.Drag_Drop(driver, 428, 1630, 1000, 1630);
    await browser.pause(1000);
    await Slider.Drag_Drop(driver, 220, 1630, 848, 1630);
    await browser.pause(1000);
    await Slider.Drag_Drop(driver, 428, 1630, 1000, 1630);
    await browser.pause(1000);
  });

  it("Verify that the media playback or preview follows the new inline sorting order.", async () => {
    await Slider.play_pause(538, 1412);
    await browser.pause(4000);
    await Slider.play_pause(538, 1412);
  });

  it("Verify that the app maintains the sorted order after closing and reopening the project.", async () => {
    await Sort.Click_Close_Project();
    await browser.pause(1000);
    await Sort.Click_Open_Draft();
    await browser.pause(4000);
    // await Slider.play_pause(538, 1412);
    // await browser.pause(3000);
    // await Slider.play_pause(538, 1412);
  });

  it("Verify Undo Redo functionlity respective to Sorting", async () => {
    await Common_function.Undo_changes();
    await browser.pause(1000);
    await Common_function.Redo_changes();
  });

  // ========================= Sort using the Sort Tab =========================

  it("Verify that tapping on the “Sorting” option navigates the user to the dedicated sorting screen successfully.", async () => {
    await Sort.Click_Sort_Tab();
    await browser.pause(500);
  });

  it("Verify that the user can drag and drop items in the sorting screen to rearrange their order.", async () => {
    // await Sort.sortImages(); // Sorting imagges function
    await Slider.Drag_Drop(driver, 125, 360, 516, 531);
    await browser.pause(500);
    await Slider.Drag_Drop(driver, 111, 527, 914, 361);
    await browser.pause(500);
    await Slider.Drag_Drop(driver, 321, 350, 321, 542);
    await browser.pause(500);
  });

  it("Verify that changes made in the separate sorting screen are correctly applied to the timeline after saving/closing.", async () => {
    await Sort.Click_Apply_Changes();
    await Slider.play_pause(538, 1412);
    await browser.pause(4000);
    await Slider.play_pause(538, 1412);
  });

  it("Verify export is working fine", async () => {
    await browser.pause(1000);
    await Sort.exportVideo();
    await browser.pause(7000);
    await Sort.Export_Done_Btn();
  });
});
