import { $, browser } from "@wdio/globals";
import Common_function from "../pageobjects/commonfun.page.js";
import Sliders from "../pageobjects/Slider.page.js";
import assert from "assert";

class Dehazer {
  get dehazer() {
    return $('//android.widget.TextView[@text="Dehazer"]');
  }
  get img_tab() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/image_tab"]'
    );
  }
  get video_tab() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/video_tab"]'
    );
  }
  get img_1() {
    return $(
      '(//android.widget.FrameLayout[@resource-id="com.myzesty:id/disablestate"])[1]'
    );
  }
  get sort() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/sorttype"]'
    );
  }
  get dehaze2() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
  }
  get dehaze3() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
  }
  get intensity_reset() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/reset"]');
  }
  get done_save() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/action_text"]'
    );
  }
  get export_text() {
    return $(
      '//android.widget.TextView[@text="Your media is saved to your phone gallery"]'
    );
  }
  get export_done() {
    return $('//android.view.ViewGroup[@content-desc="Done"]');
  }
  get apply_dehazerr() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get export_vid() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/export"]'
    );
  }
  get premium() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/icon_premium"])[1]'
    );
  }
  get export_progress() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/percLabel"]'
    );
  }
  get compare() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/compare"]'
    );
  }
  get hide_dehaze() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/minimize"]'
    );
  }
  get done_btn() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
  }
  get draft_proj() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/img"])[1]'
    );
  }
  get album() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/album_name"]'
    );
  }
  get automation_album() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/tv_folder_name" and @text="Automation"]'
    );
  }

  get videoEditor() {
    return $(
      `//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View | //android.view.ViewGroup[@content-desc="Create, Video"]/android.view.ViewGroup/android.view.View`
    );
  }
  get images_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Images"]'
    );
  }
  get video_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Videos"]'
    );
  }
  get media_1() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[1]');
  }
  get done_button() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/done"]'
    );
  }
  get advance_add() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'
    );
  }
  get close_project() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"]'
    );
  }
  get open_draft() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/img"])[1]'
    );
  }
  get VE_Dehazer() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Dehazer"]'
    );
  }
  get VE_dehaze1() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Dehaze 1"]'
    );
  }
  get VE_dehaze2() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Dehaze 2"]'
    );
  }
  get VE_dehaze3() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Dehaze 3"]'
    );
  }
  get VE_remove_dehaze() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
  }
  get video() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[2]');
  }

  async Open_VideoEditor() {
    await (await this.videoEditor).click();
  }
  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Img_Tab() {
    await (await this.images_tab).click();
  }
  async Click_Video_Tab() {
    await (await this.video_tab).click();
  }

  async Select_Media_1() {
    await (await this.media_1).click();
  }
  async Click_Done_Btn() {
    await (await this.done_button).click();
    await browser.pause(2000);
  }
  async waitForElementVisible(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({
      timeout: timeout,
      timeoutMsg: `Element ${selector} not visible after ${timeout} ms`,
    });
    return element;
  }
  async Click_Close_Project() {
    await (await this.close_project).click();
  }
  async Open_Draft_Proj() {
    await (await this.draft_proj).click();
    await browser.pause(2000);
  }
  async Vid_Ediotr_Dehazer() {
    await (await this.VE_Dehazer).click();
    await browser.pause(700);
  }
  async Vid_Ediotr_Dehazer1() {
    await (await this.VE_dehaze1).click();
    await browser.pause(700);
  }
  async Vid_Ediotr_Dehazer2() {
    await (await this.VE_dehaze2).click();
    await browser.pause(700);
  }
  async Vid_Ediotr_Dehazer3() {
    await (await this.VE_dehaze3).click();
    await browser.pause(700);
  }
  async Vid_Editor_Remove_Dehazer() {
    await (await this.VE_remove_dehaze).click();
  }
  async Click_Advance_Add() {
    await (await this.advance_add).click();
    await browser.pause(500);
  }
  async Select_Video() {
    await (await this.video).click();
  }

  async checkUploadedMedia() {
    // Check if a photo is uploaded and click Save
    const isSaveVisible = await this.done_save.isDisplayed();
    if (isSaveVisible) {
      console.log("Detected a photo upload. Clicking on the Save button.");
      await this.done_save.click();
    } else {
      // Check if a video is uploaded and click Export
      const isExportVisible = await this.export_vid.isDisplayed();
      if (isExportVisible) {
        console.log("Detected a video upload. Clicking on the Export button.");
        await this.export_vid.click();
      } else {
        console.log("Neither Save nor Export button is visible.");
      }
    }
  }

  async Verify_export(expected_export_text) {
    await this.export_text.waitForDisplayed();
    const actual_export_text = await this.export_text.getText();
    assert.strictEqual(
      actual_export_text,
      expected_export_text,
      "Export text not Asserted."
    );
  }

  async Open_dehazer() {
    await this.dehazer.click();
  }

  async select_img_tab() {
    await this.img_tab.click();
    await browser.pause(500);
  }

  async select_video_tab() {
    await this.video_tab.click();
  }

  async select_img1() {
    await this.img_1.click();
  }

  async click_sort() {
    await this.sort.click();
  }
  async Click_Dehaze2() {
    await this.dehaze2.waitForDisplayed();
    await this.dehaze2.click();
  }
  async Click_Dehaze3() {
    await this.dehaze3.waitForDisplayed();
    await this.dehaze3.click();
  }

  async Intensity_Reset_Btn() {
    await this.intensity_reset.click();
  }

  async Click_done_save() {
    await this.done_save.click();
  }

  async Click_export_done() {
    await this.export_done.click();
  }

  async Click_apply_dehazer() {
    await this.apply_dehazerr.click();
  }

  // async Check_export_progress() {
  //     console.log("Checking export progress...");

  //     let progress = 0;

  //     // Wait until the progress reaches 100%
  //     while (progress < 100) {
  //         // Get the text of the progress bar
  //         const progressText = await this.export_progress.getText();

  //         // Parse the progress percentage from the text
  //         progress = parseInt(progressText.replace('%', ''), 10);
  //         console.log(`Current progress: ${progress}%`);

  //         // Break if the progress reaches 100%
  //         if (progressText >= 100) {
  //             console.log("Export is complete!");
  //             break;
  //         }

  //         await browser.pause(1000);
  //     }

  //     console.log("Video successfully exported!");
  // }

  async Compare_Image() {
    await this.compare.longPress({ duration: 2000 });
  }
  async Minimize_Dehaze() {
    await this.hide_dehaze.click();
  }
  async Apply_Dehaze() {
    await this.done_btn.click();
  }
}

export default new Dehazer();
