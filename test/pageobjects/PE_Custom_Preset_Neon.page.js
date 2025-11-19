import { $, browser } from "@wdio/globals";
import Logger from "./Logs.page.js";
import Slider from "../pageobjects/Slider.page.js";
import Common_function from "../pageobjects/commonfun.page.js";

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
  get erase() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/eraser"]'
    );
  }
  get erase_size() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/size"]');
  }
  get erase_feather() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/feather"]'
    );
  }
  get erase_opacity() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/opacity"]'
    );
  }
  get custom_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Custom"]'
    );
  }
  get info_popup() {
    return $('//android.widget.TextView[@text="How to use?"]');
  }
  get close_info_popup() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/close_help"]'
    );
  }
  get reset_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/reset"]');
  }
  get empty_library() {
    return $(
      '//android.widget.TextView[@text="You haven\'t saved any presets yet!"]'
    );
  }
  get saved_preset() {
    return $(
      '(//android.widget.LinearLayout[@resource-id="com.myzesty:id/custom_container"])[1]'
    );
  }
  get save_preset() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/save_cg"]'
    );
  }
  get text_area() {
    return $(
      '//android.widget.EditText[@resource-id="com.myzesty:id/edit_text"]'
    );
  }
  get expand_menu() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/expand"]'
    );
  }
  get neon() {
    return $(
      `//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Neon"]`
    );
  }
  get neon_fade_value() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/intensity_text"]'
    );
  }
  get dehazer_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Dehazer"]'
    );
  }
  get dehazer_1() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/presetName" and @text="Dehaze 1"]'
    );
  }
  get color_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Color"]'
    );
  }
  get magic_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Magic"]'
    );
  }
  get save_media() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
  }
  get post_media() {
    return $('//android.view.View[@content-desc="Post"]');
  }
  get cancel_share() {
    return $('//android.view.ViewGroup[@content-desc=""]');
  }
  get exit_confirmation() {
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
  async Click_Erase() {
    await this.erase.click();
  }
  async Erase_From_To(startX, startY, endX, endY) {
    try {
      await driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: startX, y: startY },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration: 800, x: endX, y: endY },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      await driver.releaseActions();
      console.log("🧹 Single-line erase completed.");
    } catch (error) {
      console.error("Erase error:", error);
    }
  }

  get undo() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/undo"]');
  }
  get redo() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/redo"]');
  }
  async Undo_changes() {
    try {
      while ((await this.undo.getAttribute("clickable")) === "true") {
        await this.undo.click();
        await browser.pause(500);
      }
    } catch (error) {
      console.log("Error while undoing changes:", error.message);
    }
  }

  async Redo_changes() {
    try {
      while ((await this.redo.getAttribute("clickable")) === "true") {
        await this.redo.click();
        await browser.pause(500);
      }
    } catch (error) {
      console.log("Error while redoing changes:", error.message);
    }
  }
  async Click_Custom_Tab() {
    await this.custom_tab.click();
  }
  async Is_Info_Popup_Visible() {
    const isVisible = await this.info_popup.isDisplayed();
    if (isVisible) {
      Logger.logInfo("Info popup is visible.");
      await this.close_info_popup.click();
    } else {
      Logger.logInfo("Info popup is not visible.");
    }
  }
  async Click_reset_Changes() {
    await this.reset_changes.click();
  }
  async Save_Preset() {
    await this.save_preset.click();
  }
  async Enter_Preset_Name(name) {
    await this.text_area.setValue(name);
  }
  async Click_Expand_Menu() {
    await this.expand_menu.click();
  }
  async Click_Neon_Tab() {
    await this.neon.click();
  }
  async Click_Dehazer_Tab() {
    await this.dehazer_tab.click();
  }
  async Click_Color_Tab() {
    await this.color_tab.click();
  }

  async Click_Color_And_Adjust_Slider(colorCount = 3, sliderParams = null) {
    for (let i = 1; i <= colorCount; i++) {
      // Click on color element with incrementing index
      const colorXpath = `(//android.widget.FrameLayout[@resource-id="com.myzesty:id/color"])[${i}]`;
      await $(colorXpath).click();
      await browser.pause(500);

      // Adjust slider if parameters are provided
      if (sliderParams) {
        const { startX, endX, startY, endY, percentage } = sliderParams;
        await Slider.Slider(startX, endX, startY, endY, percentage);
        // await this.Adjust_Color_Slider(startX, startY, endX, endY, percentage);
      }

      await browser.pause(800);
    }
  }
  async Click_Magic_Tab() {
    await this.magic_tab.click();
  }
  async Click_Save_Media() {
    await this.save_media.click();
  }
  async Discard_Post_Screen() {
    const isVisible = await Common_function.waitForElementToBeVisible(
      '//android.widget.TextView[@text="Add images/videos"]'
    );
    if (isVisible) {
      await Common_function.waitForElementToBeVisible(
        '//android.widget.TextView[@text="Add images/videos"]'
      );

      // Keep clicking cancel_share button until exit_confirmation becomes visible
      let exitConfirmationVisible = false;
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loop

      while (!exitConfirmationVisible && attempts < maxAttempts) {
        try {
          await this.cancel_share.click();
          await browser.pause(1000);

          // Check if exit_confirmation button is now visible
          exitConfirmationVisible = await this.exit_confirmation.isDisplayed();

          if (!exitConfirmationVisible) {
            console.log(
              `Attempt ${
                attempts + 1
              }: Exit confirmation not visible yet, clicking cancel_share again...`
            );
          }

          attempts++;
        } catch (error) {
          console.log(
            `Error clicking cancel_share on attempt ${attempts + 1}:`,
            error.message
          );
          break;
        }
      }

      if (exitConfirmationVisible) {
        await this.exit_confirmation.click();
        console.log(
          "Successfully clicked exit confirmation after",
          attempts,
          "attempts"
        );
      } else {
        console.log(
          "Exit confirmation button did not become visible after",
          maxAttempts,
          "attempts"
        );
      }
    } else {
      console.log("Post screen not visible.");
    }
  }
  async Click_Cancel_Share() {
    await this.cancel_share.click();
  }
  async Click_Exit() {
    await this.exit_confirmation.click();
  }
}

export default new PE_Custom_Preset_Neon_Dehazer_Color();
