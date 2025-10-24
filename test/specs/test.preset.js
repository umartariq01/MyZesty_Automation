import Presets from "../pageobjects/Presets.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";

describe("Preset Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Preset Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Preset Feature Test Suite finished =====");
  });

  it("Verify that a single media file can successfully have a preset applied.", async () => {
    await Presets.Open_VideoEditor();
    await Presets.Click_Album();
    await Presets.Click_Automation_Album();
    await Presets.Click_Img_Tab();
    await Presets.Select_Media_1();
    await Presets.Click_Done_Btn();
    await browser.pause(2000);
    await Presets.Apply_Preset();
    await Presets.Apply_Preset1();
    await Presets.Apply_Changes();
  });

  it("Verify that multiple images can have presets applied simultaneously and are reflected correctly.", async () => {
    await Presets.Toolbar_Back();
    await Presets.Click_Advance_Add();
    await Presets.Click_Album();
    await Presets.Click_Automation_Album();
    await Presets.Click_Img_Tab();
    await Common_function.selectImages(3);
    await Presets.Click_Done_Btn();
    await browser.pause(4000);
    await Presets.Apply_Preset();
    await Presets.Add_Preset();
    await Presets.Apply_Preset2();
    await Presets.Apply_Changes();
    await Sliders.scrollScreen(759, 1633, 542, 1633);
    await Presets.Add_Preset();
    await Presets.Apply_Preset3();
  });

  it("Verify that the Intensity bar for a preset works correctly by adjusting the strength of the preset.", async () => {
    await Sliders.Slider(driver, 223, 941, 2273, 2383, 0.5);
    await browser.pause(1000);
  });

  it("Verify that clicking the Remove Preset button removes the applied preset from the media.", async () => {
    await Presets.Remove_Presets();
    await Presets.Apply_Changes();
  });

  it("Verify that applying a preset and saving it to a draft retains the preset when reopening the draft", async () => {
    await Presets.Toolbar_Back();
    await Presets.Click_Close_Project();
    await Presets.Open_Draft_Proj();
    await browser.pause(3000);
    await Sliders.play_pause(534, 1412);
    await browser.pause(3000);
    await Sliders.play_pause(534, 1412);
  });

  it("Verify that the Duplicate option creates a copy of the selected preset successfully. ", async () => {
    await Presets.Apply_Preset();
    await Sliders.scrollScreen(110, 1622, 950, 1622);
    await browser.pause(1000);
    await browser.tap({ x: 641, y: 1769 });
    await Sliders.scrollScreen(966, 1622, 400, 1622);
    await Presets.Duplicate_Preset();
    await browser.pause(500);
  });

  it("Verify that the Edit option allows modifying a preset and saving changes correctly.", async () => {
    await Sliders.scrollScreen(110, 1622, 950, 1622);
    await Presets.Edit_Preset();
    await Presets.Apply_Preset4();
    await Presets.Apply_Changes();
  });

  it("Verify that the Delete option removes the selected preset successfully.", async () => {
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Mute All"]',
      90,
      1622,
      960,
      1622
    );
    await browser.tap({ x: 641, y: 1769 });
    await Presets.Delete_Preset();
  });

  it("Verify that the Add button allows creating and saving a new preset successfully.", async () => {
    await Presets.Add_Preset();
    await Presets.Apply_Preset2();
    await Presets.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify the export with preset effect and validate applied successfully", async () => {
    await Presets.Toolbar_Back();
    await browser.pause(500);
    await Presets.Export_Media();
    await browser.pause(5000);
    await Presets.Export_Done_Btn();
  });
});
