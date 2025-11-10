import { $, browser } from "@wdio/globals";
import Slider from "../pageobjects/Slider.page.js";

class WizardAudio {
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
  get audio_tab() {
    return $(
      '//android.widget.LinearLayout[@resource-id="com.myzesty:id/audio"]'
    );
  }
  get add_music() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/addMusic"]'
    );
  }
  get record() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/record"]');
  }
  get start_stop_record() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/record_button"]'
    );
  }
  get audio_toggle() {
    return $(
      '//android.widget.Switch[@resource-id="com.myzesty:id/switch_mute"]'
    );
  }
  get play_preview() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/item_play"])[1]'
    );
  }
  get delete_audio() {
    return $(
      '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/list"]/android.widget.LinearLayout/android.widget.ImageView[2]'
    );
  }
  get apply_audio() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/done"])[2]'
    );
  }
  get cancel_recording() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"])[2]'
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
  async Click_Audio_Tab() {
    await this.audio_tab.click();
  }
  async Click_Audio_Toggle() {
    await this.audio_toggle.click();
  }
  async Click_Add_Music() {
    await this.add_music.click();
  }
  async Delete_Audio() {
    await this.delete_audio.click();
  }
  async Click_Record() {
    await this.record.click();
  }
  async Apply_Audio_Changes() {
    await this.apply_audio.click();
  }
  async Cancel_Recorded_Audio() {
    await this.cancel_recording.click();
  }

  async Click_Start_Stop_Record() {
    try {
      // Wait for the record element to be displayed
      await this.start_stop_record.waitForDisplayed({ timeout: 5000 });

      // Get the element coordinates
      const location = await this.start_stop_record.getLocation();
      const size = await this.start_stop_record.getSize();

      // Calculate center coordinates
      const centerX = location.x + Math.floor(size.width / 2);
      const centerY = location.y + Math.floor(size.height / 2);

      console.log(`Record element coordinates: x=${centerX}, y=${centerY}`);
      console.log(`Record element location: x=${location.x}, y=${location.y}`);
      console.log(
        `Record element size: width=${size.width}, height=${size.height}`
      );

      // Click on the element using coordinates
      await browser.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: centerX, y: centerY },
            { type: "pointerDown", button: 0 },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      console.log("✅ Successfully clicked on Record button using coordinates");
      await browser.pause(500);
    } catch (error) {
      console.log(`❌ Error clicking Record button: ${error.message}`);

      // Fallback: try direct element click
      try {
        await this.start_stop_record.click();
        console.log("✅ Fallback: Successfully clicked Record button directly");
      } catch (fallbackError) {
        console.log(`❌ Fallback also failed: ${fallbackError.message}`);
        throw fallbackError;
      }
    }
  }

  async HandlePreviewPlayPause() {
    const xpath =
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/item_play"])[1]';

    const el = await $(xpath);
    await el.waitForDisplayed({ timeout: 5000 });

    // read the `selected` attribute
    const isSelected = await el.getAttribute("selected"); // "true" / "false"

    if (isSelected === "false") {
      console.log("Preview is currently stopped. Starting playback...");
      await el.click(); // start playing
      await browser.pause(4000); // wait 4 seconds
      await el.click(); // stop playback
      console.log("Preview playback stopped after 4 seconds.");
    } else {
      console.log("Preview is already playing. No action needed.");
    }
  }
  async validateCategories(
    categories = ["Retro", "VHS", "Glitch", "Film", "Light", "Color", "Blur"],
    {
      shouldClick = true,
      // 👇 you can override these coordinates when calling
      scrollY = 1664, // swipe Y line
      rightToLeft = { startX: 969, endX: 180 }, // RTL swipe
      leftToRight = { startX: 180, endX: 969 }, // LTR swipe
      maxScrollAttempts = 5,
    } = {}
  ) {
    console.log("🎬 Starting effect categories validation...");

    const results = {
      found: [],
      notFound: [],
      totalCategories: categories.length,
    };

    // keep same structure/names
    const scrollConfigs = { rightToLeft, leftToRight };

    for (const category of categories) {
      console.log(`🔍 Searching for category: ${category}`);
      let categoryFound = false;
      const categoryXpath = `//android.widget.TextView[@text="${category}"]`;

      // initial (no scroll)
      try {
        const categoryElement = await $(categoryXpath);
        if (
          (await categoryElement.isExisting()) &&
          (await categoryElement.isDisplayed())
        ) {
          console.log(`✅ Found category: ${category} (initial position)`);
          results.found.push(category);
          categoryFound = true;

          if (shouldClick) {
            await categoryElement.click();
            await browser.pause(500);
            console.log(`🎯 Successfully clicked on ${category} category`);
          } else {
            console.log(`👀 Found ${category} (no click by config)`);
          }
          await this.resetToBeginningUsingSlider();
          continue;
        }
      } catch (_) {
        console.log(
          `🔍 ${category} not in initial view, will scroll to find it`
        );
      }

      // scroll RTL
      if (!categoryFound) {
        categoryFound = await this.scrollAndSearchCategoryWithSlider(
          category,
          categoryXpath,
          scrollConfigs.rightToLeft,
          scrollY,
          maxScrollAttempts,
          "right-to-left",
          shouldClick
        );

        // if still not found, reset then LTR
        if (!categoryFound) {
          console.log(`🔄 Category ${category} not found RTL, trying LTR...`);
          await this.resetToBeginningUsingSlider();

          categoryFound = await this.scrollAndSearchCategoryWithSlider(
            category,
            categoryXpath,
            scrollConfigs.leftToRight,
            scrollY,
            maxScrollAttempts,
            "left-to-right",
            shouldClick
          );
        }

        if (categoryFound) results.found.push(category);
        else {
          console.log(
            `❌ Category not found after bidirectional scrolling: ${category}`
          );
          results.notFound.push(category);
        }
      }

      await this.resetToBeginningUsingSlider();
    }

    // report
    console.log("\n🎬 ===== EFFECT CATEGORIES VALIDATION REPORT =====");
    console.log(`📊 Total Categories Tested: ${results.totalCategories}`);
    console.log(`✅ Categories Found: ${results.found.length}`);
    console.log(`❌ Categories Not Found: ${results.notFound.length}`);
    if (results.found.length)
      console.log(`✅ Found Categories: ${results.found.join(", ")}`);
    if (results.notFound.length)
      console.log(`❌ Missing Categories: ${results.notFound.join(", ")}`);
    console.log("🎬 ===============================================\n");

    return results;
  }

  // Helper function to scroll in a specific direction and search for category using Slider functions
  async scrollAndSearchCategoryWithSlider(
    category,
    categoryXpath,
    scrollConfig,
    scrollY,
    maxAttempts,
    direction,
    shouldClick = true // receive same flag, default true
  ) {
    let scrollAttempts = 0;

    while (scrollAttempts < maxAttempts) {
      try {
        const categoryElement = await $(categoryXpath);

        // Check if element exists and is displayed
        if (
          (await categoryElement.isExisting()) &&
          (await categoryElement.isDisplayed())
        ) {
          console.log(
            `✅ Found category: ${category} (after ${direction} scroll #${
              scrollAttempts + 1
            })`
          );

          // Optional click
          if (shouldClick) {
            await categoryElement.click();
            await browser.pause(500);
            console.log(`🎯 Successfully clicked on ${category} category`);
          } else {
            console.log(`👀 Found ${category} (no click by config)`);
          }

          return true;
        }
      } catch (error) {
        console.log(
          `❌ Category ${category} not visible during ${direction} scroll attempt ${
            scrollAttempts + 1
          }`
        );
      }

      // Perform scroll if category not found and we haven't reached max attempts
      if (scrollAttempts < maxAttempts - 1) {
        // Use Slider's scrollScreenHorizontally function
        await Slider.scrollScreenHorizontally(
          scrollConfig.startX,
          scrollConfig.endX,
          scrollY,
          800 // duration
        );

        await browser.pause(1000);
        console.log(
          `📱 Performed ${direction} scroll ${
            scrollAttempts + 1
          } for ${category} using Slider function`
        );
      }

      scrollAttempts++;
    }
    return false;
  }

  // Helper function to scroll back to the beginning using Slider functions
  async resetToBeginningUsingSlider() {
    console.log("🔄 Scrolling back to beginning of categories using Slider...");

    // Scroll left to right multiple times to ensure we're at the start
    for (let i = 0; i < 3; i++) {
      await Slider.scrollScreenHorizontally(200, 800, 1400, 800);
      await browser.pause(500);
    }

    console.log("✅ Scrolled back to beginning using Slider");
  }

  // Function to wait for element to be enabled (helper function)
  async waitForElementEnabled(xpath, timeout = 10000) {
    const element = await $(xpath);
    await browser.waitUntil(
      async () => {
        const isEnabled = await element.isEnabled();
        return isEnabled;
      },
      {
        timeout: timeout,
        timeoutMsg: `Element ${xpath} was not enabled within ${timeout}ms`,
      }
    );
  }
}

export default new WizardAudio();
