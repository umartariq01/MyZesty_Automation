import { $, browser } from "@wdio/globals";
import Photo_Editor_Locators from "../pageobjects/PE_Locators.page.js";

class PE_Bokeh {
  async Expand_Menu() {
    await Photo_Editor_Locators.expand.click();
  }
  async Click_Bokeh_Tab() {
    await Photo_Editor_Locators.bokeh.click();
  }
  async Click_Bokeh_Border() {
    await Photo_Editor_Locators.bokeh_border.click();
  }
  async Click_Eraser() {
    await Photo_Editor_Locators.eraser.click();
  }
  async Get_Eraser_Size() {
    return await Photo_Editor_Locators.size.getText();
  }
  async Click_Undo_Changes() {
    await Photo_Editor_Locators.undo.click();
  }
  async Click_Redo_Changes() {
    await Photo_Editor_Locators.redo.click();
  }
  async Apply_Changes() {
    await Photo_Editor_Locators.apply_changes.click();
  }
  async Click_Done() {
    await Photo_Editor_Locators.done_btn.click();
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
  async Click_Enable_Erase() {
    await Photo_Editor_Locators.enable_erase.click();
  }
}

export default new PE_Bokeh();
