import Freeze from "../pageobjects/Freeze.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import { browser } from "@wdio/globals";
import Common_function from "../pageobjects/commonfun.page.js";

describe('Freeze Feature Test Suite', () => {

  before(async () => {
    console.log("===== Running pre-checks before Freeze Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Freeze Feature Test Suite finished =====");
    
  });

  it('Select image and check if Freeze is applicable or not.', async () => {
    
    await Freeze.Open_VideoEditor();
    await Freeze.Click_Album();
    await Freeze.Click_Automation_Album();
    await Freeze.Click_Img_Tab();
    await Freeze.Select_Media_1();
    await Freeze.Click_Done_Btn()
    await browser.pause(3000);
    await Sliders.scrollUntilElementIsVisible('//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Freeze"]', 962, 2318, 162, 2318);
    await Freeze.Click_Freeze_Tab();
    await Common_function.longPressElement('(//android.widget.LinearLayout[@resource-id="com.myzesty:id/icon_area"])[1]', 3000);
  });

  it('Apply Freeze at start of media and verify changes in Preview', async () => {
    
    await Freeze.Toolbar_Back();
    await Freeze.Click_Advance_Add();
    await Freeze.Click_Album();
    await Freeze.Click_Automation_Album();
    await Freeze.Click_Video_Tab();
    await Freeze.Select_Video();
    await Freeze.Click_Done_Btn()
    await browser.pause(4000);
    await Sliders.scrollUntilElementIsVisible('//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Freeze"]', 962, 2318, 162, 2318);
    await Freeze.Click_Freeze_Tab();
    await Sliders.scrollScreen(538, 1622, 431, 1622, 1500);
    await Common_function.longPressElement('(//android.widget.LinearLayout[@resource-id="com.myzesty:id/icon_area"])[1]', 4000);
    await browser.pause(1000);
    await Sliders.scrollScreen(299, 1622, 538, 1622, 1000);
    await Sliders.play_pause(534, 1412);
    await browser.pause(3000);
    await Sliders.play_pause(534, 1412);
  
  });

  it('Apply Freeze at clips end and verify changes in Preview', async () => {
    
    await Sliders.scrollScreen(1043, 1622, 40, 1622, 580, 2);
    await Common_function.longPressElement('(//android.widget.LinearLayout[@resource-id="com.myzesty:id/icon_area"])[1]', 4000);
    await Sliders.scrollScreen(376, 1622, 542, 1622, 1500);
    await browser.pause(500);
    await Sliders.play_pause(534, 1412);
    await browser.pause(2000);
    await Sliders.play_pause(534, 1412);
  });

  it('Undo and redo freeze and verify that changes reflect on the preview.', async () => {

    await Freeze.Toolbar_Back();
    await Common_function.Undo_changes();
    await browser.pause(1000);
    await Common_function.Redo_changes();
  });

  it('Save and reopen Project from draft and verify that freeze is applied to  media.', async () => {
    
    await Freeze.Click_Close_Project();
    await Freeze.Open_Draft_Proj();
    await browser.pause(5000);
  });

  it('Apply multiple Freeze segments at different points.', async () => {
    
    await Sliders.scrollUntilElementIsVisible('//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Freeze"]', 1039, 2315, 48, 2315);
    await Freeze.Click_Freeze_Tab();
    await Sliders.scrollScreen(1032, 1622, 40, 1622, 1000, 1);
    await browser.pause(500);
    await Common_function.longPressElement('(//android.widget.LinearLayout[@resource-id="com.myzesty:id/icon_area"])[1]',1500);
  });

  

  it('Apply Freeze at extremely short clip and verify the changes.', async () => {

    await Sliders.scrollScreen(951, 1622, 273, 1622);
    await Common_function.longPressElement('(//android.widget.LinearLayout[@resource-id="com.myzesty:id/icon_area"])[1]', 600);
    await Sliders.scrollScreen(1032, 1622, 40, 1622, 500, 1);
    await Freeze.Click_Freeze_Button();
    await browser.pause(600);
  });

  it('Export video with freeze frames', async () => {
    
    await Freeze.Toolbar_Back();
    await Freeze.Export_Media();
    await browser.pause(23000);
    await Freeze.Export_Done_Btn();

  });

});
