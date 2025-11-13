import PhotoEditor_Basic_Operation from "../pageobjects/PhotoEditorBasic.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { $, browser, expect } from "@wdio/globals";
import commonfunPage from "../pageobjects/commonfun.page.js";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import Logger from "../pageobjects/Logs.page.js";

describe("Wizard Audio Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Wizard Audio Feature Tests ====="
    );

    // await Subscription.Check_Subscription("Processing");
    await Logger.start("[COLLECT]");
  });

  after(async () => {
    console.log("===== Wizard Audio Feature Test Suite finished =====");
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify that an image can be Cropped with “Original” ratio", async () => {
    await PhotoEditor_Basic_Operation.Open_PhotoEditor();
    await PhotoEditor_Basic_Operation.Click_Album();
    await PhotoEditor_Basic_Operation.Click_Automation_Album();
    await PhotoEditor_Basic_Operation.Select_Media_1(5);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Presets"]'
    );
    await Slider.Bidirection_scrollScreen_FindElement(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/h_tool_list"]',
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Crop / Rotate"]'
    );
    await PhotoEditor_Basic_Operation.Click_Crop_Rotate();
    await PhotoEditor_Basic_Operation.Is_Crop_Selected(
      '//android.widget.TextView[@resource-id="com.myzesty:id/crop_text" and @text="Original"]'
    );
  });

  it("Verify that an image can be Cropped with “1:1” ratio", async () => {
    await Common_function.clickElementByXPath(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[2]'
    );
    await PhotoEditor_Basic_Operation.Is_Crop_Selected(
      // Select 1:1 Dimension
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[2]',
      "[COLLECT] 1:1 crop is selected successfully."
    );
  });

  it("Verify that an image can be Cropped with “4:5” ratio", async () => {
    await Common_function.clickElementByXPath(
      // Select 4:5 Dimension
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[3]'
    );
    await PhotoEditor_Basic_Operation.Is_Crop_Selected(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[3]',
      "[COLLECT] 4:5 crop is selected successfully."
    );
  });

  it("Verify that an image can be Cropped with “16:9” ratio", async () => {
    await Common_function.clickElementByXPath(
      // Select 16:9 Dimension
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[4]'
    );
    await PhotoEditor_Basic_Operation.Is_Crop_Selected(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[4]',
      "[COLLECT] 16:9 crop is selected successfully."
    );
  });

  it("Verify that an image can be Cropped with “9:16” ratio", async () => {
    await Common_function.clickElementByXPath(
      // Select 9:16 Dimension
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[5]'
    );
    await PhotoEditor_Basic_Operation.Is_Crop_Selected(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[5]',
      "[COLLECT] 9:16 crop is selected successfully."
    );
  });

  it("Verify that an image can be Cropped with “3:4” ratio", async () => {
    await Common_function.clickElementByXPath(
      // Select 3:4 Dimension
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[6]'
    );
    await PhotoEditor_Basic_Operation.Is_Crop_Selected(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/crop_image"])[6]',
      "[COLLECT] 3:4 crop is selected successfully."
    );
    await browser.pause(1000);
  });

  it("Verify that Image Rotates 90° counterclockwise", async () => {
    await PhotoEditor_Basic_Operation.Click_Rotate_Tab();
    await browser.pause(600);
    await PhotoEditor_Basic_Operation.Click_Rotate_Image();
    await browser.pause(1000);
  });

  it("Verify Cancel Rotation", async () => {
    await PhotoEditor_Basic_Operation.Click_Cancel_Rotation();
    await browser.pause(1000);
  });

  it("Verify Image Rotation moving angle bar right", async () => {
    await PhotoEditor_Basic_Operation.scrollUntilTextEquals({
      containerXpath:
        '//android.view.View[@resource-id="com.myzesty:id/rotate_scroll_wheel"]',
      valueXpath:
        '//android.widget.TextView[@resource-id="com.myzesty:id/text_view_rotate"]',
      expectedText: "34°",
      direction: "LTR",
      maxScrolls: 2,
      duration: 1500,
    });
  });

  it("Verify Image Rotation move angle bar left", async () => {
    await PhotoEditor_Basic_Operation.scrollUntilTextEquals({
      containerXpath:
        '//android.view.View[@resource-id="com.myzesty:id/rotate_scroll_wheel"]',
      valueXpath:
        '//android.widget.TextView[@resource-id="com.myzesty:id/text_view_rotate"]',
      expectedText: "-34°",
      direction: "RTL",
      maxScrolls: 4,
      duration: 1500,
    });
    await browser.pause(1000);
  });

  it("Verify that Image  Scales Increases (Zoom In to 14%)", async () => {
    await PhotoEditor_Basic_Operation.Click_Cancel_Rotation();
    await browser.pause(700);
    await PhotoEditor_Basic_Operation.Click_Scale_Tab();
    await PhotoEditor_Basic_Operation.scrollUntilTextEquals({
      containerXpath:
        '//android.view.View[@resource-id="com.myzesty:id/scale_scroll_wheel"]',
      valueXpath:
        '//android.widget.TextView[@resource-id="com.myzesty:id/text_view_scale"]',
      expectedText: "14%",
      direction: "LTR",
      maxScrolls: 2,
      duration: 1500,
    });
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
    await browser.pause(1000);
  });

  it("Verify that Apply Fade All (default intensity)", async () => {
    await PhotoEditor_Basic_Operation.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Fade"]'
    );
    await PhotoEditor_Basic_Operation.Click_Fade_Tab();
    await browser.pause(1000);
    const intensityValue =
      await PhotoEditor_Basic_Operation.fade_default_intensity.getText();
    await SoftAssert.assertEqual(
      intensityValue,
      "80",
      "Fade default intensity is NOT 80 as expected."
    );
    console.log(
      `[COLLECT] Fade default intensity is verified as ${intensityValue}`
    );
  });

  it("Verify Apply Fade Right", async () => {
    await Common_function.clickElementByXPath(
      // Select Right Fade
      '//android.widget.ImageView[@resource-id="com.myzesty:id/right_fade"]'
    );
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
    await browser.pause(1000);
  });

  it("Verify both horizontal and vertical Media flip", async () => {
    await PhotoEditor_Basic_Operation.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Fade"]'
    );
    await PhotoEditor_Basic_Operation.Click_Flip_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/flipH"]'
    );
    await Common_function.clickElementByXPath(
      // Click Horizontal Flip
      '//android.widget.ImageView[@resource-id="com.myzesty:id/flipH"]'
    );
    await browser.pause(500);
    await Common_function.clickElementByXPath(
      // Click Vertical Flip
      '//android.widget.ImageView[@resource-id="com.myzesty:id/flipV"]'
    );
    await browser.pause(500);
    await Common_function.clickElementByXPath(
      // Click Vertical Flip
      '//android.widget.ImageView[@resource-id="com.myzesty:id/flipV"]'
    );
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
  });

  it("Verify Normal Blend Application", async () => {
    await PhotoEditor_Basic_Operation.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      // Wait for Blend Tab to show
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Blend"]'
    );
    await PhotoEditor_Basic_Operation.Click_Blend_Tab();
    await PhotoEditor_Basic_Operation.Click_Album();
    await PhotoEditor_Basic_Operation.Click_Automation_Album();
    await PhotoEditor_Basic_Operation.Select_Media_1(2);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Normal"]'
    );
    await PhotoEditor_Basic_Operation.Click_Replace_Image();
    await PhotoEditor_Basic_Operation.Click_Album();
    await PhotoEditor_Basic_Operation.Click_Automation_Album();
    await PhotoEditor_Basic_Operation.Select_Media_1();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Normal"]'
    );
  });

  it("Validate Artistic Blend modes (Dissolve, Add, Multiply, Overlay)...", async () => {
    await PhotoEditor_Basic_Operation.validateCategories(
      [
        "Dissolve",
        "Add",
        "Multiply",
        "Overlay",
        "Lighten",
        "Darken",
        "Color Burn",
        "Color Dodge",
        "Screen",
        "Difference",
        "Subtract",
        "Exclusion",
        "Hard Light",
        "Soft Light",
        "Color",
        "Hue",
        "Saturation",
        "Luminosity",
        "Linear Burn",
      ],
      {
        containerXpath:
          '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/modes_list"]',
        shouldClick: true,
        maxScrollAttempts: 5,
        swipeDuration: 800,
      }
    );
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
    await browser.pause(1000);
  });

  it("Verify Canvas Overlay variations", async () => {
    await PhotoEditor_Basic_Operation.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      // Wait for Blend Tab to show
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Overlay"]'
    );
    await PhotoEditor_Basic_Operation.Click_Overlay_Tab();
    await Common_function.waitForElementToBeVisible(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout[1]'
    );
    await Common_function.Apply_All_Effects(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout',
      1,
      1,
      1500,
      5
    );
  });

  it("Verify Grunge Overlay variations", async () => {
    await Common_function.clickElementByXPath(
      // CLICK ON GRUNGE CATEGORY
      '//android.widget.TextView[@resource-id="com.myzesty:id/grunge_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout[1]'
    );
    await Common_function.Apply_All_Effects(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout',
      1,
      1,
      1500,
      5
    );
  });

  it("Apply Lights Overlay variations", async () => {
    await Common_function.clickElementByXPath(
      // CLICK ON LIGHTS CATEGORY
      '//android.widget.TextView[@resource-id="com.myzesty:id/lights_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout[1]'
    );
    await Common_function.Apply_All_Effects(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout',
      1,
      1,
      1500,
      5
    );
  });

  it("Apply Patterns Overlay variations", async () => {
    await Common_function.clickElementByXPath(
      // CLICK ON PATTERNS CATEGORY
      '//android.widget.TextView[@resource-id="com.myzesty:id/patterns_text"]'
    );
    await Common_function.waitForElementToBeVisible(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout[1]'
    );
    await Common_function.Apply_All_Effects(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/overlay_list"]/android.widget.FrameLayout',
      1,
      1,
      1500,
      5
    );
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
    await browser.pause(700);
  });

  it("Verify Normal Blur with default intensity", async () => {
    await PhotoEditor_Basic_Operation.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Blur"]'
    );
    await PhotoEditor_Basic_Operation.Click_Blur_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/normal_text"]'
    );
    const intensityValue =
      await PhotoEditor_Basic_Operation.blur_intensity.getText();
    await SoftAssert.assertEqual(
      intensityValue,
      "80",
      "Blur default intensity is NOT 80 as expected."
    );
    console.log(
      `[COLLECT] Blur default intensity is verified as ${intensityValue}`
    );
  });

  it("Verify that Linear Blur Apply", async () => {
    await Common_function.clickElementByXPath(
      // Select Linear Blur
      '//android.widget.TextView[@resource-id="com.myzesty:id/linear_text"]'
    );
    await browser.pause(1000);
  });

  it("Verify that Radial Blur Apply", async () => {
    await Common_function.clickElementByXPath(
      // Select Radial Blur
      '//android.widget.TextView[@resource-id="com.myzesty:id/radial_text"]'
    );
    await browser.pause(1000);
  });

  it("Apply Inner Radial Blur", async () => {
    await Common_function.clickElementByXPath(
      // Select Inner Radial Blur
      '//android.widget.TextView[@resource-id="com.myzesty:id/iradial_text"]'
    );
    await browser.pause(1000);
    await PhotoEditor_Basic_Operation.Click_Cancel_Changes();
  });

  it("Verify Adjust temperature and changes reflect on preview", async () => {
    await PhotoEditor_Basic_Operation.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="White-Balance"]'
    );
    await PhotoEditor_Basic_Operation.Click_Whit_Balance();
    // White Balance - Temperature Slider Increase
    await Slider.Slider(7, 962, 2111, 2221, 0.8);
    await browser.pause(600);
  });

  it("Verify Adjust tint and verify that changes reflect on preview ", async () => {
    await Common_function.clickElementByXPath(
      // Select Tint Tab
      '//android.widget.TextView[@resource-id="com.myzesty:id/tint_text"]'
    );
    await Slider.Slider(7, 962, 2111, 2221, 0.4);
    await browser.pause(600);
  });

  it("Verify Auto white balance will adjust the image automatically and reflect on preview", async () => {
    await Common_function.clickElementByXPath(
      //  Click Auto Text
      '//android.widget.TextView[@resource-id="com.myzesty:id/auto_text"]'
    );
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
    await browser.pause(700);
  });

  it("Verify RGB curve Adjustment by moving the curves and reflect the changes in preview.", async () => {
    await PhotoEditor_Basic_Operation.Click_Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Curves"]'
    );
    await PhotoEditor_Basic_Operation.Click_Curves();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/red"]'
    );
    await PhotoEditor_Basic_Operation.dragGraphAlongDiagonal(
      '//android.widget.RelativeLayout[@resource-id="com.myzesty:id/parent"]/android.view.View',
      -300
    );
    await browser.pause(700);
  });

  it("Verify Red (R) curve Adjustment and check that changes reflect on the preview.", async () => {
    await Common_function.clickElementByXPath(
      // Click on Red Curve
      '//android.widget.ImageView[@resource-id="com.myzesty:id/red"]'
    );
    await PhotoEditor_Basic_Operation.dragGraphAlongDiagonal(
      '//android.widget.RelativeLayout[@resource-id="com.myzesty:id/parent"]/android.view.View',
      200
    );
    await browser.pause(700);
  });

  it("Verify Green (G) curve Adjustment and check that changes reflect on the preview.", async () => {
    await Common_function.clickElementByXPath(
      // Click on Green Curve
      '//android.widget.ImageView[@resource-id="com.myzesty:id/green"]'
    );
    await PhotoEditor_Basic_Operation.dragGraphAlongDiagonal(
      '//android.widget.RelativeLayout[@resource-id="com.myzesty:id/parent"]/android.view.View',
      -100
    );
    await browser.pause(700);
  });

  it("Verify Blue (B) curve Adjustment and check that changes reflect on the preview.", async () => {
    await Common_function.clickElementByXPath(
      // Click on Blue Curve
      '//android.widget.ImageView[@resource-id="com.myzesty:id/blue"]'
    );
    await PhotoEditor_Basic_Operation.dragGraphAlongDiagonal(
      '//android.widget.RelativeLayout[@resource-id="com.myzesty:id/parent"]/android.view.View',
      100
    );
    await browser.pause(700);
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
    await browser.pause(200);
    await PhotoEditor_Basic_Operation.Click_Save_Changes();
    await PhotoEditor_Basic_Operation.Export_Done_Btn();
  });
});
