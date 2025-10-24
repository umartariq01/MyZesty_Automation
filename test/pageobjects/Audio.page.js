import { $, browser } from "@wdio/globals";
import Common_function from "../pageobjects/commonfun.page.js";

class Audio {
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
  get backButton() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
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
  get export() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/export"]'
    );
  }
  get export_done() {
    return $('//android.view.ViewGroup[@content-desc="Done"]');
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
  get add_audio() {
    return $('//android.widget.TextView[@text="Add Audio"]');
  }
  get VE_add_audio() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
    );
  }
  get record_audio() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Record"]'
    );
  }
  get start_stop_record() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/record_button"]'
    );
  }
  get apply_audio() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get extraxt() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Extract"]'
    );
  }
  get fade_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Fade"]'
    );
  }
  get volume_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Volume"]'
    );
  }
  get replace() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Replace"]'
    );
  }
  get trim_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Trim"]'
    );
  }
  get delete() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Delete"]'
    );
  }
  get mute_unmute() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/image"]');
  }
  get denoise_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="DeNoise"]'
    );
  }
  get denoise_now() {
    return $('//android.widget.TextView[@text="DeNoise Now"]');
  }

  async Open_VideoEditor() {
    await (await this.videoEditor).click();
  }
  async Click_Img_Tab() {
    await (await this.images_tab).click();
  }
  async Click_Video_Tab() {
    await (await this.video_tab).click();
  }
  async Select_Media_1(index = 1) {
    const selector = `(//android.view.View[@resource-id="com.myzesty:id/hover"])[${index}]`;
    await $(selector).click();
  }
  async Click_Advance_Add() {
    await (await this.advance_add).click();
    await browser.pause(500);
  }
  async Click_Close_Project() {
    await (await this.close_project).click();
  }
  async Open_Draft_Proj() {
    await (await this.open_draft).click();
  }
  async Export_Media() {
    await this.export.click();
  }
  async Export_Done_Btn() {
    const isVisible = await this.export_done.waitForDisplayed();
    if (isVisible) {
      await this.export_done.click();
    } else {
      console.log("Done Button not visible.");
    }
  }
  async Toolbar_Back() {
    await (await this.backButton).click();
  }
  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Done_Btn() {
    await (await this.done_button).click();
  }
  async Click_Add_Audio() {
    await this.add_audio.click();
  }
  async Click_VE_Add_Audio() {
    await this.VE_add_audio.click();
  }
  async Click_Record() {
    await this.record_audio.click();
  }
  async Click_Start_Stop_Record() {
    await this.start_stop_record.click();
  }
  async Click_Apply_Audio() {
    await this.apply_audio.click();
  }
  async Extract_Audio() {
    await this.extraxt.click();
  }
  async Click_Fade_Tab() {
    await this.fade_tab.click();
  }
  async Click_Volume_Tab() {
    await this.volume_tab.click();
  }
  async Replace_Audio() {
    await this.replace.click();
  }
  async Click_Trim_Tab() {
    await this.trim_tab.click();
  }
  async Delete_Audio() {
    await this.delete.click();
  }
  async Click_Mute_Unmute() {
    await this.mute_unmute.click();
  }
  async Click_Denoise_Tab() {
    await this.denoise_tab.click();
  }
  async Click_Denoise_Now() {
    await this.denoise_now.click();
  }
  async waitAndClickOrFallback(primarySelector, fallbackSelector) {
    const timeout = 2 * 60 * 1000; // 2 minutes in milliseconds
    let isVisible = false;
    try {
      await browser.waitUntil(async () => {
        return await $(primarySelector).isDisplayed();
      }, {
        timeout: timeout,
        timeoutMsg: `Element ${primarySelector} not visible after 2 minutes.`,
        interval: 500
      });
      isVisible = true;
    } catch (e) {
      isVisible = false;
    }
    if (isVisible) {
      console.log('Audio Denoised uccessfully.');
    } else {
      await $(fallbackSelector).click();
      console.log("Audio not denoised in 2minutes!");
    }
  }
}

export default new Audio();
