import Export from "../pageobjects/Export.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";

describe("Export Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Export Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Export Feature Test Suite finished =====");
    await SoftAssert.assertAll();
  });

  it("Verify that the export screen shows 720p, 30fps, and medium quality by default.", async () => {
    await Export.Open_VideoEditor();
    await Export.Click_Album();
    await Export.Click_Automation_Album();
    await Export.Click_Video_Tab();
    await Export.Select_Media_1();
    await Export.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Export.Open_Export_Panel();
    await browser.pause(700);
    await Export.Apply_Export_Setting();
  });

  it("Verify that user can view and select resolution levels from 480p to 4K.", async () => {
    await Export.Open_Export_Panel();
    await browser.pause(500);
    await Slider.Slider(driver, 54, 1037, 1382, 1437, 1);
    await browser.pause(500);
  });

  let exportSizetext;

  it("Verify that user can change frame rates smoothly via slider.", async () => {
    await Slider.Slider(driver, 54, 1037, 1720, 1775, 0.7);
    await browser.pause(500);
    exportSizetext = await Export.export_size.getText();
    console.log("Captured Export Size:", exportSizetext);
  });

  let newExportSize;
  it("Verify that user can select export quality from low to high.", async () => {
    await Slider.Slider(driver, 54, 1037, 2058, 2113, 1);
    await browser.pause(500);
    newExportSize = await Export.export_size.getText();
    console.log("Old Export size: ", exportSizetext);
    console.log("New Exported size: ", newExportSize);
  });

  it("Verify that the file size estimation changes dynamically when sliders are adjusted.", async () => {
    await browser.pause(500);
    await Export.Apply_Export_Setting();
    await SoftAssert.assertNotEqual(
      exportSizetext,
      newExportSize,
      "File size did not change dynamically!"
    );
  });

  it("Verify that users can monitor and cancel export progress.", async () => {
    await Export.Export_Media();
    await browser.pause(1000);
    await Slider.tapScreen(538, 2270); //  Cancel Export
    await Export.Confirm_cancel_Export();
    // await Export.Cancel_Export();
    await browser.pause(500);
  });

  it("Verify that a successful export triggers media save and share options.", async () => {
    await Export.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@text="Instagram"]'
    );
    const actual_text = await Export.share_screen.getText();
    await SoftAssert.assertEqual(
      actual_text,
      "Instagram",
      "Share screen Not visible!"
    );
  });

  it("Verify that user can navigate back to the main screen from the export completion screen.", async () => {
    await Export.Main_screen_Navigate();
  });
});
