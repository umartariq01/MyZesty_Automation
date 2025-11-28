import Common_function from "../pageobjects/commonfun.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import assert from "assert";
import { $, browser } from "@wdio/globals";

class Sort {
  // Locators

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
  get image_1() {
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
  get sort_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Sort"]'
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

  get exportButton() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/export"]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
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

  async Export_Done_Btn() {
    const isVisible = await this.export_done.waitForDisplayed();
    if (isVisible) {
      await this.export_done.click();
    } else {
      console.log("Done Button not visible.");
    }
  }
  // Reusable methods
  async Open_VideoEditor() {
    await (await this.videoEditor).click();
  }

  async Click_Img_Tab() {
    await (await this.images_tab).click();
  }

  async Select_Img_1() {
    await (await this.image_1).click();
  }
  async Click_Done_Btn() {
    await (await this.done_button).click();
  }
  async Click_Advance_Add() {
    await (await this.advance_add).click();
  }

  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }

  async Click_Sort_Tab() {
    await (await this.sort_tab).click();
  }

  async sortImages() {
    // Get all image elements by resourceId
    const images = await $$(
      'android=new UiSelector().resourceId("com.myzesty:id/image")'
    );

    console.log(`Found ${images.length} images in Sort tab.`);

    if (images.length < 2) {
      console.log("Not enough images to sort.");
      return;
    }

    // Loop through pairs of images
    for (let i = 0; i < images.length - 1; i++) {
      const source = images[i];
      const target = images[i + 1];

      // Get source element center
      const sourceLoc = await source.getLocation();
      const sourceSize = await source.getSize();
      const startX = sourceLoc.x + sourceSize.width / 2;
      const startY = sourceLoc.y + sourceSize.height / 2;

      // Get target element center
      const targetLoc = await target.getLocation();
      const targetSize = await target.getSize();
      const endX = targetLoc.x + targetSize.width / 2;
      const endY = targetLoc.y + targetSize.height / 2;

      // Use your existing Drag_Drop function
      await Sliders.Drag_Drop(driver, startX, startY, endX, endY);

      console.log(`Dragged image ${i + 1} onto image ${i + 2}`);
      await driver.pause(1000); // allow UI to update
    }

    console.log("✅ Sorting completed.");
  }

  async Click_Apply_Changes() {
    await (await this.apply_changes).click();
  }

  async Click_Close_Project() {
    await (await this.close_project).click();
  }

  async Click_Open_Draft() {
    await (await this.open_draft).click();
  }

  async exportVideo() {
    await (await this.exportButton).click();
  }

  async Verify_Sort_Single_Media() {
    const sort_visible = await (await this.sort_tab)
      .isDisplayed()
      .catch(() => false);
    if (!sort_visible) {
      console.log("Success! Sort option not visible in case of single media.");
      return true;
    } else {
      console.log("Failed! Sort option visible in case of single media.");
      return false;
    }
  }
}

export default new Sort();
