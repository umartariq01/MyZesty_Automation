import { $, browser } from "@wdio/globals";
import assert from "assert";
import Slider from "../pageobjects/Slider.page.js";

class Edit {
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

  get edit_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Edit"]'
    );
  }
  get delete_media() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Delete"]'
    );
  }
  get delete_toast() {
    return $('//android.widget.Toast[@text="Can\'t delete the last clip."]');
  }
  get media_duration() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Duration"]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get BG() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="BG"]'
    );
  }
  get apply_all() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/btnApplyToAll"]'
    );
  }
  get gallery_BG() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_canvas_background"])[3]'
    );
  }
  get remove_BG() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/iv_canvas_background"])[1]'
    );
  }
  get H_flip() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Flip H"]'
    );
  }
  get V_flip() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Flip V"]'
    );
  }
  get rotate() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Rotate"]'
    );
  }
  get fill_option() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Fill"]'
    );
  }
  get fit_option() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Fit"]'
    );
  }
  get duplicate() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Duplicate"]'
    );
  }
  get duplicate_toast() {
    return $('//android.widget.Toast[@text="The clip is duplicated"]');
  }
  get trim() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Trim"]'
    );
  }
  get split() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Split"]'
    );
  }
  get split_toast() {
    return $(
      '//android.widget.Toast[@text="Split duration must be at least 2 seconds."]'
    );
  }
  get volume() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Volume"]'
    );
  }
  get media_speed() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Speed"]'
    );
  }
  get curve_speed_tab() {
    return $('//android.widget.TextView[@text="Curve"]');
  }
  get graph_curve() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/curve_img"])[4]'
    );
  }
  get remove_curve_speed() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/curve_img"])[1]'
    );
  }
  get reverse() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Reverse"]'
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
  async Click_Edit_Tab() {
    await this.edit_tab.click();
  }
  async Click_Delete_Media() {
    await this.delete_media.click();
  }
  async Assert_Dlt_Text() {
    const actual_text = await this.delete_toast.getText();
    assert.strictEqual(
      actual_text,
      "Can't delete the last clip.",
      "Delete media text not asserted!"
    );
    console.log("Delete media text Asserted successfully.");
  }
  async Click_Media_Duration() {
    await this.media_duration.click();
  }
  async Click_Apply_Changes() {
    await this.apply_changes.click();
  }
  async Apply_BG() {
    await this.BG.click();
  }
  async Apply_BG_by_index(index) {
    const selector = `(//android.widget.ImageView[@resource-id="com.myzesty:id/color_bg"])[${index}]`;
    await $(selector).click();
  }
  async Click_Apply_All() {
    await this.apply_all.click();
  }
  async Click_Gallery_BG() {
    await this.gallery_BG.click();
  }
  async Click_Remove_BG() {
    await this.remove_BG.click();
  }
  async Apply_H_Flip() {
    await this.H_flip.click();
  }
  async Apply_V_Flip() {
    await this.V_flip.click();
    await browser.pause(500);
    await this.V_flip.click();
  }
  async Click_Rotate() {
    await this.rotate.click();
  }
  async Apply_Fill() {
    await this.fill_option.click();
  }

  async Apply_Fit() {
    await this.fit_option.click();
  }
  async Click_Duplicate() {
    await this.duplicate.click();
  }
  async Assert_Duplicate_Toast() {
    const actual_text = await this.duplicate_toast.getText();
    assert.strictEqual(
      actual_text,
      "The clip is duplicated",
      "Duplicate toast not Asserted!"
    );
    console.log("Duplicate Toast asserted successfully!...");
  }
  async Trim_Media() {
    await this.trim.click();
  }
  async Split_Media() {
    await this.split.click();
  }
  async Assert_Split_Duration_Toast() {
    const actual_text = await this.split_toast.getText();
    assert.strictEqual(
      actual_text,
      "Split duration must be at least 2 seconds.",
      "Split duration toast Mismatched!"
    );
    console.log("Split duration toast Matched successfully.");
  }
  async splitMultipleTimes(splitCount, scrollPositions) {
    for (let i = 0; i < splitCount; i++) {
      const [startX, startY, endX, endY] =
        scrollPositions[i] || scrollPositions[0];
      await Slider.scrollScreen(startX, startY, endX, endY);
      await this.Split_Media();
      await browser.pause(600);
    }
  }
  async Click_Volume() {
    await this.volume.click();
  }
  async Select_Media_Speed() {
    await this.media_speed.click();
  }
  async Apply_Curve_Speed() {
    await this.curve_speed_tab.click();
  }
  async Select_Graph_1() {
    await this.graph_curve.click();
  }
  async Reset_Speed() {
    await this.remove_curve_speed.click();
  }
  async Reverse_Media() {
    await this.reverse.click();
  }
}

export default new Edit();
