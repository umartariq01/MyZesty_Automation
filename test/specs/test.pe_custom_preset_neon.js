import PE_Custom_Preset_Neon_Dehazer_Color from "../pageobjects/PE_Custom_Preset_Neon.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { $, browser, expect } from "@wdio/globals";
import commonfunPage from "../pageobjects/commonfun.page.js";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import Logger from "../pageobjects/Logs.page.js";


describe("Phot Editor Preser, Custom, Neon, Dehazer, Color Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Photo Editor Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
    await Logger.start("[COLLECT]");
  });

  after(async () => {
    console.log("===== Photo Editor Feature Test Suite finished =====");
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify applying a preset from Trends category and check that effect is reflected on the preview", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Open_PhotoEditor();
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Album();
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Automation_Album();
    await PE_Custom_Preset_Neon_Dehazer_Color.Select_Media_1(5);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Presets"]'
    );
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Preset();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/trends_text"]'
    );
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/filter_list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 1,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 5,
      timeoutBetweenClicks: 500,
      lastIndex: 25,
    });
  });

  it("Verify intensity adjustment for Trends presets", async () => {
    await Slider.Slider(21, 957, 2085, 2205, 0.6);
    await browser.pause(1000);
  });

  it("Verify applying a preset from color category", async () => {
    await Common_function.clickElementByXPath(
      // Select Color Category
      '//android.widget.TextView[@resource-id="com.myzesty:id/color_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/presetName" and @text="Tree"]'
    );
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/filter_list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 1,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 10,
      timeoutBetweenClicks: 500,
      lastIndex: 26,
    });
  });

  it("Verify applying a preset from Artistic category", async () => {
    await Common_function.clickElementByXPath(
      //  Select Artistic Category
      '//android.widget.TextView[@resource-id="com.myzesty:id/artistic_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/filter_list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 1,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 10,
      timeoutBetweenClicks: 500,
      lastIndex: 13,
    });
  });

  it("Verify applying a preset from Gradient category", async () => {
    await Common_function.clickElementByXPath(
      // Select Gradient Category
      '//android.widget.TextView[@resource-id="com.myzesty:id/gradient_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/filter_list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 1,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 10,
      timeoutBetweenClicks: 500,
      lastIndex: 24,
    });
  });

  it("Verify applying a preset from Unique category", async () => {
    await Common_function.clickElementByXPath(
      // Select Unique Category
      '//android.widget.TextView[@resource-id="com.myzesty:id/unique_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[1]'
    );
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/filter_list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 1,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 10,
      timeoutBetweenClicks: 500,
      lastIndex: 15,
    });
    await browser.pause(800);
  });

  it("Verify eraser UI and default values", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Erase();
    const eraseSizeText =
      await PE_Custom_Preset_Neon_Dehazer_Color.erase_size.getText();
    await SoftAssert.assertEqual(
      eraseSizeText,
      "20",
      `Eraser Size default value mismatched. Current Value : ${eraseSizeText}`
    );

    const eraseFeatherText =
      await PE_Custom_Preset_Neon_Dehazer_Color.erase_feather.getText();
    await SoftAssert.assertEqual(
      eraseFeatherText,
      "20",
      `Eraser Feather default value mismatched. Current Value : ${eraseFeatherText}`
    );

    const eraseOpacityText =
      await PE_Custom_Preset_Neon_Dehazer_Color.erase_opacity.getText();
    await SoftAssert.assertEqual(
      eraseOpacityText,
      "100",
      `Eraser Opacity default value mismatched. Current Value : ${eraseOpacityText}`
    );
  });

  it("Verify applying different mask shapes", async () => {
    await Common_function.clickElementByXPath(
      // Select Mask Erase Option
      '//android.widget.TextView[@resource-id="com.myzesty:id/masktext"]'
    );
    await commonfunPage.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/shape"])[1]'
    );
    await Common_function.clickElementByXPath(
      // Select circular Erase
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/shape"])[1]'
    );
    await browser.pause(500);
    await Common_function.clickElementByXPath(
      // Select square Erase
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/shape"])[2]'
    );
    await browser.pause(500);
    await Common_function.clickElementByXPath(
      // Select Star Erase
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/shape"])[3]'
    );
    await browser.pause(1000);
  });

  it("Verify eraser functionality by erasing the applied preset.", async () => {
    await Common_function.clickElementByXPath(
      // Select Erase Option
      '//android.widget.TextView[@resource-id="com.myzesty:id/erasertext"]'
    );
    await Slider.Slider(7, 952, 1722, 1842, 0.4);
    await PE_Custom_Preset_Neon_Dehazer_Color.Erase_From_To(300, 780, 800, 780);
    await browser.pause(400);
    await PE_Custom_Preset_Neon_Dehazer_Color.Erase_From_To(300, 880, 800, 880);
    await browser.pause(1000);
  });

  it("Verify Undo/Redo for Eraser and Mask and verify that changes reflect on preview", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Undo_changes();
    await browser.pause(1000);
    await PE_Custom_Preset_Neon_Dehazer_Color.Redo_changes();
    await browser.pause(1000);
  });

  it("Verify Done actions button and check that applied changes reflect on the preview", async () => {
    await Common_function.clickElementByXPath(
      // Erase Canvas Done Button
      '//android.widget.ImageView[@resource-id="com.myzesty:id/donetick"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Custom"]'
    );
  });

  it("Verify Cancel actions that on cancel it discard all the applied changes.", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Cancel_Changes();
    await browser.pause(600);
  });

  it("Verify all classic templates and verify that changes reflect in preview", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Custom_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/gradient_tv"]'
    );
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/list"]/android.widget.FrameLayout',
      containerXpath:
        '//android.widget.LinearLayout[@resource-id="com.myzesty:id/list_area"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 5,
      restartIndexAfterScroll: 3,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 1,
      timeoutBetweenClicks: 400,
      lastIndex: 9,
    });
    await browser.pause(800);
  });

  it("Validate Intensity and Color bar slider adjustment and validate that changes reflect on the preview.", async () => {
    await Slider.Slider(28, 1080, 2034, 2111, 0.5);
    await browser.pause(800);
    await Slider.Slider(209, 955, 2111, 2221, 0.7);
  });

  it("Verify that selecting freehand original and preset option changes the preview", async () => {
    await Common_function.clickElementByXPath(
      // Click Freehand Tab in Custom Tab
      '//android.widget.TextView[@resource-id="com.myzesty:id/freehand_tv"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name_tv" and @text="Original"]'
    );
    await Common_function.clickElementByXPath(
      // Click on Preset in Freehand Tab
      '//android.widget.TextView[@resource-id="com.myzesty:id/name_tv" and @text="Preset"]'
    );
    await browser.pause(1000);
  });

  it("Verify Reset button reverts all custom adjustments", async () => {
    await Slider.Slider(28, 1080, 2034, 2111, 0.3);
    await browser.pause(600);
    await Slider.Slider(209, 955, 2111, 2221, 0.6);
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_reset_Changes();
  });

  it("Verify Library tab behavior with no saved templates", async () => {
    await Common_function.clickElementByXPath(
      // Click on Library Tab in Custom Tab
      '//android.widget.TextView[@resource-id="com.myzesty:id/saved_list_tv"]'
    );
    const saved_preset_visible =
      await PE_Custom_Preset_Neon_Dehazer_Color.saved_preset.isDisplayed();
    if (saved_preset_visible) {
      await Common_function.longPressElement(
        '(//android.widget.LinearLayout[@resource-id="com.myzesty:id/custom_container"])[1]',
        2000
      );
      await Common_function.clickElementByXPath(
        // Click on Preser Delete cross button
        '//android.widget.ImageView[@resource-id="com.myzesty:id/imgDelete"]'
      );
      await browser.pause(600);
      await Common_function.clickElementByXPath(
        // Delete Custom Preset button path
        '//android.widget.TextView[@resource-id="com.myzesty:id/txtExit"]'
      );
    } else {
      console.log(
        "[COLLECT] No saved presets found, proceeding to validate empty library message."
      );
    }
    const noSavedTemplatesMessage =
      await PE_Custom_Preset_Neon_Dehazer_Color.empty_library.getText();
    await SoftAssert.assertEqual(
      noSavedTemplatesMessage,
      "You haven't saved any presets yet!",
      `Empty library message mismatched. Current Message : ${noSavedTemplatesMessage}`
    );
    await browser.pause(800);
  });

  it("Verify Save button opens “Name your preset” screen and successfully saves the new preset name", async () => {
    await Common_function.clickElementByXPath(
      // Click on Classic Templets in Custom Tab
      '//android.widget.TextView[@resource-id="com.myzesty:id/gradient_tv"]'
    );
    await Common_function.waitForElementToBeVisible(
      // Color Slider XPath
      '//android.widget.LinearLayout[@resource-id="com.myzesty:id/color_area"]'
    );
    await Slider.Slider(28, 1080, 2034, 2111, 0.6);
    await PE_Custom_Preset_Neon_Dehazer_Color.Save_Preset();
    await PE_Custom_Preset_Neon_Dehazer_Color.text_area.click();
    await Common_function.waitForElementToBeVisible(
      // Wait for character counter to become visible
      '//android.widget.TextView[@resource-id="com.myzesty:id/txtLetters"]'
    );
    await PE_Custom_Preset_Neon_Dehazer_Color.Enter_Preset_Name("Preset 1");
    await PE_Custom_Preset_Neon_Dehazer_Color.Apply_Changes();
    await browser.pause(600);
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Cancel_Changes();
    await browser.pause(300);
  });

  it("Verify Done (✓) applies Custom effect to the media and reflect on preview.", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Custom_Tab();
    await Common_function.clickElementByXPath(
      // Click on Library Tab in Custom Tab
      '//android.widget.TextView[@resource-id="com.myzesty:id/saved_list_tv"]'
    );
    await Slider.Slider(209, 955, 2111, 2221, 0.6);
    await Common_function.clickElementByXPath(
      // Click on Done button on Custom Tab
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
  });

  it("Verify Neon UI elements appear correctly and templets are available", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Neon"]'
    );
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Neon_Tab();
  });

  it("Verify available Neon categories are applied accurately", async () => {
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/presetName" and @text="Emerald"]'
    );
    await Common_function.Apply_All_Items({
      itemXpathBase:
        '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      containerXpath:
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/list"]',
      direction: "RTL",
      startIndex: 1,
      scrollAfterIndex: 4,
      restartIndexAfterScroll: 1,
      repeatsPerScroll: 1,
      swipeDuration: 800,
      maxScrolls: 10,
      timeoutBetweenClicks: 500,
      lastIndex: 15,
    });
    await browser.pause(800);
  });

  it("Verify changing fade value updates effect and changes reflect on the preview.", async () => {
    await Slider.Slider(33, 955, 2111, 2221, 0.7);
    await browser.pause(800);
    const Update_value =
      await PE_Custom_Preset_Neon_Dehazer_Color.neon_fade_value.getText();
    console.log("[COLLECT] Neon Fade Upated Value :", Update_value);
  });

  it("Verify applying Neon effect and validate that neon effect is applied to the preview.", async () => {
    await Common_function.clickElementByXPath(
      // Neon Effect Save button
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
    await browser.pause(800);
  });

  it("Verify that by clicking cancel button , the effect will not be applied to the media. ", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Expand_Menu();
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Neon_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/presetName" and @text="Emerald"]'
    );
    await Common_function.clickElementByXPath(
      // Neon Effect Cancel button
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"]'
    );
    await browser.pause(800);
  });

  it("Verify Dehazer UI elements appear correctly", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Dehazer"]'
    );
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Dehazer_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/presetName" and @text="Dehaze 1"]'
    );
    const isVisible =
      await PE_Custom_Preset_Neon_Dehazer_Color.dehazer_1.waitForDisplayed();
    if (isVisible) {
      console.log("[COLLECT] Dehazer tab is visible.");
    } else {
      console.log("[COLLECT] Dehazer tab is not visible.");
    }
  });

  it("Verify available Dehaze options can be applied and preview should be visible.", async () => {
    // Function to click on first three effects
    for (let i = 1; i <= 3; i++) {
      await Common_function.clickElementByXPath(
        `(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[${i}]`
      );
      await browser.pause(500);
    }
  });

  it("Verify dehaze intensity and validate changes reflect on the preview.", async () => {
    await Slider.Slider(7, 962, 2111, 2221, 0.8);
    await browser.pause(800);
  });

  it("Verify Done button applied the Dehaze effect on the media.", async () => {
    await Common_function.clickElementByXPath(
      // Dehaze Done Button
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
    await browser.pause(800);
  });

  it("Verify default state when Color tool opens", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Color_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/saturation_title"]'
    );
    const element = await $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/saturation_title"]'
    );
    const isDisplayed = await element.isDisplayed();
    if (isDisplayed) {
      console.log(
        "[COLLECT] Color tool opened with Saturation option visible."
      );
    } else {
      console.log("[COLLECT] Color tool did not open correctly.");
    }
    await browser.pause(800);
  });

  it("Verify color selection from color list and their preview should be reflected on the media.", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Color_And_Adjust_Slider(8, {
      startX: 7,
      endX: 962,
      startY: 1942,
      endY: 2052,
      percentage: 0.8,
    });
  });

  it("Verify that intensity adjustment changes the preview.", async () => {
    await Slider.Slider(7, 962, 2111, 2221, 0.8);
    await browser.pause(800);
  });

  it("Verify “View Original” functionality by resetting the intensity value.", async () => {
    await Common_function.clickElementByXPath(
      // Reset Color Intensity Button
      '//android.widget.ImageView[@resource-id="com.myzesty:id/intensity_reset"]'
    );
    await browser.pause(600);
  });

  it("Verify Cancel button discard all the applied changes.", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Cancel_Changes();
    await browser.pause(600);
  });

  it("Verify Magic option UI appears correctly and default value is set to 85.", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Magic_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/intensity_title"]'
    );
    const magicValueText = await $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/intensity"]'
    );
    const magicValue = await magicValueText.getText();
    await SoftAssert.assertEqual(
      magicValue,
      "85",
      `Magic default intensity value mismatched. Current Value : ${magicValue}`
    );
  });

  it("Verify by applying Magic effect with high intensity and validate changes reflect on preview.", async () => {
    await Slider.Slider(7, 962, 2111, 2221, 0.9);
    await browser.pause(800);
  });

  it("Verify cancel functionality cancel all the applied changes.", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Cancel_Changes();
    await browser.pause(600);
  });

  it.only("Verify media can be saved to device with applied changes.", async () => {
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Save_Media();
    await browser.pause(2000);
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Cancel_Share();
    await browser.pause(500);
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Cancel_Share();
    await browser.pause(1000);
    await PE_Custom_Preset_Neon_Dehazer_Color.Click_Exit();
    // await PE_Custom_Preset_Neon_Dehazer_Color.Discard_Post_Screen();
  });
});
