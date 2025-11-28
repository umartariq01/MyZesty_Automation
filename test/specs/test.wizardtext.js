import WizardText from "../pageobjects/Wizardtext.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";
import commonfunPage from "../pageobjects/commonfun.page.js";
import SoftAssert from "../pageobjects/SoftAssert.page.js";

describe("Wizard Text Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Wizard Text Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Wizard Text Feature Test Suite finished =====");
    await SoftAssert.assertAll();
  });

  it("Verify that user can access the Text editor from Wizard Editor and the keyboard appears for typing.", async () => {
    await Slider.Bidirection_scrollScreen_FindElement(
      '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup',
      '//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup'
    );
    await WizardText.Open_WizardEditor();
    await WizardText.Click_Album();
    await WizardText.Click_Automation_Album();
    await WizardText.Click_Img_Tab();
    await Common_function.selectImages(3);
    await WizardText.Click_Video_Tab();
    await WizardText.Select_Media_1();
    await WizardText.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await WizardText.Click_Text_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.EditText[@resource-id="com.myzesty:id/edit_text_area"]'
    );
    await Common_function.clickElementByXPath(
      // Click on text area to bring up keyboard
      '//android.widget.EditText[@resource-id="com.myzesty:id/edit_text_area"]'
    );
    await browser.keys("Script Running");
    await WizardText.Apply_Changes();
  });

  it("Verify that the help/instruction icon displays duration guidance popup.", async () => {
    await Common_function.clickElementByXPath(
      // Open Guide icon
      '//android.widget.ImageView[@resource-id="com.myzesty:id/showGuide"]'
    );
    await browser.pause(1000);
    await Slider.tapScreen(527, 512);
  });

  it("Verify that user can change the font and new fonts download when selected.", async () => {
    await Common_function.waitForElementToBeVisible(
      // Wait for Font Tab to load
      '//android.widget.TextView[@text="Font"]'
    );
    await Common_function.clickElementByXPath(
      // Select Font style
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
    await browser.pause(1000);
  });

  it("Verify that user can change the text fill color using the color slider.", async () => {
    await WizardText.Click_Color_Tab();
    await Slider.Slider(36, 989, 1823, 1916, 0.4);
    await browser.pause(1000);
    await Slider.Slider(196, 955, 1916, 2026, 0.8);
    await browser.pause(1000);
  });

  it("Verify that user can apply bold and italic text styles.", async () => {
    await WizardText.Click_Style_Tab();
    await Common_function.clickElementByXPath(
      // Bold text
      '//android.widget.ImageView[@resource-id="com.myzesty:id/bold"]'
    );
    await Common_function.clickElementByXPath(
      // Italic text
      '//android.widget.ImageView[@resource-id="com.myzesty:id/italic"]'
    );
  });

  it("Verify that shadow intensity slider adds and adjusts text shadow.", async () => {
    await Slider.Slider(199, 955, 1988, 2098, 0.6);
    await browser.pause(1000);
  });

  it("Verify that user can adjust text stroke thickness and color.", async () => {
    await WizardText.Click_Stroke_Tab();
    await Slider.Slider(133, 955, 1823, 1933, 0.5);
    await browser.pause(700);
    await Slider.Slider(38, 989, 2019, 2112, 0.3);
    await browser.pause(700);
  });

  it("Verify that label backgrounds can be applied behind text using Label A and Label B options.", async () => {
    await WizardText.Click_Label_Tab();
    await Common_function.clickElementByXPath(
      // Select Label
      '//android.widget.ImageView[@resource-id="com.myzesty:id/background"]'
    );
  });

  it("Verify that user can adjust label color and background radius.", async () => {
    await Slider.Slider(36, 989, 1988, 2018, 0.4);
    await browser.pause(700);
    await Slider.Slider(175, 955, 2081, 2191, 0.5);
    await browser.pause(400);
    await WizardText.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that tapping the close (X) icon discards entered text.", async () => {
    await WizardText.Click_Text_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.EditText[@resource-id="com.myzesty:id/edit_text_area"]'
    );
    await browser.keys("Test Script");
    // Discard the entered text
    await WizardText.Click_Close_Project();
    await browser.pause(1000);
  });

  it("Verify that tapping the cross icon on text removes it from media.", async () => {
    await WizardText.Click_Text_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.EditText[@resource-id="com.myzesty:id/edit_text_area"]'
    );
    await browser.keys("Check text removal");
    await WizardText.Apply_Changes();
    await browser.pause(1000);
    await WizardText.Apply_Changes();
    // Select the Text
    await Common_function.clickElementByXPath(
      '(//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"])[2]'
    );
    // Remove text (Cross button on text)
    await Common_function.clickElementByXPath(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/delete_icon"]'
    );
    await browser.pause(1000);
  });

  it("Verify that text can be applied to entire duration or to current media only using the circle icon.", async () => {
    // Select the Text
    await Common_function.clickElementByXPath(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]'
    );
    await WizardText.Apply_Text_Duration();
    const toastMessage = await WizardText.duration_toast.getText();
    await SoftAssert.assertEqual(
      toastMessage,
      "Text applied to the entire duration.",
      "Duration toast message did not match"
    );
    await browser.pause(1000);
    await WizardText.Apply_Text_Duration();
    const toastMessage2 = await WizardText.duration_toast.getText();
    await SoftAssert.assertEqual(
      toastMessage2,
      "Text applied to the current media.",
      "Duration toast message did not match"
    );
    await browser.pause(1000);
    await WizardText.Apply_Changes();
  });

  it("Verify that text can be applied to multiple media when “apply to entire duration” is active.", async () => {
    // Select the Text
    await Common_function.clickElementByXPath(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]'
    );
    await WizardText.Apply_Text_Duration(); // Apply to entire duration
    await WizardText.Apply_Changes();
    await browser.pause(1000);
    await Slider.play_pause_xpath(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await browser.pause(5000);
    await Slider.play_pause(534, 1412);
    await browser.pause(500);
  });

  it("Verify that text can be applied to only one media when circle icon is toggled to single mode.", async () => {
    // Select the Media
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[2]'
    );
    // Select the Text
    await Common_function.clickElementByXPath(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]'
    );
    await WizardText.Apply_Text_Duration(); // Apply to current media only
    await WizardText.Apply_Changes();
    await browser.pause(1000);
    // Select 3rd Media
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[3]'
    );
    async function Validate_text_On_Media() {
      const isVisible = await Common_function.waitForElementToDisappear(
        // Verify that text is not present on 3rd media
        '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]'
      );
      if (!isVisible) {
        console.log("Text is not present on next media as expected.");
      } else {
        throw new Error("Text is present on next media, test failed.");
      }
    }
    await Validate_text_On_Media();
    await browser.pause(1000);
  });

  it("Verify that text can be repositioned and zoomed within media.", async () => {
    // Select the Media
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[2]'
    );
    await Slider.Drag_Drop_Xpath(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]',
      550,
      400
    );
    await browser.pause("1000");
    await WizardText.text_path.zoom({ duration: 500, scale: 0.3 });
    await browser.pause(600);
    await WizardText.Apply_Changes();
  });

  it("Verify that added text remains on media after saving and reopening the project.", async () => {
    await WizardText.Click_Close_Project();
    await browser.pause(1000);
    await WizardText.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    // Select the Media
    await Common_function.clickElementByXPath(
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[2]'
    );
    await browser.pause(600);
    async function Validate_text_On_Media() {
      const selector =
        '//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"]';
      const isVisible = await $(selector).isDisplayed();
      if (isVisible) {
        console.log("Text is present on media as expected.");
      } else {
        throw new Error("Text is not present on media, test failed.");
      }
    }
    await Validate_text_On_Media();
  });

  it("Verify that changes are retianed in same order after perfoming Undo Redo operation", async () => {
    await commonfunPage.Undo_changes();
    await browser.pause(1000);
    await commonfunPage.Redo_changes();
    await browser.pause(1000);
  });
  it("Verify that export media coatains all the applied changes.", async () => {
    await WizardText.Export_Media();
    // await Common_function.waitForElementToBeVisible(
    //   '//android.view.ViewGroup[@content-desc="Done"]'
    // );
    // await WizardText.Export_Done_Btn();
  });
});
