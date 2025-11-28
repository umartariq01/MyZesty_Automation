import Photo_Editor_Locators from "../pageobjects/PE_Locators.page.js";
import PE_Draw from "../pageobjects/PE_Draw.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import Slider from "../pageobjects/Slider.page.js";
import { $, browser, driver, expect } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import Logger from "../pageobjects/Logs.page.js";

describe("Photo Editor Draw Feature Test Suite", () => {
  before(async () => {
    console.log(
      "===== Running pre-checks before Photo Editor Draw Feature Tests ====="
    );

    await Subscription.Check_Subscription("Processing");
    await Logger.start("[COLLECT]");
  });

  after(async () => {
    console.log("===== Photo Editor Draw Feature Test Suite finished =====");
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify tapping on “Draw” opens Draw Tools Screen", async () => {
    await Photo_Editor_Locators.Open_PhotoEditor();
    await Photo_Editor_Locators.Click_Album();
    await Photo_Editor_Locators.Click_Automation_Album();
    await Photo_Editor_Locators.Select_Media_1(5);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/expand"]'
    );
    await Photo_Editor_Locators.Expand_Menu();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Draw"]'
    );
    await PE_Draw.Click_Draw_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/shape_text"]'
    );
  });
});
