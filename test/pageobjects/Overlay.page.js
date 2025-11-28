import { $, browser } from "@wdio/globals";

class Overlay {
  get videoEditor() {
    return $(
      `//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View | //android.view.ViewGroup[@content-desc="Create, Video"]/android.view.ViewGroup/android.view.View`
    );
  }
  get video_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Videos"]'
    );
  }
  get images_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Images"]'
    );
  }
  get media_1() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[1]');
  }
  get media_2() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[5]');
  }
  get vidoe1() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[2]');
  }
  get overlay_video() {
    return $('(//android.view.View[@resource-id="com.myzesty:id/hover"])[5]');
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
    return $('//android.widget.TextView[@text="Export"]');
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
  get overlay_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Overlay"]'
    );
  }
  get go_back() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/back"]/android.widget.ImageView'
    );
  }
  get overlay_img() {
    return $(
      '//android.view.ViewGroup[@resource-id="com.myzesty:id/cl_image"]'
    );
  }
  get overlay_opacity() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Opacity"]'
    );
  }
  get apply_changes() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
  }
  get opacity_text() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/tvOpacity"]'
    );
  }
  get delete_overlay() {
    return $(
      '(//android.widget.LinearLayout[@resource-id="com.myzesty:id/icon_area"])[5]'
    );
  }
  get add_overlay() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="Add"]'
    );
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
  async Select_Media_2() {
    await this.media_2.click();
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
  async Click_Album() {
    await this.album.click();
  }
  async Click_Automation_Album() {
    await this.automation_album.click();
  }
  async Click_Done_Btn() {
    await (await this.done_button).click();
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
  async Click_Overlay_Tab() {
    await this.overlay_tab.click();
  }
  async Toolbar_Back() {
    await (await this.go_back).click();
  }
  async Pinch() {
    await this.overlay_img.pinch({ duration: 2000, scale: 0.4 });
  }
  async Click_Overlay_Opacity() {
    await this.overlay_opacity.click();
  }
  async Click_Apply_Changes() {
    await this.apply_changes.click();
  }
  async Get_Opacity_Text() {
    const opacity = await this.opacity_text.getText();
    return opacity;
  }
  async Click_Delete_Overlay() {
    await this.delete_overlay.click();
  }
  async Select_Vidoe_1() {
    await this.vidoe1.click();
  }
  async Select_Overlay_Video() {
    await this.overlay_video.click();
  }
  async Click_Add_Overlay() {
    await this.add_overlay.click();
  }
  async addPixelsToElementXAndClick(xpath, deltaX) {
    const el = await $(xpath);
    await el.waitForDisplayed({ timeout: 10000 });

    const loc = await el.getLocation(); // { x, y } top-left
    const size = await el.getSize(); // { width, height }

    const centerX = loc.x + Math.floor(size.width / 2);
    const centerY = loc.y + Math.floor(size.height / 2);

    const newX = centerX + deltaX;
    const newY = centerY;

    // ✅ Reliable W3C tap
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: newX, y: newY },
          { type: "pointerDown", button: 0 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.releaseActions();

    return { x: newX, y: newY };
  }
}

export default new Overlay();
