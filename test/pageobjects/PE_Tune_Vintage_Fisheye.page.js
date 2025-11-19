import { $, browser } from "@wdio/globals";
import Logger from "./Logs.page.js";

class PE_Tune_Vintage_Fisheye {
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
  get advance_add() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/addVideo"]'
    );
  }
  get cancel_changes() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"]'
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
  get tune_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Tune"]'
    );
  }
  get brightness() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/brightness_text"]'
    );
  }
  get contrast() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/contrast_text"]'
    );
  }
  get saturation() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/saturation_text"]'
    );
  }
  get hue() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/hue_text"]'
    );
  }
  get shadow() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/shadow_text"]'
    );
  }
  get vibrance() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/vibrance_text"]'
    );
  }
  get intensity() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/reset"]');
  }
  get expand_toolbar() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/expand"]'
    );
  }
  get vintage() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Vignette"]'
    );
  }
  get outer_intensity() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/outer_progress"]'
    );
  }
  get inner_intensity() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/inner_progress"]'
    );
  }
  get transition() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/transition_progress"]'
    );
  }
  get square() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/square_icon"]'
    );
  }
  get rectangular() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/rectangle_icon"]'
    );
  }
  get ellipse() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/oval_icon"]'
    );
  }
  get fisheye() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Fisheye"]'
    );
  }
  get fisheye_intensity() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/intensity_text"]'
    );
  }
  get fisheye_radius() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/radius_text"]'
    );
  }
  get fisheye_rotation() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/rotation_text"]'
    );
  }
  get post() {
    return $('//android.view.View[@content-desc="Post"]');
  }
  get cancel_post() {
    return $('//android.widget.TextView[@text=""]');
  }

  get exit() {
    return $('//android.widget.Button[@content-desc="error-ok-button"]');
  }

  async Open_PhotoEditor() {
    await this.photo_editor.click();
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
  async CLick_Tune_Tab() {
    await this.tune_tab.click();
  }

  async Click_Tune_Options(colorXPaths = [], sliderParams = null) {
    // Array.isArray(value) is a built-in JS method.
    if (!Array.isArray(colorXPaths) || colorXPaths.length === 0) {
      throw new Error("Click_Tune_Tabs: please pass an array of xpaths.");
    }

    for (const colorXpath of colorXPaths) {
      // Click on the given element
      const el = await $(colorXpath);
      await el.click();
      await browser.pause(500);

      // Adjust slider if parameters are provided
      if (sliderParams) {
        const { startX, endX, startY, endY, percentage } = sliderParams;
        await Slider.Slider(startX, endX, startY, endY, percentage);
        // or: await this.Adjust_Color_Slider(startX, startY, endX, endY, percentage);
      }

      await browser.pause(800);
    }
  }
  async Click_Brightness() {
    await this.brightness.click();
  }
  async Click_Contrast() {
    await this.contrast.click();
  }
  async Click_Saturation() {
    await this.saturation.click();
  }
  async Click_Hue() {
    await this.hue.click();
  }
  async Click_Shadow() {
    await this.shadow.click();
  }
  async Click_Vibrance() {
    await this.vibrance.click();
  }
  async Reset_Intensity() {
    await this.intensity.click();
  }
  async Expand_Menu() {
    await this.expand_toolbar.click();
  }
  async Cick_Vintage_Tab() {
    await this.vintage.click();
  }
  async Click_Square_Shape() {
    await this.square.click();
  }
  async Click_Rectangular_Shape() {
    await this.rectangular.click();
  }
  async Click_Ellipse_Shape() {
    await this.ellipse.click();
  }
  async Click_Fisheye_Tab() {
    await this.fisheye.click();
  }
  async Click_Fisheye_Intensity_Tab() {
    await this.fisheye_intensity.click();
  }
  async Click_Fisheye_Radius_Tab() {
    await this.fisheye_radius.click();
  }
  async Click_Fisheye_Rotation_Tab() {
    await this.fisheye_rotation.click();
  }
  async Cancel_Post_Media() {
    const isVisible = await this.post.isDisplayed();
    const exitVisible = await this.exit.isDisplayed();
    if (isVisible) {
      await browser.pause(600);
      await this.cancel_post.click();
      if (exitVisible) {
        await browser.pause(700);
        await this.exit.click();
      } else {
        console.log("Exit button is not visible.");
      }
    } else {
      consolelog("Post button is not visible.");
    }
  }
}

export default new PE_Tune_Vintage_Fisheye();
