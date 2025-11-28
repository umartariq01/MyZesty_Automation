import { $, browser } from "@wdio/globals";
import Photo_Editor_Locators from "../pageobjects/PE_Locators.page.js";
class Photo_Editor_Text {
  get photo_editor() {
    return $(
      '//android.widget.Button[@content-desc="photoeditor"]/android.view.ViewGroup/android.view.View'
    );
  }

  get done_button() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/done"]'
    );
  }
  get apply_changes() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
  }
  get cancel_changes() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/action_text"]'
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
  get expand() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/expand"]'
    );
  }
  get text_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Text"]'
    );
  }
  get bold() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/bold"]');
  }
  get italic() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/italic"]'
    );
  }
  get apply_text() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get dlt_text() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/delete_text"]'
    );
  }
  get serif_fonts() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/serif"]');
  }
  get sans_fonts() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/sans_serif"]'
    );
  }
  get display_fonts() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/display"]'
    );
  }
  get close_fonts() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/close"]');
  }
  get font_color() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/color_icon"]'
    );
  }
  get font_opacity() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/opacity_icon"]'
    );
  }
  get font_shadow() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/shadow_icon"]'
    );
  }
  get font_stroke() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/stroke_icon"]'
    );
  }
  get post() {
    return $('//android.view.View[@content-desc="Post"]');
  }
  get cancel_post() {
    return $('//android.widget.TextView[@text=""]');
  }
  get exit() {
    return $('//android.widget.TextView[@text="Exit"]');
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
  async Expand_Menu() {
    await this.expand.click();
  }
  async Click_Text_Tab() {
    await this.text_tab.click();
  }
  async Click_Bold() {
    await this.bold.click();
  }
  async Click_Italic() {
    await this.italic.click();
  }
  async Apply_Text() {
    await this.apply_text.click();
  }
  async Delete_Text() {
    await this.dlt_text.click();
  }
  async Open_All_Fonts() {
    await this.serif_fonts.click();
    await browser.pause(700);
    await this.sans_fonts.click();
    await browser.pause(700);
    await this.display_fonts.click();
  }
  async Close_Fonts_Menu() {
    await this.close_fonts.click();
  }
  async Click_Font_Color() {
    await this.font_color.click();
  }
  async Click_Font_Opacity() {
    await this.font_opacity.click();
  }
  async Click_Font_Shadow() {
    await this.font_shadow.click();
  }
  async Click_Font_Stroke() {
    await this.font_stroke.click();
  }

  async Handle_Post_Screen() {
    try {
      // Wait for post button to appear and check if it's visible
      const isPostVisible = await this.post.waitForDisplayed({ timeout: 5000 });

      if (isPostVisible) {
        console.log("Post screen appeared, clicking cancel post button...");

        // Click on cancel_post button
        await this.cancel_post.click();
        await browser.pause(1000);

        // Wait for exit button to appear and click it
        const isExitVisible = await this.exit.waitForDisplayed({
          timeout: 3000,
        });

        if (isExitVisible) {
          console.log("Exit button appeared, clicking exit...");
          await this.exit.click();
          await browser.pause(500);
          console.log("Successfully exited post screen");
        } else {
          console.log("Exit button did not appear after clicking cancel post");
        }
      } else {
        console.log("Post screen did not appear");
      }
    } catch (error) {
      console.log("Error handling post screen:", error.message);
    }
  }
}

export default new Photo_Editor_Text();
