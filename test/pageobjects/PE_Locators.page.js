class Photo_Editor_Locators {
  get photo_editor() {
    return $(
      '//android.widget.Button[@content-desc="photoeditor"]/android.view.ViewGroup/android.view.View'
    );
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
  get done_button() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/done"]'
    );
  }
  get expand() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/expand"]'
    );
  }
  get apply_Changes() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
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
  // -------------------------- Sticker Locators ----------------------- //
  get sticker_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Sticker"]'
    );
  }
  get sticker_search_bar() {
    return $(
      '//android.widget.EditText[@resource-id="com.myzesty:id/searchView"]'
    );
  }
  get sticker_suggestion() {
    return $(
      '//android.widget.ListView[@resource-id="com.myzesty:id/listResults"]/android.widget.RelativeLayout[1]'
    );
  }
  get sticker_back_btn() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/close"]');
  }
  get recent_used_sticker() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/imgRecent"]'
    );
  }
  get recent_used_sticker_list() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[1]'
    );
  }
  get sticker_category_tab() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/categoryTab"]'
    );
  }
  get sticker_item() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/animated_icon"])[1]'
    );
  }
  get delete_sticker() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/delete_sticker"]'
    );
  }
  get add_more_sticker() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/add_sticker"]'
    );
  }

  //============================ Bokeh Locators ============================ //

  get bokeh() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Bokeh"]'
    );
  }

  get bokeh_border() {
    return $('//android.widget.TextView[@text="Border"]');
  }

  get eraser() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/eraser"]'
    );
  }
  get size_title() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/size_title"]'
    );
  }
  get size() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/size"]');
  }
  get undo() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/undo"]');
  }
  get redo() {
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/redo"]');
  }
  get apply_changes() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/donetick"]'
    );
  }
  get done_btn() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
  }
  get enable_erase() {
    return $(
      '(//android.widget.ImageView[@resource-id="com.myzesty:id/eraser"])[1]'
    );
  }

  // ============================ Draw Locators ============================ //

  get draw_tab() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Draw"]');
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
  async Click_Done_Btn() {
    await this.done_button.click();
    await browser.pause(2000);
  }
  async Select_Media_1(index = 1) {
    const selector = `(//android.view.View[@resource-id="com.myzesty:id/hover"])[${index}]`;
    await $(selector).click();
  }

  // Common Function to select Media from Phone
  async Select_Media_From_Phone(index = 1) {
    await this.Open_PhotoEditor();
    await this.Click_Album();
    await this.Click_Automation_Album();
    await this.Select_Media_1(index);
  }
  async Expand_Menu() {
    await this.expand.click();
  }
}
export default new Photo_Editor_Locators();
