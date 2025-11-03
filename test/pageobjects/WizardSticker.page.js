import { $, browser } from "@wdio/globals";

class WizardSticker {
  get wizardEditor() {
    return $(
      `//android.widget.Button[@content-desc="wizardeditor"]/android.view.ViewGroup`
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
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get advance_add() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/addVideo"]'
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
  get go_back() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
    );
  }
  get wizard_popup() {
    return $('//android.widget.TextView[@text="Start Creating"]');
  }
  get sticker_tab() {
    return $(
      '//android.widget.LinearLayout[@resource-id="com.myzesty:id/sticker"]'
    );
  }
  get sticker_panel() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/title"]');
  }
  get sticker_guide() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/showGuide"]'
    );
  }

  async Open_WizardEditor() {
    await this.wizardEditor.click();
  }
  async Click_Img_Tab() {
    await this.images_tab.click();
  }
  async Click_Video_Tab() {
    await this.video_tab.click();
  }
  async Click_Advance_Add() {
    await this.advance_add.click();
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
  async Click_Done_Btn() {
    await this.done_button.click();
    await browser.pause(2000);
  }
  async Apply_Changes() {
    await this.apply_changes.click();
  }
  async Toolbar_Back() {
    await this.go_back.click();
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
  async Select_Media_1(index = 1) {
    const selector = `(//android.view.View[@resource-id="com.myzesty:id/hover"])[${index}]`;
    await $(selector).click();
  }
  async Verify_Wizard_PopUp() {
    const isVisible = await this.wizard_popup.isExisting();
    if (isVisible) {
      await this.wizard_popup.click();
    } else {
      console.log("Wizard Popup is not displayed.");
    }
  }
  async Click_Sticker_Tab() {
    await this.sticker_tab.click();
  }
  async Click_Sticker_Guide() {
    await this.sticker_guide.click();
  }
}

export default new WizardSticker();
