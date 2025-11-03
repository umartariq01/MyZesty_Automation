import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser } from "@wdio/globals";
import SoftAssert from "../pageobjects/SoftAssert.page.js";
import WizardSticker from '../pageobjects/WizardSticker.page.js';


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
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });


  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });

  it("", async () => {
    
    
  });
});