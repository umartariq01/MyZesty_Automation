import Stickers from "../pageobjects/Sticker.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";
import slidersPage from "../pageobjects/sliders.page.js";

describe("Sticker Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Sticker Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Sticker Feature Test Suite finished =====");
  });

  it("Apply sticker on a single image and verify it appears correctly in the preview", async () => {
    await Stickers.Open_VideoEditor();
    await Stickers.Click_Album();
    await Stickers.Click_Automation_Album();
    await Stickers.Click_Img_Tab();
    await Stickers.Select_Media_1();
    await Stickers.Click_Done_Btn();
    await browser.pause(3000);
    await Stickers.Add_Sticker();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
    await Stickers.Select_Christmas_Category();
    await browser.pause(1000);
    await Stickers.selectStickerIfNotDownloaded(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_image"])[2]'
    );
    await browser.pause(2000);
    await Stickers.Select_Sticker1();
    await Stickers.Apply_Changes();
  });

  it("Apply sticker on multiple images and verify it displays correctly in the preview", async () => {
    await Stickers.Toolbar_Back();
    await browser.pause(700);
    await Stickers.Click_Advance_Add();
    await Stickers.Click_Album();
    await Stickers.Click_Automation_Album();
    await Stickers.Click_Img_Tab();
    await Common_function.selectImages(4);
    await Stickers.Click_Done_Btn();
    await browser.pause(6000);
    await Stickers.Click_Edit_Sticker();
    await Stickers.VE_Add_More_Sticker();
    await Stickers.Select_Christmas_Category();
    await browser.pause(1000);
    await Stickers.selectStickerIfNotDownloaded(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_image"])[3]'
    );
    // await Stickers.Select_Sticker2();
    await Stickers.Apply_Changes();
    await browser.pause(1000);
    // await Sliders.scrollScreen(300, 1622, 800, 1622);
  });

  it("Drag the sticker seek bar across all media and verify the sticker is applied to all media.", async () => {
    await Sliders.Extender(
      driver,
      '(//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"])[2]/android.view.View[3]',
      500
    );
  });

  it("Zoom in/zoom out the sticker in the preview and verify the behavior.", async () => {
    await Stickers.Zoom_In();
    await browser.pause(1000);
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Mute All"]',
      111,
      1622,
      1030,
      1622
    );
    // await Sliders.zoomout(951, 811, 192, 811, 833, 811, 328, 811)
  });

  it("Select the sticker seek bar, click Edit, and verify the Opacity and Scale adjustments work correctly.", async () => {
    await Sliders.scrollScreen(125, 1622, 490, 1622);
    await browser.pause(1000);
    await Stickers.Edit_Applied_Sticker();
    await Stickers.Edit_Applied_Sticker();
    await Sliders.Slider(driver, 300, 948, 1809, 1919, 0.8); // Opacity
    await Sliders.Slider(driver, 300, 948, 1960, 2070, 0.9); // Scale
    await Stickers.Apply_Changes();
  });

  it("Select the sticker seek bar, apply animations [Intro, Outro, Loop], and verify the changes in the preview.", async () => {
    await Stickers.Click_Animation();
    await Stickers.Apply_Into_Animation();
    await Stickers.Apply_Outro_Animation();
    await Stickers.Apply_Loop_Animation();
    await Stickers.Apply_Animations();
  });

  it("Apply sticker animation and verify the sticker duration is correct.", async () => {
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Mute All"]',
      48,
      1622,
      990,
      1622
    );
    await Sliders.play_pause(531, 1412);
    await browser.pause(7000);
    await Sliders.play_pause(531, 1412);
  });

  it("Verify the sticker duplicate functionality works as expected.", async () => {
    await Sliders.scrollScreen(81, 1622, 750, 1622);
    await Sliders.tapScreen(634, 1758);
    await Sliders.scrollScreen(553, 1622, 41, 1622, 2000);
    await Stickers.Duplicate_Sticker();
    await browser.pause(1000);
  });

  it("Verify the sticker delete functionality works as expected.", async () => {
    await Sliders.scrollScreen(936, 2311, 346, 2311);
    await Stickers.Delete_Sticker();
  });

  it("Verify the draft flow when a sticker and animation are applied to media.", async () => {
    await Stickers.Toolbar_Back();
    await Stickers.Click_Close_Project();
    await browser.pause(1000);
    await Stickers.Open_Draft_Proj();
    await browser.pause(3000);
    await Stickers.Click_Edit_Sticker();
    await browser.pause(1000);
  });

  it("Apply animation to the sticker and verify the Remove button for animation works correctly.", async () => {
    await Sliders.scrollScreen(744, 1622, 510, 1622, 2000);
    await Sliders.tapScreen(726, 1850);
    await Stickers.Click_Animation();
    await Stickers.Remove_Animations();
    await browser.pause(500);
    await Stickers.Apply_Changes();
    await browser.pause(700);
    await Sliders.scrollScreen(41, 1622, 860, 1622);
    await Sliders.play_pause(531, 1412);
    await browser.pause(5000);
    await Sliders.play_pause(531, 1412);
  });

  it("Verify the export flow when a sticker and animation are applied to media.", async () => {
    await Stickers.Toolbar_Back();
    await Stickers.Export_Media();
    await browser.pause(5000);
    await Stickers.Export_Done_Btn();
  });
});
