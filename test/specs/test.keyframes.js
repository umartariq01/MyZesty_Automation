import Keyframes from "../pageobjects/Keyframes.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Subscription from "../pageobjects/BuyPremium.page.js";
import Common_function from "../pageobjects/commonfun.page.js";
import { browser, expect } from "@wdio/globals";

describe("Audio Feature Test Suite", () => {
  before(async () => {
    console.log("===== Running pre-checks before Audio Feature Tests =====");

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Audio Feature Test Suite finished =====");
  });

  it("Verify the user can successfully apply a keyframe at a video.", async () => {
    await Keyframes.Open_VideoEditor();
    await Keyframes.Click_Album();
    await Keyframes.Click_Automation_Album();
    await Keyframes.Click_Video_Tab();
    await Keyframes.Select_Media_1(6);
    await Keyframes.Click_Done_Btn();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Keyframes.Click_Edit_Tab();
    await browser.pause(500);
    await Slider.scrollScreen(413, 1622, 313, 1622, 1500);
    await Keyframes.Zoom_Out(0.7);
    await Keyframes.Apply_Keyframe();
    await browser.pause(500);
  });

  it("Verify multiple keyframes can be applied and playback transitions occur smoothly between them.", async () => {
    await Slider.scrollScreen(780, 1622, 580, 1622, 1500);
    await Slider.Drag_Drop(driver, 520, 785, 862, 966);
    await browser.pause(250);

    await Slider.scrollScreen(900, 1622, 540, 1622, 1500);
    await Slider.Drag_Drop(driver, 805, 930, 500, 634);
    await browser.pause(500);

    await Slider.scrollScreen(800, 1622, 580, 1622, 1500);
    await Slider.Drag_Drop(driver, 500, 634, 170, 815);
    await browser.pause(500);

    await Slider.scrollScreen(744, 1622, 580, 1622, 1500);
    await Slider.Drag_Drop(driver, 269, 840, 480, 840);
    await Slider.zoomin(350, 837, 571, 837, 150, 837, 800, 837);
    await browser.pause(500);

    await Slider.scrollScreen(44, 1622, 920, 1622);
    await Slider.play_pause(534, 1412);
    await browser.pause(6000);
    await Slider.play_pause(534, 1412);
  });

  it("Verify keyframes persist after saving a project as a draft and reopening it.", async () => {
    await Keyframes.Toolbar_Back();
    await Keyframes.Click_Close_Project();
    await browser.pause(600);
    await Keyframes.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await Slider.play_pause(534, 1412);
    await browser.pause(6000);
    await Slider.play_pause(534, 1412);
  });

  it("Ensure the user can delete a keyframe correctly using the keyframe icon.", async () => {
    await Keyframes.Click_Edit_Tab();
    await browser.pause(500);
    await Slider.tapScreen(722, 1629);
    await browser.pause(400);
    await Slider.tapScreen(722, 1629);
    await Keyframes.Apply_Keyframe();
  });

  it("Verify keyframes are successfully rendered in the exported video.", async () => {
    await Keyframes.Toolbar_Back();
    await Keyframes.Export_Media();
    await Common_function.waitForElementToBeVisible(
      '//android.view.ViewGroup[@content-desc="Done"]'
    );
    await Keyframes.Export_Done_Btn();
  });
});
