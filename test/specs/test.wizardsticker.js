import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import WizardSticker from "../pageobjects/WizardSticker.page.js";

describe("Wizard Sticker Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Wizard Sticker Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Wizard Sticker Feature Test Suite finished =====");
    await SoftAssert.assertAll();
  });

  it("Verify that the user can successfully open the sticker editor from the right pane menu.", async () => {
    await Slider.scrollUntilElementIsVisible(
      '//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup',
      756,
      1536,
      290,
      1536
    );
    await WizardSticker.Open_WizardEditor();
    await WizardSticker.Click_Album();
    await WizardSticker.Click_Automation_Album();
    await WizardSticker.Click_Img_Tab();
    await Common_function.selectImages(4);
    await WizardSticker.Click_Done_Btn();
    await WizardSticker.Verify_Wizard_PopUp();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await WizardSticker.Click_Sticker_Tab();
    const actual_Text = await WizardSticker.sticker_panel.getText();
    await SoftAssert.assertEqual(
      actual_Text,
      "Sticker",
      "Stickers panel did not open!"
    );
    await browser.pause(1000);
  });

  it("Verify that tapping the exclamation mark icon shows instructions for using stickers.", async () => {
    await WizardSticker.Click_Sticker_Guide();
    await browser.pause(1000);
    await Slider.tapScreen(500, 700);
    await browser.pause(1000);
  });

  it("Verify that all sticker categories (Watercolors, GIFHY, Christmas, Business, etc.) are visible in the sticker editor.", async () => {
    const containerXpath =
      '//android.widget.HorizontalScrollView[@resource-id="com.myzesty:id/tabs_layout"]';
    await WizardSticker.validateCategoriesDeviceAgnostic(
      containerXpath,
      [
        "Love",
        "Christmas",
        "Business",
        "Halloween",
        "Vacation",
        "Text",
        "People",
        "Emoji",
        "Trending",
        "Neon",
        "Reactions",
        "Smileys",
        "Sports",
        "Hot",
        "Others",
        "Watercolors",
        "Animals",
      ],
      { click: true, maxSwipes: 10, pauseMs: 200 }
    );
    await browser.pause(1500);
  });

  it("Verify that the user can select and apply a sticker from any category to the selected media.", async () => {
    await WizardSticker.Select_Sticker(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await WizardSticker.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that tapping the close (X) icon closes the sticker editor and removes any unsaved sticker.", async () => {
    await WizardSticker.Click_Sticker_Tab();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await WizardSticker.Select_Sticker(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await WizardSticker.Click_Close_Project(); // Close sticker editor panel
    await browser.pause(1000);
  });

  it("Verify that user can search for stickers using the search icon in sticker editor.", async () => {
    await WizardSticker.Click_Sticker_Tab();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await WizardSticker.Search_Sticker();
    await Common_function.clickElementByXPath(
      '//android.widget.EditText[@resource-id="com.myzesty:id/search_sticker_et"]'
    );
    await browser.keys("love");
    await WizardSticker.Apply_Search_Sticker();
    await browser.pause(3000);
    await Common_function.waitForElementToBeVisible(
      // Verify that stickers are visible
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
  });

  it("Verify that tapping a popular keyword in the sticker search automatically searches for related stickers.", async () => {
    await WizardSticker.Go_Back(); // Go to sticker main search panel
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/tag_name" and @text="expression"]'
    );
    await Common_function.clickElementByXPath(
      // Select 1st category from the given list
      '//android.widget.TextView[@resource-id="com.myzesty:id/tag_name" and @text="expression"]'
    );
    await browser.pause(3000);
    await Common_function.waitForElementToBeVisible(
      // verify that sticker are visible
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
  });

  it("Verify that recent searches can be cleared using the Clear button.", async () => {
    await WizardSticker.Go_Back();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/tag_name" and @text="expression"] | //android.widget.ListView[@resource-id="com.myzesty:id/search_result_list"]/android.widget.RelativeLayout[1]'
    );
    await Common_function.clickElementByXPath(
      //  Clear the recent search history
      '//android.widget.TextView[@resource-id="com.myzesty:id/clear_recent"]'
    );
    await browser.pause(1000);
  });

  it("Verify that user can switch tabs between Stickers and GIFHY and perform searches in both.", async () => {
    await Common_function.clickElementByXPath(
      //  Move to GIPHY tan in Search bar
      '//android.widget.HorizontalScrollView[@resource-id="com.myzesty:id/tabs_layout"]/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.LinearLayout/android.widget.ImageView'
    );
    await Common_function.clickElementByXPath(
      // Select 1st category from the given list
      '//android.widget.TextView[@resource-id="com.myzesty:id/tag_name" and @text="expression"] | //android.widget.ListView[@resource-id="com.myzesty:id/search_result_list"]/android.widget.RelativeLayout[1]'
    );
    await browser.pause(3000);
    await Common_function.waitForElementToBeVisible(
      // verify that sticker are visible
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await browser.pause(1000);
  });

  it("Verify that tapping duration icon toggles sticker duration between full video and current media.", async () => {
    await WizardSticker.Go_Back();
    await browser.pause(500);
    await WizardSticker.Go_Back();
    await browser.pause(1000);
    await Common_function.clickElementByXPath(
      //   Select Applied sticker
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]'
    );
    await WizardSticker.Aplly_Sticker_Duration();
    const actual_Text_1 = await WizardSticker.duration_toast.getText();
    await SoftAssert.assertEqual(
      actual_Text_1,
      "Sticker applied to the entire duration.",
      "Sticker failed to apply on full duration"
    );
    await browser.pause(3000);
    await WizardSticker.Aplly_Sticker_Duration();
    const actual_Text_2 = await WizardSticker.duration_toast.getText();
    await SoftAssert.assertEqual(
      actual_Text_2,
      "Sticker applied to the current media.",
      "Duration failed to apply on selected media."
    );
    await browser.pause(1000);
  });

  it("Verify that user can resize a sticker using pinch zoom gestures.", async () => {
    await WizardSticker.applied_sticker.zoom({ duration: 500, scale: 0.7 }); // Zoom to Increase Size
    await browser.pause(1000);
    await WizardSticker.applied_sticker.pinch({ duration: 500, scale: 0.5 }); // Pinch to decrease in size
    await browser.pause(1000);
  });

  it("Verify that tapping the cross icon on a sticker removes it from the media.", async () => {
    await WizardSticker.Delete_Sticker();
    await WizardSticker.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that multiple stickers can be added to the same media.", async () => {
    await WizardSticker.Click_Sticker_Tab();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    // Add 1st Sticker
    await WizardSticker.Select_Sticker(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await WizardSticker.Apply_Changes();
    await browser.pause(1000);
    // Add 2nd Sticker
    await WizardSticker.Click_Sticker_Tab();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
    await WizardSticker.Select_Sticker(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
    await WizardSticker.Apply_Changes();
    await browser.pause(1000);
    // Add 3rd Sticker
    await WizardSticker.Click_Sticker_Tab();
    await Common_function.clickElementByXPath(
      // Click on Christmas category
      '//android.widget.TextView[@text="Christmas"]'
    );
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_image"])[2]'
    );
    await WizardSticker.Select_Sticker(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_image"])[2]'
    );
    await WizardSticker.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that a sticker can be applied to only a specific media file when multiple are present.", async () => {
    await WizardSticker.Click_Sticker_Tab();
    await Common_function.clickElementByXPath(
      //   Select the sticker
      '(//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"])[3]'
    );
    await WizardSticker.Aplly_Sticker_Duration();
    await WizardSticker.Apply_Changes();
    await browser.pause(1000);
    // Select 2nd nedia
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[2]'
    );
    await Common_function.clickElementByXPath(
      //   Select the sticker
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"] | (//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"])[3]'
    );
    await WizardSticker.Aplly_Sticker_Duration();
    await WizardSticker.Apply_Changes();
    await browser.pause(500);
    await Slider.Slider(18, 1062, 1477, 1527, 0.2);
    await Slider.play_pause_xpath(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await browser.pause(5000);
  });

  it("Verify that sticker applied to a specific media remains intact when switching between other media.", async () => {
    await Common_function.clickElementByXPath(
      // Select first media
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[2]'
    );
    await Common_function.waitForElementEnabled(
      // Verify of sticker is present and enabled
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]'
    );
    await Common_function.clickElementByXPath(
      // Select 3rd media to check if sticker is available or not
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[3]'
    );
    await Common_function.clickElementByXPath(
      // Select first media
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[2]'
    );
    await browser.pause(1000);
  });

  it("Verify that Saving project in draft retains the applied changes", async () => {
    await WizardSticker.Click_Close_Project();
    await browser.pause(700);
    await WizardSticker.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
  });

  it("Verify that performing Undo Redo retains the changes in same order.", async () => {
    await Common_function.Undo_changes();
    await browser.pause(1000);
    await Common_function.Redo_changes();
    await browser.pause(1000);
  });

  it("Verify that export media contains all the applied changes.", async () => {
    await WizardSticker.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.view.ViewGroup[@content-desc="Done"]'
    );
    // await WizardSticker.Export_Done_Btn();
  });
});
