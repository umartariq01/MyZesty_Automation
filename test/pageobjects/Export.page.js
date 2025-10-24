import assert from "assert";
import { $, browser } from "@wdio/globals";

class Export {
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

  //   =========== Export Settings ============

  get export_panel() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/quality"]'
    );
  }
  get apply_export_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get cancel_export_changes() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"]'
    );
  }
  get export_size() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/size"]');
  }
  get export_cancel() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/cancel_button"]'
    );
  }
  get cancel_export_warning() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/cancel_button_warn"]'
    );
  }
  get share_screen() {
    return $('//android.widget.TextView[@text="Instagram"]');
  }
  get main_screen() {
    return $('//android.view.ViewGroup[@content-desc="Back to the main menu"]');
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
  async Open_Export_Panel() {
    await this.export_panel.click();
  }
  async Apply_Export_Setting() {
    await this.apply_export_changes.click();
  }
  async Cancel_Export_Setting() {
    await this.cancel_export_changes.click();
  }
  async Cancel_Export() {
    await this.export_cancel.click();
  }
  async Confirm_cancel_Export() {
    const isVisible = await this.cancel_export_warning.isDisplayed();
    if (isVisible) {
      await this.cancel_export_warning.click();
    } else {
      console.log("Warning Popup do not appear!");
    }
  }
  async Main_screen_Navigate() {
    await this.main_screen.click();
  }
}

export default new Export();
