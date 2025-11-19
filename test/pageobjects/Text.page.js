import { $, browser } from "@wdio/globals";

class Text {
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
  get export() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/export"]'
    );
  }
  get export_done() {
    return $('//android.widget.Button[@resource-id="com.myzesty:id/btn_done"]');
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

  get add_text() {
    return $('//android.widget.TextView[@text="Add Text"]');
  }
  get VE_add_text() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
    );
  }
  get text_area() {
    return $(
      '//android.widget.EditText[@resource-id="com.myzesty:id/edit_text_area"]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get font_style() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
  }
  get color_tab() {
    return $('//android.widget.TextView[@text="Color"]');
  }
  get style_tab() {
    return $('//android.widget.TextView[@text="Style"]');
  }
  get bold() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/bold"]');
  }
  get italic() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/italic"]'
    );
  }
  get stroke_tab() {
    return $('//android.widget.TextView[@text="Stroke"]');
  }
  get label_tab() {
    return $('//android.widget.TextView[@text="Label"]');
  }
  get label_1() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/background"]'
    );
  }
  get VE_label_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Label"]'
    );
  }
  get reset_changes() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_changes"]'
    );
  }
  get backButton() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
    );
  }
  get edit_text() {
    return $('//android.widget.TextView[@text="Edit Text"]');
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
  async Click_Add_Text() {
    await this.add_text.click();
  }
  async VE_Add_Text() {
    await this.VE_add_text.click();
  }
  async Enter_Text() {
    await this.text_area.click();
    await browser.keys("Hello.");
  }
  async Click_Apply_Changes() {
    await this.apply_changes.click();
  }
  async Apply_Font_Style() {
    await this.font_style.click();
    await browser.pause(1000);
  }
  async Click_Color_Tab() {
    await this.color_tab.click();
  }
  async Click_Style_Tab() {
    await this.style_tab.click();
  }
  async Click_Bold() {
    await this.bold.click();
  }
  async Click_Italic() {
    await this.italic.click();
  }
  async Click_Stroke_Tab() {
    await this.stroke_tab.click();
  }
  async Click_Label_Tab() {
    await this.label_tab.click();
  }
  async Select_Label() {
    await this.label_1.click();
  }
  async Click_VE_Label_Tab() {
    await this.VE_label_tab.click();
  }
  async Reset_Changes_Btn() {
    await this.reset_changes.click();
  }
  async Click_Edit_Text() {
    await this.edit_text.click();
  }
}

export default new Text();
