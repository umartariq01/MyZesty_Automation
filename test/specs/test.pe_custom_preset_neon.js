import PE_Custom_Preset_Neon_Dehazer_Color from "../pageobjects/PE_Custom_Preset_Neon.page.js";
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

  it.only("Verify intensity adjustment for Trends presets", async () => {
    await Slider.Slider(21, 957, 2085, 2205, 0.6);
    await browser.pause(1000);
  });

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});

  it("", async () => {});
});
