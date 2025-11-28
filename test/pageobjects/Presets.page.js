import Common_function from "../pageobjects/commonfun.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import assert from "assert";
import { $, browser } from "@wdio/globals";

class Presets {
  get videoEditor() {
    return $(
      `//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View | //android.view.ViewGroup[@content-desc="Create, Video"]/android.view.ViewGroup/android.view.View`
    );
  }
  // get videoEditor() { return $('//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View | //android.view.ViewGroup[@content-desc="Create, Video"]/android.view.ViewGroup/android.view.View'); }
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
  get export() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/export"]'
    );
  }
  get export_done() {
    return $('//android.view.ViewGroup[@content-desc="Done"]');
  }

  get open_preset() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Presets"]'
    );
  }
  get preset1() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
  }
  get preset2() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[7]'
    );
  }
  get preset3() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[8]'
    );
  }
  get preset4() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[10]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get go_back() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
    );
  }
  get add() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
    );
  } // Add preset
  get remove_preset() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
  }
  get duplicate() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Duplicate"]'
    );
  }
  get edit() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Edit"]'
    );
  }
  get delete() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Delete"]'
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

  async Open_VideoEditor() {
    await (await this.videoEditor).click();
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
  async waitForElementVisible(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({
      timeout: timeout,
      timeoutMsg: `Element ${selector} not visible after ${timeout} ms`,
    });
    return element;
  }
  async Click_Advance_Add() {
    await (await this.advance_add).click();
    await browser.pause(500);
  }
  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Close_Project() {
    await (await this.close_project).click();
  }
  async Open_Draft_Proj() {
    await (await this.open_draft).click();
  }
  async Apply_Preset() {
    await this.open_preset.click();
  }

  async Apply_Preset1() {
    await this.preset1.click();
    await browser.pause(2000);
  }
  async Apply_Preset2() {
    await this.preset2.click();
    await browser.pause(2000);
  }
  async Apply_Preset3() {
    await this.preset3.click();
    await browser.pause(2000);
  }
  async Apply_Preset4() {
    await this.preset4.click();
    await browser.pause(2000);
  }
  async Click_Done_Btn() {
    await (await this.done_button).click();
    await browser.pause(2000);
  }
  async Apply_Changes() {
    await (await this.apply_changes).click();
  }
  async Toolbar_Back() {
    await (await this.go_back).click();
  }
  async Add_Preset() {
    await this.add.click();
  }
  async Remove_Presets() {
    await this.remove_preset.click();
  }
  async Duplicate_Preset() {
    await this.duplicate.click();
  }
  async Edit_Preset() {
    await this.edit.click();
  }
  async Delete_Preset() {
    await this.delete.click();
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
}

export default new Presets();
