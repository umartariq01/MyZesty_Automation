import Effects from "../pageobjects/Effects.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";

describe("Effect Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Effect Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Effect Feature Test Suite finished =====");
  });

  it("Open editor and select media and apply Maximum Effect on Media", async () => {
    await Effects.Open_VideoEditor();
    await Effects.Click_Album();
    await Effects.Click_Automation_Album();
    await Effects.Click_Img_Tab();
    await Effects.Select_Media_1();
    await Effects.Click_Done_Btn();
    await browser.pause(2000);
    await Effects.waitForElementVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
    await Effects.Apply_Effect();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
    await Effects.Select_Effect_1();
    await browser.pause(1000);
    await Effects.Apply_Changes();
    await Effects.Apply_More_Effects();
    await Effects.applyEffects(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      4,
      2
    );
    await Effects.Apply_More_Effects();
    await browser.pause(1000);
    await Effects.Toolbar_Back();
    await browser.pause(700);
    await Effects.Click_Close_Project();
    await browser.pause(1000);
  });

  it("TC-FZ-001: Open editor and select media", async () => {
    await Effects.Start_New_Project();
    await Effects.Click_Album();
    await Effects.Click_Automation_Album();
    await Effects.Click_Img_Tab();
    await Effects.Select_Media_1();
    await Effects.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
  });

  it("TC-FZ-002: Add Effect on Single  Media , remove effect then save in Draft", async () => {
    await Effects.Apply_Effect();
    await Common_function.waitForElementToBeVisible(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
    await Effects.Select_Effect_1();
    await Effects.Apply_Changes();
    await Effects.Toolbar_Back();
    // Save Project to draft
    await Effects.Click_Close_Project();
    await Effects.Open_Draft_Proj();
    await browser.pause(1500);
    await Effects.Edit_Effects();
    await Effects.Select_Effect_Subbar();
    // Add verification here that effect subbar is visible
    await Common_function.softAssertElementPresent(
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]'
    );
    await Effects.Effect_Subbar_Edit();
    await Effects.Remove_Effect();
    await Effects.Apply_Changes();
    await Effects.Toolbar_Back();
    await Effects.Click_Close_Project();
    await browser.pause(1000);
  });

  it("TC-FZ-003: Open Draft project and Extend effect Sub bar:", async () => {
    await Effects.Open_Draft_Proj();
    await Effects.Apply_Effect();
    await Effects.Select_Effect_1();
    await Effects.waitForElementEnabled(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
    await Effects.Click_Close_Project(); // Cancel the applied effect
    await Effects.Click_Advance_Add();

    await Effects.Media_Selection();
    await Effects.Apply_Effect();
    await Effects.Select_Effect_1();
    await Effects.Apply_Changes();
    await Sliders.Extender(
      driver,
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View[3]',
      400
    );
    await browser.pause(1000);
  });

  it("TC-FZ-004: Add a video then add effect. Extend the effect to the video:", async () => {
    await Effects.Toolbar_Back();
    await Effects.Click_Advance_Add();
    await Effects.Click_Album();
    await Effects.Click_Automation_Album();
    await Effects.Click_Video_Tab();
    await Effects.Select_Media_1();
    await Effects.Click_Done_Btn();
    await Effects.waitForElementVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
    await browser.pause(1000);
    await Effects.Edit_Effects();
    await Effects.Apply_More_Effects();
    await Effects.Select_Effect_2();
    await Effects.Apply_Changes();
    await Sliders.Extender(
      driver,
      '(//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"])[2]/android.view.View[2]',
      300
    );
    await Sliders.scrollScreen(350, 1633, 542, 1633, 1000);
    await Effects.Play_Pause_Media();
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/image"]',
      37,
      1633,
      1020,
      1633
    );
    await Effects.Apply_More_Effects();
    await Effects.applyEffects(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])',
      2,
      2
    );
    await browser.pause(1000);
  });

  it("Export Media", async () => {
    await Effects.Toolbar_Back();
    await Effects.Export_Media();
    await browser.pause(10000);
    await Effects.Export_Done_Btn();
  });
});
