import Common_function from "../pageobjects/commonfun.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import { $, browser } from "@wdio/globals";

class Stickers {
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

  get sticker() {
    return $('//android.widget.TextView[@text="Add Sticker"]');
  }
  get christmas_category() {
    return $(
      '//android.widget.TextView[@text="Christmas"]'
    );
  }
  get sticker1() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_image"])[2]'
    );
  }
  get sticker2() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_image"])[3]'
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
  get VE_edit_sticker() {
    return $('//android.widget.TextView[@text="Edit Sticker"]');
  }
  get VE_add_sticker() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
    );
  }
  get zoom_in_sticker() {
    return $(
      '(//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"])[1]'
    );
  }
  get sticker_animation() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Animation"]'
    );
  }
  get intro_animation() {
    return $('//android.widget.LinearLayout[@content-desc="Intro"]');
  }
  get intro_slide_right() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
  }
  get outro_animation() {
    return $('//android.widget.LinearLayout[@content-desc="Outro"]');
  }
  get outro_glitch() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[2]'
    );
  }
  get loop_animation() {
    return $('//android.widget.LinearLayout[@content-desc="Loop"]');
  }
  get loop_float() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
  }
  get apply_animation() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get edit_sticker() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Edit"]'
    );
  }
  get duplicate_sticker() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Duplicate"]'
    );
  }
  get delete_sticker() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Delete"]'
    );
  }
  get remove_animation() {
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
  async Add_Sticker() {
    await this.sticker.click();
  }
  async Select_Christmas_Category() {
    await this.christmas_category.click();
  }
  async Select_Sticker1() {
    await this.sticker1.click();
    
    // await browser.pause(2000);
  }
  async Select_Sticker2() {
    await this.sticker2.click();
    
    // await browser.pause(2000);
  }
  async Apply_Changes() {
    await this.apply_changes.click();
  }
  async Toolbar_Back() {
    await (await this.go_back).click();
  }
  async Click_Edit_Sticker() {
    await this.VE_edit_sticker.click();
  }
  async VE_Add_More_Sticker() {
    await this.VE_add_sticker.click();
  }
  async Zoom_In() {
    await this.zoom_in_sticker.zoom({ duration: 2000, scale: 0.8 });
  }
  async Click_Animation() {
    await this.sticker_animation.click();
  }
  async Apply_Into_Animation() {
    await this.intro_animation.click();
    await this.intro_slide_right.click();
  }
  async Apply_Outro_Animation() {
    await this.outro_animation.click();
    await browser.pause(500);
    await this.outro_glitch.click();
  }
  async Apply_Loop_Animation() {
    await this.loop_animation.click();
    await browser.pause(500);
    await this.loop_float.click();
  }
  async Apply_Animations() {
    await this.apply_animation.click();
  }
  async Edit_Applied_Sticker() {
    await this.edit_sticker.click();
  }
  async Duplicate_Sticker() {
    await this.duplicate_sticker.click();
  }
  async Delete_Sticker() {
    await this.delete_sticker.click();
  }
  async Remove_Animations() {
    await this.remove_animation.click();
  }
  async Export_Media() {
    await this.export.click();
  }
  async Export_Done_Btn() {
    const isVisible = await this.export_done.isDisplayed();
    if (isVisible) {
      await this.export_done.click();
    } else {
      console.log("Done button not Visible.");
    }
  }
async  selectStickerIfNotDownloaded(stickerXpath) {
    const sticker = await $(stickerXpath);

    // Wait for element to appear
    await sticker.waitForDisplayed({ timeout: 10000 });

    // Get the 'selected' attribute
    const isSelected = await sticker.getAttribute('selected');

    if (isSelected === 'true') {
        console.log("✅ Sticker already downloaded/selected.");
    } else {
        console.log("⬇️ Sticker not downloaded, selecting now...");
        await sticker.click();

        // Wait until it becomes selected
        await driver.waitUntil(async () => {
            const state = await sticker.getAttribute('selected');
            return state === 'true';
        }, {
            timeout: 20000,
            timeoutMsg: '❌ Sticker did not change to selected=true within 20s',
        });

        console.log("✅ Sticker successfully selected/downloaded.");
    }
}

}

export default new Stickers();
