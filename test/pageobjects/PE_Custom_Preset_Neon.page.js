import { $, browser } from "@wdio/globals";
import Logger from "./Logs.page.js";

class PE_Custom_Preset_Neon_Dehazer_Color {
  get photo_editor() {
    return $(
      '//android.widget.Button[@content-desc="photoeditor"]/android.view.ViewGroup/android.view.View'
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
  get preset() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Presets"]'
    );
  }

  async Open_PhotoEditor() {
    await this.photo_editor.click();
  }

  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Cancel_Changes() {
    await this.cancel_changes.click();
  }
  async Apply_Changes() {
    await this.apply_changes.click();
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
  async Click_Preset() {
    await this.preset.click();
  }
}


export default new PE_Custom_Preset_Neon_Dehazer_Color();
