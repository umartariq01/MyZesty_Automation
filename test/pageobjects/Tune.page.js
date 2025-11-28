import Common_function from "../pageobjects/commonfun.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import { $, browser } from "@wdio/globals";

class Tune {
  // Locators

  get videoEditor() {
    return $(
      `//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View | //android.view.ViewGroup[@content-desc="Create, Video"]/android.view.ViewGroup/android.view.View`
    );
  }
  get video_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Videos"]'
    );
  }
  get images_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Images"]'
    );
  }
  get media_1() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[1]');
  }
  get vidoe1() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[2]');
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
    return $('//android.widget.TextView[@text="Export"]');
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

  get tune_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Tune"]'
    );
  }
  get tune_magic() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Magic"]'
    );
  }
  get tune_brightness() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Brightness"]'
    );
  }
  get tune_contrast() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Contrast"]'
    );
  }
  get tune_saturation() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Saturation"]'
    );
  }
  get tune_tint() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Tint"]'
    );
  }
  get tune_temperature() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Temperature"]'
    );
  }
  get tune_hue() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Hue"]'
    );
  }
  get tune_highlight() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Highlight"]'
    );
  }
  get tune_shadow() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Shadow"]'
    );
  }
  get tune_vibrance() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Vibrance"]'
    );
  }
  get tune_sharpen() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/name" and @text="Sharpen"]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get remove_tune() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
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
  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Done_Btn() {
    await (await this.done_button).click();
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
  async Click_Tune_Tab() {
    await this.tune_tab.click();
  }
  async Click_Tune_Magic() {
    await this.tune_magic.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.6);
  }
  async Click_Tune_Brightness() {
    await this.tune_brightness.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.8);
  }
  async Click_Tune_Contrast() {
    await this.tune_contrast.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 1);
  }
  async Click_Tune_Saturation() {
    await this.tune_saturation.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.6);
  }
  async Click_Tune_Tint() {
    await this.tune_tint.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.4);
  }

  async Click_Tune_Temperature() {
    await this.tune_temperature.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.4);
  }
  async Click_Tune_Hue() {
    await this.tune_hue.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.7);
  }
  async Click_Tune_Highlight() {
    await this.tune_highlight.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.6);
  }
  async Click_Tune_Shadow() {
    await this.tune_shadow.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.3);
  }
  async Click_Tune_Vibrance() {
    await this.tune_vibrance.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.8);
  }
  async Click_Tune_Sharpen() {
    await this.tune_sharpen.click();
    await Sliders.Slider(driver, 222, 914, 2024, 2134, 0.8);
  }
  async Click_Apply_Changes() {
    await this.apply_changes.click();
  }
  async Remove_Tune_Effects() {
    await this.remove_tune.click();
  }
}

export default new Tune();
