import WizardAudio from "../pageobjects/WizardAudio.page.js";
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

    await Subscription.Check_Subscription("Processing");
  });

  after(async () => {
    console.log("===== Wizard Audio Feature Test Suite finished =====");
    await SoftAssert.assertAll();
    await Logger.flush();
  });

  it("Verify that tapping the Audio icon opens the audio pop-up menu with Add Music, Record, and Original Audio toggle options.", async () => {
    await WizardAudio.Open_WizardEditor();
    await WizardAudio.Click_Album();
    await WizardAudio.Click_Automation_Album();
    await WizardAudio.Click_Img_Tab();
    await Common_function.selectImages(3);
    await WizardAudio.Click_Video_Tab();
    await WizardAudio.Select_Media_1(2);
    await WizardAudio.Click_Done_Btn();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]',
      30000
    );
    await WizardAudio.Click_Audio_Tab();
    // Check Add Music Option
    async function Check_Music() {
      const isAudioVisible = await WizardAudio.add_music.isEnabled();
      if (isAudioVisible) {
        console.log("Add Music option is visible.");
      } else {
        console.log("Add Music option is not visible.");
      }
    }
    await Check_Music();
    // Check Record Option
    async function Check_Record() {
      const isRecordVisible = await WizardAudio.record.isEnabled();
      if (isRecordVisible) {
        console.log("[COLLECT] Record option is visible.");
      } else {
        console.log("[COLLECT] Record option is not visible.");
      }
    }
    await Check_Record();
    // Check Audio Toggle Option
    async function Check_Audio_Toggle() {
      const isToggleVisible = await WizardAudio.audio_toggle.isEnabled();
      const checked = await WizardAudio.audio_toggle.getAttribute("checked");
      if (checked === "true" && isToggleVisible) {
        console.log("[COLLECT] Audio toggle is at default Position.(ON)");
        console.log("[COLLECT] Audio toggle is visible.");
      } else {
        console.log("[COLLECT] Audio toggle is not at default Position.(OFF)");
      }
    }
    await Check_Audio_Toggle();
    await browser.pause(1000);
  });

  it("Verify that tapping Add Music opens the music selection screen with all category options.", async () => {
    await WizardAudio.Click_Add_Music(); // Inside Audio tool (Add Music)
    async function Verify_Music_Tabs() {
      const music = '//android.widget.TextView[@text="Music"]';
      const audio_fx = '//android.widget.TextView[@text="AudioFX"]';
      const my_music = '//android.widget.TextView[@text="My Library"]';
      const ai_library = '//android.widget.TextView[@text="AI Library"]';

      const musicVisible = await $(music).isDisplayed();
      const audioFxVisible = await $(audio_fx).isDisplayed();
      const myMusicVisible = await $(my_music).isDisplayed();
      const aiLibraryVisible = await $(ai_library).isDisplayed();

      if (musicVisible) {
        console.log("Music tab is visible.");
      } else {
        console.log("Music tab is not visible.");
      }

      if (audioFxVisible) {
        console.log("AudioFX tab is visible.");
      } else {
        console.log("AudioFX tab is not visible.");
      }

      if (myMusicVisible) {
        console.log("My Library tab is visible.");
      } else {
        console.log("My Library tab is not visible.");
      }

      if (aiLibraryVisible) {
        console.log("AI Library tab is visible.");
      } else {
        console.log("AI Library tab is not visible.");
      }
    }
    await Verify_Music_Tabs();
    await WizardAudio.validateCategories(
      [
        "Beats",
        "Celebration",
        "Holiday",
        "Sensation",
        "Corporate",
        "Uplifting",
        "Techno",
        "Feel-Good",
        "Romance",
        "Vlog",
        "Chill Vibes",
        "Bop & Drop",
        "Party Anthems",
      ],
      {
        shouldClick: false,
        scrollY: 740,
        rightToLeft: { startX: 990, endX: 100 }, // RTL
        leftToRight: { startX: 100, endX: 990 }, // LTR
      }
    );
    await browser.pause(1000);
  });

  it("Verify that user can play and pause a music preview before applying.", async () => {
    await WizardAudio.HandlePreviewPlayPause();
    await browser.pause(1000);
  });

  it("Verify that music can be downloaded and applied to media.", async () => {
    await Slider.Music_tab_Click();
    await browser.pause(1000);
    await browser.pause(1000);
  });

  it("Verify that an applied audio track can be re-trimmed.", async () => {
    // await Slider.Drag_Drop_Xpath('//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View[2]',)
    await Slider.dragSliderHandle(
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View[2]',
      200
    );
    await browser.pause(500);
    await WizardAudio.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that user can remove an added audio file.", async () => {
    await WizardAudio.Delete_Audio();
    await browser.pause(500);
    await WizardAudio.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that user can view and apply audio effects from the Audio FX tab.", async () => {
    await WizardAudio.Click_Audio_Tab();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@resource-id="com.myzesty:id/addMusic"]'
    );
    await WizardAudio.Click_Add_Music();
    await Common_function.clickElementByXPath(
      '//android.widget.TextView[@text="AudioFX"]'
    );
    await WizardAudio.validateCategories(
      [
        "Ambiance",
        "Transitions",
        "Funny",
        "Animals",
        "Emotional",
        "Action",
        "Sci-Fi",
        "Instruments",
        "Bleeps",
        "People",
        "Video Games",
        "Cartoon",
        "Horror",
      ],
      {
        shouldClick: false,
        scrollY: 740,
        rightToLeft: { startX: 990, endX: 100 }, // RTL
        leftToRight: { startX: 100, endX: 990 }, // LTR
      }
    );
    await Slider.AudioFX_tab();
    await WizardAudio.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that user can record custom audio and apply it to the media.", async () => {
    await WizardAudio.Click_Record();
    await WizardAudio.Click_Start_Stop_Record();
    await browser.pause(4000);
    await WizardAudio.Click_Start_Stop_Record();
    await WizardAudio.Apply_Audio_Changes();
    await browser.pause(500);
    await WizardAudio.Apply_Audio_Changes();
    await WizardAudio.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that user can enable or disable the original audio of the media.", async () => {
    await Common_function.clickElementByXPath(
      // Selecting 3rd media to verify Original Audio Toggle
      '(//android.view.View[@resource-id="com.myzesty:id/selectedBg"])[3]'
    );
    await WizardAudio.Click_Audio_Tab();
    await WizardAudio.Click_Audio_Toggle(); // Turn ON Original Audio
    await browser.pause(500);
    await WizardAudio.Click_Audio_Toggle(); // Turn OFF Original Audio
    await WizardAudio.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that user can undo and redo audio changes in Wizard Editor.", async () => {
    await Common_function.Undo_changes();
    await browser.pause(1000);
    await Common_function.Redo_changes();
    await browser.pause(1000);
  });

  it("Verify that applied audio is saved when project is saved as a draft and retained when reopened.", async () => {
    await WizardAudio.Click_Close_Project();
    await browser.pause(1000);
    await WizardAudio.Open_Draft_Proj();
    await Common_function.waitForElementToBeVisible(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await WizardAudio.Click_Audio_Tab();
    // Function to check presence of audio and recording after reopening draft
    async function Verify_Audio_Is_Present_After_Draft() {
      const audio_xpath = $(
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/list"]/android.widget.LinearLayout[1]'
      );
      const recording_xpath = $(
        '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/list"]/android.widget.LinearLayout[2]'
      );
      const is_audio_xpath_visible = await audio_xpath.isDisplayed();
      const is_recording_xpath_visible = await recording_xpath.isDisplayed();
      if (is_audio_xpath_visible && is_recording_xpath_visible) {
        console.log("Audio is present after reopening draft project.");
        console.log("Recording is present after reopening draft project.");
      } else {
        console.log("Audio is not present after reopening draft project.");
        console.log("Recording is not present after reopening draft project.");
      }
    }
    await Verify_Audio_Is_Present_After_Draft();
    await WizardAudio.Apply_Changes();
    await browser.pause(1000);
  });

  it("Verify that user can cancel the recording before saving.", async () => {
    await WizardAudio.Click_Audio_Tab();
    await WizardAudio.Click_Record();
    await WizardAudio.Click_Start_Stop_Record();
    await browser.pause(5000);
    await WizardAudio.Click_Start_Stop_Record();
    await WizardAudio.Cancel_Recorded_Audio();
    await browser.pause(600);
    await WizardAudio.Click_Close_Project(); // Close Audio Tab
    await browser.pause(1000);
  });

  it("Ensure replacing existing audio removes the previous one and applies the new audio correctly.", async () => {
    await WizardAudio.Click_Audio_Tab();
    await WizardAudio.Click_Add_Music(); // Replace Music
    await Slider.Music_tab_Click();
    await WizardAudio.Apply_Audio_Changes();
    await browser.pause(500);
    await WizardAudio.Apply_Changes();
    await browser.pause(1000);
  });

  it("Confirm that when Original Audio is ON, both the media’s original sound and added audio play correctly.", async () => {
    await WizardAudio.Click_Audio_Tab();
    // Check the ORIGINAL AUDIO TOGGLE is ON , if not turn it ON
    async function Check_Audio_Toggle() {
      const toggle = await WizardAudio.audio_toggle;

      await toggle.waitForDisplayed({ timeout: 5000 });

      const isEnabled = await toggle.isEnabled();
      const checked = await toggle.getAttribute("checked");

      if (checked === "true" && isEnabled) {
        console.log("Audio toggle is ON (default) and visible ✅");
      } else {
        console.log("Audio toggle is OFF ❌ — turning it ON now...");
        await toggle.click();
        await browser.pause(500);
        console.log("Audio toggle is now turned ON ✅");
      }
    }
    await Check_Audio_Toggle();
    await WizardAudio.Apply_Changes();
    await Slider.Slider(18, 1062, 1477, 1527, 0.85);
    await browser.pause(600);
    await Slider.play_pause_xpath(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/play"]'
    );
    await browser.pause(1000);
  });

  it("Confirm that exported video contains the applied audio and plays correctly.", async () => {
    await WizardAudio.Export_Media();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.view.ViewGroup[@content-desc="Done"]',
      60000
    );
    await WizardAudio.Export_Done_Btn();
    await browser.pause(1000);
  });
});
