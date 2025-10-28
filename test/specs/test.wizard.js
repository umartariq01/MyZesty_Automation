import Wizard from "../pageobjects/Wizard.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";

describe("Wizard Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Wizard Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Wizard Feature Test Suite finished =====");
  });

  it("Verify that the user can trim a video manually using the seek bar.", async () => {
    await Sliders.scrollUntilElementIsVisible(
      '//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup',
      756,
      1536,
      290,
      1536
    );
    await Wizard.Open_WizardEditor();
    await Wizard.Click_Album();
    await Wizard.Click_Automation_Album();
    await Wizard.Click_Video_Tab();
    await Wizard.Select_Media_1(5);
    await Wizard.Click_Done_Btn();
    await Wizard.Verify_Wizard_PopUp();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Slider.tapScreen(352, 1840);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/trim_icon"]'
    );
    await Wizard.Trim_Video();
    await browser.pause(1000);
    await Wizard.Trim_5_Seconds();
    await Wizard.Apply_Changes();
    // Traim the selected duration using drag and drop
    await Sliders.tapScreen(352, 1840);
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/trim_icon"]'
    );
    await Wizard.Trim_Video();
    await browser.pause(1000);
    await Sliders.Drag_Drop(465, 1804, 745, 1804);
    await Wizard.Apply_Changes();
    // Trim video using free trim option
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
});
