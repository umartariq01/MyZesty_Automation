import PE_Tune_Vintage_Fisheye from "../pageobjects/PE_Tune_Vintage_Fisheye.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { $, browser, expect } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import Logger from "../pageobjects/Logs.page.js";

describe("Photo Editor Tune, Vintage, Fisheye Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Photo Editor Tune, Vintage, Fisheye Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
    await Logger.start("[COLLECT]");
  });

  after(async () => {
    console.log(
      "===== Photo Editor Tune, Vintage, Fisheye Feature Test Suite finished ====="
    );
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify tapping on “Tune” opens the Tune screen and by default brightness is selected", async () => {
    await PE_Tune_Vintage_Fisheye.Open_PhotoEditor();
    await PE_Tune_Vintage_Fisheye.Click_Album();
    await PE_Tune_Vintage_Fisheye.Click_Automation_Album();
    await PE_Tune_Vintage_Fisheye.Select_Media_1(5);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Tune"]'
    );
    await PE_Tune_Vintage_Fisheye.CLick_Tune_Tab();
  });

  it("Verify brightness adjustment and chnages reflectes in Preview.", async () => {
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/brightness_text"]'
    );
    await Slider.Slider(7, 952, 2085, 2205, 1);
    await browser.pause(1000);
    await Slider.Slider(7, 952, 2085, 2205, 0);
  });

  it("Validate brightness reset to default and applied removed from preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Reset_Intensity();
    await browser.pause(800);
  });

  it("Verify contrast adjustment and changes reflected on the Preview", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Contrast();
    await Slider.Slider(7, 952, 2085, 2205, 0.8);
    await browser.pause(400);
  });

  it("Verify saturation adjustment and changes reflected on the Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Saturation();
    await Slider.Slider(7, 952, 2085, 2205, 0.6);
    await browser.pause(800);
    await Slider.Slider(7, 952, 2085, 2205, 0.2);
  });

  it("Verify Hue adjustment and changes reflected on the Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Hue();
    await Slider.Slider(7, 952, 2085, 2205, 0.6);
    await browser.pause(800);
  });

  it("Verify Shadow adjustment and changes reflected on Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Shadow();
    await Slider.Slider(7, 952, 2085, 2205, 0.4);
    await browser.pause(800);
  });

  it("Verify Vibrance adjustment and changes reflected on the Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Vibrance();
    await Slider.Slider(7, 952, 2085, 2205, 0.7);
    await browser.pause(800);
  });

  it("Verify Done (✔) applies tuning changes and are visible on the Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Apply_Changes();
    await browser.pause(800);
  });

  it("Verify default settings when Vignette is opened", async () => {
    await PE_Tune_Vintage_Fisheye.Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Vignette"]'
    );
    await PE_Tune_Vintage_Fisheye.Cick_Vintage_Tab();
    const isOuter_Intensity_Visible =
      await PE_Tune_Vintage_Fisheye.outer_intensity.getText();
    await SoftAssert.assertEqual(
      isOuter_Intensity_Visible,
      "-25",
      "Outer Intensity value is not correct Vignette tab"
    );
    const isInner_Intensity_Visible =
      await PE_Tune_Vintage_Fisheye.inner_intensity.getText();
    await SoftAssert.assertEqual(
      isInner_Intensity_Visible,
      "0",
      "Inner Intensity value is not correct in Vignette tab"
    );
    const isTransition_Visible =
      await PE_Tune_Vintage_Fisheye.transition.getText();
    await SoftAssert.assertEqual(
      isTransition_Visible,
      "50",
      "Transition value is not correct in Vignette tab"
    );
  });

  it("Verify shape selection functionality and verify that shape changes in Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Square_Shape();
    await browser.pause(400);
    await PE_Tune_Vintage_Fisheye.Click_Rectangular_Shape();
    await browser.pause(400);
    await PE_Tune_Vintage_Fisheye.Click_Ellipse_Shape();
    await browser.pause(800);
  });

  it("Verify outer, inner, and transition intensity bar functionality abd verify changes reflected in Preview.", async () => {
    // Unter Intensity Slider
    await Slider.Slider(30, 900, 1747, 1867, 0.2);
    await browser.pause(200);
    // Inner Intensity Slider
    await Slider.Slider(30, 900, 1916, 2036, 0.7);
    await browser.pause(200);
    // Transition Slider
    await Slider.Slider(30, 900, 2085, 2205, 0.7);
    await browser.pause(800);
  });

  it("Verify movement of vignette shape and validate that shape movement on Preview.", async () => {
    await Slider.Drag_Drop_Xpath(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/photo_container"]/android.widget.LinearLayout',
      520,
      561
    );
    await browser.pause(800);
  });

  it("Verify scaling/shape resizing using two-finger gesture.", async () => {
    const element = await $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/photo_container"]/android.widget.LinearLayout'
    );
    await element.zoom({ duration: 1000, scale: 0.5 });
  });

  it("Verify Cancel button functionality and verify that it discard all the applied changes.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Cancel_Changes();
    await browser.pause(800);
  });

  it("Verify Done button functionality and verify all the changes are applied to the media.", async () => {
    await PE_Tune_Vintage_Fisheye.Expand_Menu();
    await PE_Tune_Vintage_Fisheye.Cick_Vintage_Tab();
    await PE_Tune_Vintage_Fisheye.Click_Square_Shape();
    await Slider.Slider(30, 900, 1747, 1867, 0.2);
    await browser.pause(200);
    await Slider.Slider(30, 900, 1916, 2036, 0.7);
    await browser.pause(200);
    await Slider.Slider(30, 900, 2085, 2205, 0.7);
    await PE_Tune_Vintage_Fisheye.Apply_Changes();
    await browser.pause(800);
  });

  it("Verify default Fisheye settings with Intensity value 50, Radius value 20 & Rotation value 0.", async () => {
    await PE_Tune_Vintage_Fisheye.Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Fisheye"]'
    );
    await PE_Tune_Vintage_Fisheye.Click_Fisheye_Tab();

    const general_intensity = await $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/intensity"]'
    );

    const intensityValue = await general_intensity.getText();
    await SoftAssert.assertEqual(
      intensityValue,
      "50",
      "Fisheye default Intensity value mismatched"
    );

    await PE_Tune_Vintage_Fisheye.Click_Fisheye_Radius_Tab();
    const radiusValue = await general_intensity.getText();
    await SoftAssert.assertEqual(
      radiusValue,
      "20",
      "Fisheye default Radius value mismatched"
    );

    await PE_Tune_Vintage_Fisheye.Click_Fisheye_Rotation_Tab();
    const rotationValue = await general_intensity.getText();
    await SoftAssert.assertEqual(
      rotationValue,
      "0",
      "Fisheye default Rotation value mismatched"
    );
  });

  it("Verify Fisheye intensity adjustment and changes reflect on the Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Fisheye_Intensity_Tab();
    await Slider.Slider(7, 952, 2085, 2205, 0.8);
    await browser.pause(800);
  });

  it("Verify radius adjustment and changes reflect on the Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Fisheye_Radius_Tab();
    await Slider.Slider(7, 952, 2085, 2205, 0.7);
    await browser.pause(800);
  });

  it("Verify rotation adjustment and changes reflect on the Preview.", async () => {
    await PE_Tune_Vintage_Fisheye.Click_Fisheye_Rotation_Tab();
    await Slider.Slider(7, 952, 2085, 2205, 0.8);
    await browser.pause(800);
  });

  it("Verify drag control for adjusting effect by manually adjusting the effect on Preview.", async () => {
    await Slider.Drag_Drop_Xpath(
      `//android.widget.FrameLayout[@resource-id="com.myzesty:id/photo_container"]/android.widget.LinearLayout`,
      580,
      666
    );
    await browser.pause(800);
  });

  it("Verify Done button functionality and save all the applied changes.", async () => {
    await PE_Tune_Vintage_Fisheye.Apply_Changes();
    await browser.pause(500);
    await PE_Tune_Vintage_Fisheye.Apply_Changes();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@text="Add images/videos"]'
    );
  });

  it.only("Verify Save nedia to gallery with all the applied changes.", async () => {
    await PE_Tune_Vintage_Fisheye.Cancel_Post_Media();
  });
});
