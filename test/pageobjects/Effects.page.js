import Common_function from "../pageobjects/commonfun.page.js";
import Sliders from "../pageobjects/sliders.page.js";
import assert from "assert";
import { $, browser } from "@wdio/globals";

class Effects {
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
  get export_done() {
    return $('//android.widget.Button[@resource-id="com.myzesty:id/btn_done"]');
  }

  get add_effect() {
    return $('//android.widget.TextView[@text="Add Effects"]');
  }
  get effect_1() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[3]'
    );
  }
  get effect_2() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/image"])[4]'
    );
  }
  get go_back() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
    );
  }
  get edit_effects() {
    return $('//android.widget.TextView[@text="Edit Effects"]');
  }
  get effect_subbar() {
    return $(
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]'
    );
  }
  get edit_applied_effect() {
    return $('//android.widget.TextView[@text="Edit Effects"]');
  }
  get remove_effect() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
    );
  }

  get draft_proj() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/img"])[1]'
    );
  }
  get add_more_effect() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
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
  get effect_subbar_edit() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Edit"]'
    );
  }
  get new_project() {
    return $('//android.widget.LinearLayout[@content-desc="New Project"]');
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

  // Resuable methods
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
  async Click_Done_Btn() {
    await (await this.done_button).click();
    await browser.pause(2000);
  }
  async waitForElementVisible(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({
      timeout: timeout,
      timeoutMsg: `Element ${selector} not visible after ${timeout} ms`,
    });
    return element;
  }
  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Advance_Add() {
    await (await this.advance_add).click();
    await browser.pause(500);
  }
  async Media_Selection() {
    await (await this.images_tab).click();
    await Common_function.selectImages(3);
    await (await this.done_button).click();
    await browser.pause(3000);
  }
  async Apply_Effect() {
    await (await this.add_effect).click();
  }
  async Select_Effect_1() {
    await (await this.effect_1).click();
    await browser.pause(2000);
  }
  async Select_Effect_2() {
    await (await this.effect_2).click();
    await browser.pause(2000);
  }
  async Apply_Changes() {
    await (await this.apply_changes).click();
  }
  async Toolbar_Back() {
    await (await this.go_back).click();
  }
  async Edit_Effects() {
    await (await this.edit_effects).click();
  }
  async Select_Effect_Subbar() {
    await (await this.effect_subbar).click();
  }
  async Click_Edit_Applied_Effect() {
    await (await this.edit_applied_effect).click();
  }
  async Remove_Effect() {
    await (await this.remove_effect).click();
  }
  async Click_Close_Project() {
    await (await this.close_project).click();
  }
  async Open_Draft_Proj() {
    await (await this.draft_proj).click();
    await browser.pause(2000);
  }
  async waitForElementEnabled(selector, timeout = 5000) {
    const elem = await $(selector);
    await elem.waitForEnabled({ timeout });
    console.log("✅ Element is enabled");
  }
  async Apply_More_Effects() {
    await (await this.add_more_effect).click();
  }
  async applyEffects(xpathBase, totalEffects = 3, startIndex = 2) {
    let index = startIndex;
    let applied = 0;

    while (applied < totalEffects) {
      const fullXpath = `(${xpathBase})[${index}]`;
      const effect = await $(fullXpath);

      if (!(await effect.isExisting())) {
        console.log(`❌ No effect found at index ${index}.`);
        break;
      }

      console.log(`🎨 Applying effect #${applied + 1} (index ${index})`);
      await effect.click();
      await this.waitForElementEnabled(
        '//android.widget.ImageView[@resource-id="com.myzesty:id/cancel_effects"]'
      );
      // await browser.pause(1000);

      // Click Done
      const doneBtn = await $(
        '//android.widget.ImageView[@resource-id="com.myzesty:id/done"]'
      );
      await doneBtn.waitForDisplayed({ timeout: 10000 });
      await doneBtn.click();
      console.log("✅ Clicked Done");
      await browser.pause(500);

      // Click Add
      if (applied + 1 < totalEffects) {
        const addBtn = await $(
          '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
        );
        await addBtn.waitForDisplayed({ timeout: 5000 });
        await addBtn.click();
        console.log("➕ Clicked Add");
        await browser.pause(1000);
      }

      index++;
      applied++;
    }

    console.log(`✨ Applied ${applied} effects successfully`);
  }
  async Play_Pause_Media() {
    await Sliders.play_pause(534, 1412);
    await browser.pause(4000);
    await Sliders.play_pause(534, 1412);
  }
  async Export_Media() {
    await (await this.exportButton).click();
  }
  async Export_Done() {
    const doneBtn = await this.done_button;
    await browser.waitUntil(async () => await doneBtn.isDisplayed(), {
      timeout: 10000, // wait up to 10s
      timeoutMsg: "❌ Done button not visible after 10s",
    });
  }
  async Effect_Subbar_Edit() {
    await (await this.effect_subbar_edit).click();
  }
  async Start_New_Project() {
    await (await this.new_project).click();
  }
  async Export_Done_Btn() {
    const isVisible = await this.export_done.waitForDisplayed();
    if (isVisible) {
      await this.export_done.click();
    } else {
      console.log("Done Button not visible.");
    }
  }
}

export default new Effects();
