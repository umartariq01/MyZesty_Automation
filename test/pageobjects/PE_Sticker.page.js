import { $, browser } from "@wdio/globals";
import Photo_Editor_Locators from "../pageobjects/PE_Locators.page.js";


class Photo_Editor_Sticker {
  async expandMenu() {
    await Photo_Editor_Locators.expand.click();
  }

  async Click_Sticker_Tab() {
    await Photo_Editor_Locators.sticker_tab.click();
  }

  async Click_Sticker_Search_Bar() {
    await Photo_Editor_Locators.sticker_search_bar.click();
  }

  async Search_Sticker() {
    await Photo_Editor_Locators.sticker_suggestion.click();
  }

  async Click_Sticker_Back_Button() {
    await Photo_Editor_Locators.sticker_back_btn.click();
  }
  async Click_Apply_Changes() {
    await Photo_Editor_Locators.apply_Changes.click();
  }

  async Close_Keyboard() {
    try {
      // Hide keyboard by pressing back or escape
      await driver.hideKeyboard();
    } catch (error) {
      // If hideKeyboard doesn't work, try pressing back button
      try {
        await driver.pressKeyCode(4); // Android back button
      } catch (e) {
        console.log("Keyboard already closed or no keyboard to close");
      }
    }
  }

  async Click_Recent_Used_Sticker() {
    // Close keyboard first before clicking recent used sticker
    await this.Close_Keyboard();
    await browser.pause(500); // Small pause to ensure keyboard is closed
    await Photo_Editor_Locators.recent_used_sticker.click();
  }

  async Click_Sticker_Category_Tab() {
    await Photo_Editor_Locators.sticker_category_tab.click();
  }

  async Click_Add_More_Sticker() {
    await Photo_Editor_Locators.add_more_sticker.click();
  }

  async Click_Delete_Sticker() {
    await Photo_Editor_Locators.delete_sticker.click();
  }

  async Check_Recent_Sticker_List() {
    try {
      // First check how many stickers are available
      const allStickers = await $$(
        '//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"]'
      );
      const stickerCount = allStickers.length;

      console.log(`📊 Found ${stickerCount} sticker(s) in recent list`);

      if (stickerCount === 0) {
        console.log("❌ No recent stickers found in the list");
        return false;
      }

      // Handle single sticker (no index needed)
      if (stickerCount === 1) {
        const singleSticker = $(
          '//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"]'
        );
        // await singleSticker.click();
        console.log("✅ Single recent sticker found and clicked");
        return true;
      }

      // Handle multiple stickers (use index [1] for first sticker)
      if (stickerCount > 1) {
        const firstSticker = $(
          '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[1]'
        );
        // await firstSticker.click();
        console.log(
          `✅ Multiple recent stickers found (${stickerCount}), clicked first one`
        );
        return true;
      }
    } catch (error) {
      console.log("❌ Error checking recent sticker list:", error.message);
      return false;
    }
  }

  async Handle_Post_Screen() {
    try {
      // Wait for post button to appear and check if it's visible
      const isPostVisible = await Photo_Editor_Locators.post.waitForDisplayed({ timeout: 5000 });

      if (isPostVisible) {
        console.log("Post screen appeared, clicking cancel post button...");

        // Click on cancel_post button
        await Photo_Editor_Locators.cancel_post.click();
        await browser.pause(1000);

        // Wait for exit button to appear and click it
        const isExitVisible = await Photo_Editor_Locators.exit.waitForDisplayed({
          timeout: 3000,
        });

        if (isExitVisible) {
          console.log("Exit button appeared, clicking exit...");
          await Photo_Editor_Locators.exit.click();
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
export default new Photo_Editor_Sticker();
