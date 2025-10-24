import Common_function from '../pageobjects/commonfun.page.js' ;
import Slider from '../pageobjects/Slider.page.js';
import assert from 'assert';
import { $, browser } from '@wdio/globals' ;

class Freeze
{

  // Locators

  get videoEditor() { return $(`//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View | //android.view.ViewGroup[@content-desc="Create, Video"]/android.view.ViewGroup/android.view.View`); }
  get video_tab() { return $('//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Videos"]'); }
  get images_tab() { return $('//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Images"]'); }
  get media_1() { return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[1]'); }
  get vidoe1() { return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[2]'); }
  get done_button() { return $('//android.widget.FrameLayout[@resource-id="com.myzesty:id/done"]'); }
  get advance_add() { return $('//android.widget.ImageView[@resource-id="com.myzesty:id/add_video"]'); }
  get close_project() { return $('//android.widget.ImageView[@resource-id="com.myzesty:id/cancel"]'); }
  get open_draft() { return $('(//android.widget.ImageView[@resource-id="com.myzesty:id/img"])[1]'); }
  get export() { return $('//android.widget.TextView[@text="Export"]'); }
  get export_done() { return $('//android.view.ViewGroup[@content-desc="Done"]'); }
  get album() { return $('//android.widget.TextView[@resource-id="com.myzesty:id/album_name"]'); }
  get automation_album() { return $('//android.widget.TextView[@resource-id="com.myzesty:id/tv_folder_name" and @text="Automation"]'); }

  get freezetab() { return $('//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Freeze"]'); }
  get freezeSegment() { return $('//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]'); }
  get undoButton() { return $('//android.widget.ImageView[@resource-id="com.myzesty:id/undo"]'); }
  get redoButton() { return $('//android.widget.ImageView[@resource-id="com.myzesty:id/redo"]'); }
  get backButton() { return $('//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'); }
  get freezebutton() { return $('(//android.widget.FrameLayout[@resource-id="com.myzesty:id/container"])[1]'); }

  




  // Reusable methods

  async Open_VideoEditor()
  {
    await (await this.videoEditor).click();
  }
  async Click_Img_Tab()
  {
    await (await this.images_tab).click();
  }
  async Click_Video_Tab()
  {
      await (await this.video_tab).click();
  }
  async Select_Media_1()
  {
    await (await this.media_1).click();
  }
  async Click_Advance_Add()
  {
      await (await this.advance_add).click();
      await browser.pause(500);
  }
  async Click_Close_Project()
  {
      await (await this.close_project).click();
  }
  async Open_Draft_Proj()
  {
      await (await this.open_draft).click();
  }
  async Click_Album()
  {
      await this.album.click();
  }
  async Click_Automation_Album()
  {
      await this.automation_album.click();
  }
  async Click_Done_Btn()
  {
    await (await this.done_button).click();
  }
  async Click_Freeze_Tab()
  {
    await (await this.freezetab).click();
  }
  async Toolbar_Back()
  {
    await (await this.backButton).click();
  }
  async Select_Video()
  {
    await this.vidoe1.click();
  }
  async Click_Freeze_Button()
  {
    await this.freezebutton.click();
  }
  async  Export_Media()
  {
    await this.export.click();
  }
  async Export_Done_Btn()
  {
    const isVisible = await this.export_done.waitForDisplayed();
    if(isVisible)
      {
        await this.export_done.click();
      }
    else
    {
      console.log("Done Button not visible.")
    }
  
  }
  // async getFreezeSegment(index = 1) 
  // {
  //   // Locate the timeline row (range slider + parent)
  //   const timelineRow = await $(`(//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"])[${index}]`);
  //   // Try to see if a "Freeze" text exists inside that timeline row
  //   const freezeText = await timelineRow.$('//android.widget.TextView[@text="Freeze 2"]');
  //   if (await freezeText.isExisting()) {
  //       console.log(`Freeze text found on timeline row ${index}`);
  //       return freezeText;   // return the Freeze text element
        
  //   } else {
  //       console.warn(`Freeze text not found on timeline row ${index}, returning row itself`);
  //       return timelineRow;  // fallback: return the row for editing
  //   }
  // }

}

export default new Freeze();
