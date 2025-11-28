import { $, browser } from "@wdio/globals";
import assert from "assert";

class Chroma {
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
  get chroma_img() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[2]');
  }
  get media_2() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[3]');
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
  get overlay_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Overlay"]'
    );
  }
  get go_back() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
    );
  }
  get chroma_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Chroma"]'
    );
  }
  get chroma_guide() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/info"]');
  }
  get guide_text() {
    return $('//android.widget.TextView[@text="How to use Chroma tool?"]');
  }
  get welcome_text() {
    return $(
      '//android.widget.Toast[@text="Pick the color that best matches the area you want to replace"]'
    );
  }
  get color_key() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/color_bg"])[2]'
    );
  }
  get bg_img() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_background"])[4]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get cancel_changes() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"]'
    );
  }
  get reset_chroma() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
  }
  get gallery_bg() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_background"])[1]'
    );
  }
  get color_picker() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/iv_canvas_background"]'
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
    await (await this.chroma_img).click();
  }
  async Select_Media_2() {
    await this.media_2.click();
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
  async Toolbar_Back() {
    await (await this.go_back).click();
  }
  async Click_Chroma_Tab() {
    await this.chroma_tab.click();
  }
  async Click_Chroma_Guide() {
    await this.chroma_guide.click();
  }
  async Verify_Help_Text() {
    const Actual_text = await this.guide_text.getText();
    assert.strictEqual(
      Actual_text,
      "How to use Chroma tool?",
      "Guide text do not match."
    );
    console.log("Chroma Guide text Verified.");
  }
  async Verify_Welcome_Tost() {
    const Actual_text = await this.welcome_text.getText();
    assert.strictEqual(
      Actual_text,
      "Pick the color that best matches the area you want to replace",
      "welcome toast text not asserted,"
    );
    console.log("Welcom Toast Text asserted successfully.");
  }
  async Select_Color_Key() {
    await this.color_key.click();
  }
  async Select_BG_Img() {
    await this.bg_img.click();
  }
  async Click_Apply_Changes() {
    await this.apply_changes.click();
  }
  async Click_Cancel_Changes() {
    await this.cancel_changes.click();
  }
  async Click_Reset_Chroma() {
    await this.reset_chroma.click();
  }
  async Select_Gallery_BG() {
    await this.gallery_bg.click();
  }
  async Select_Color_Picker() {
    await this.color_picker.click();
  }
}

export default new Chroma();
