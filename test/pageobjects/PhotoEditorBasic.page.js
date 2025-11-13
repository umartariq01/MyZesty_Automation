import { $, browser } from "@wdio/globals";
import Logger from "./Logs.page.js";

class PhotoEditor_Basic_Operation {
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
    return $('//android.widget.ImageView[@resource-id="com.myzesty:id/done"]');
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
  get crop_rotate() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Crop / Rotate"]'
    );
  }
  get rotate() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title_view_rotate"]'
    );
  }
  get rotate_img() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/wrapper_rotate_by_angle"]/android.widget.ImageView'
    );
  }
  get cancel_rotate() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/wrapper_reset_rotate"]/android.widget.ImageView'
    );
  }
  get scale_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title_view_scale"]'
    );
  }
  get save_changes() {
    return $(
      '//android.widget.FrameLayout[@resource-id="com.myzesty:id/save"]'
    );
  }
  get expand_menu() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/expand"]'
    );
  }
  get fade_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Fade"]'
    );
  }
  get fade_default_intensity() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/intensity"]'
    );
  }
  get flip() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Flip"]'
    );
  }
  get blend_tab() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Blend"]'
    );
  }
  get replace_img() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/change_image"]'
    );
  }
  get overlay() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Overlay"]'
    );
  }
  get blur() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Blur"]'
    );
  }
  get blur_intensity() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/intensity"]'
    );
  }
  get white_balance() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="White-Balance"]'
    );
  }
  get curves() {
    return $(
      '//android.widget.TextView[@resource-id="com.myzesty:id/title" and @text="Curves"]'
    );
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
  async Click_Crop_Rotate() {
    await this.crop_rotate.click();
  }

  async Is_Crop_Selected(elementXPath, customMessage) {
    try {
      // wait for element to exist before getting its attribute
      const element = await $(elementXPath);
      await element.waitForExist({ timeout: 5000 });

      // read the 'selected' attribute
      const selectedAttr = await element.getAttribute("selected");
      const isSelected = selectedAttr === "true" || selectedAttr === true;

      // log result
      if (isSelected) {
        console.log(
          customMessage ||
            "[COLLECT] Original Crop Dimension is selected by default."
        );
      } else {
        console.log(
          "[COLLECT] Original Crop Dimension is NOT selected by default."
        );
      }

      return isSelected;
    } catch (error) {
      console.log(`[ERROR] Unable to check selection for: ${elementXPath}`);
      console.log(error.message);
      return false;
    }
  }
  async Click_Rotate_Tab() {
    await this.rotate.click();
  }
  async Click_Rotate_Image() {
    await this.rotate_img.click();
  }
  async Click_Cancel_Rotation() {
    await this.cancel_rotate.click();
  }

  async scrollUntilTextEquals({
    containerXpath,
    valueXpath,
    expectedText,
    direction = "LTR",
    maxScrolls = 30,
    duration = 700,
  }) {
    // 1) Get container geometry
    const container = await $(containerXpath);
    await container.waitForDisplayed({ timeout: 5000 });

    const loc = await container.getLocation();
    const size = await container.getSize();

    // Swipe track inside the container
    const xLeft = Math.round(loc.x + 50);
    const xRight = Math.round(loc.x + size.width - 50);
    const yMid = Math.round(loc.y + size.height / 2);

    // 2) Swipe helper
    async function swipe(x1, x2) {
      await browser.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: x1, y: yMid },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration, x: x2, y: yMid },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
      await browser.releaseActions();
      await browser.pause(300); // brief pause to let UI settle
    }

    // 3) Check if current page has the exact text match at valueXpath
    async function hasExactText() {
      try {
        const el = await $(valueXpath);
        const visible =
          typeof el.isDisplayedInViewport === "function"
            ? await el.isDisplayedInViewport().catch(() => false)
            : await el.isDisplayed().catch(() => false);

        if (!visible) return false;

        const t = (await el.getText()).trim();
        return t === String(expectedText).trim();
      } catch {
        return false;
      }
    }

    console.log(
      `🔎 Scrolling within container to match text "${expectedText}"`
    );
    console.log(`➡️ Direction: ${direction}, maxScrolls: ${maxScrolls}`);

    // 4) Initial check before any scroll
    if (await hasExactText()) {
      console.log(`✅ Found without scrolling`);
      return true;
    }

    // 5) Scroll loop in the chosen direction only
    for (let i = 0; i < maxScrolls; i++) {
      if (direction === "LTR") {
        await swipe(xRight, xLeft); // move right→left
      } else {
        await swipe(xLeft, xRight); // move left→right
      }

      if (await hasExactText()) {
        console.log(`✅ Found after ${i + 1} scroll(s) in ${direction}`);
        return true;
      }
    }

    console.warn(`❌ Not found after ${maxScrolls} scroll(s) in ${direction}`);
    return false;
  }
  async Click_Scale_Tab() {
    await this.scale_tab.click();
  }
  async Click_Save_Changes() {
    await this.save_changes.click();
  }
  async Click_Expand_Menu() {
    await this.expand_menu.click();
  }
  async Click_Fade_Tab() {
    await this.fade_tab.click();
  }
  async Click_Flip_Tab() {
    await this.flip.click();
  }
  async Click_Blend_Tab() {
    await this.blend_tab.click();
  }
  async Click_Replace_Image() {
    await this.replace_img.click();
  }
  async validateCategories(
    categories = [
      "Dissolve",
      "Add",
      "Multiply",
      "Overlay",
      "Lighten",
      "Darken",
      "Color Burn",
    ],
    {
      containerXpath, // ✅ required
      labelXpath, // optional — user can pass a custom pattern with ${category}
      shouldClick = true,
      maxScrollAttempts = 5,
      swipeDuration = 800, // ms
    } = {}
  ) {
    if (!containerXpath) throw new Error("containerXpath is required.");

    console.log("🎬 Starting effect categories validation...");
    const results = {
      found: [],
      notFound: [],
      totalCategories: categories.length,
    };

    // Compute container track once
    const track = await this.getContainerTrack(containerXpath);
    if (!track)
      throw new Error(
        `Container not found or not displayed: ${containerXpath}`
      );

    // Helper: check visibility of a given xpath
    const isVisible = async (xp) => {
      try {
        const el = await $(xp);
        return (await el.isExisting()) && (await el.isDisplayed());
      } catch {
        return false;
      }
    };

    for (const category of categories) {
      // ✅ Use user-provided labelXpath if given, otherwise default
      const finalXpath =
        labelXpath?.replace("${category}", category) ||
        `//android.widget.TextView[@resource-id="com.myzesty:id/text" and @text="${category}"]`;

      console.log(`🔍 Category: ${category}`);
      console.log(`📍 Using XPath: ${finalXpath}`);

      // 1️⃣ If already visible, click (if requested) and move on — NO scroll/reset
      if (await isVisible(finalXpath)) {
        console.log(`✅ Visible without scroll: ${category}`);
        if (shouldClick) {
          const el = await $(finalXpath);
          await el.click();
          await browser.pause(300);
          console.log(`🎯 Clicked ${category}`);
        }
        results.found.push(category);
        continue;
      }

      // 2️⃣ Not visible → scroll inside container until it is, then click once and stop
      const foundByScroll = await this.scrollUntilVisibleThenOptionallyClick({
        targetXpath: finalXpath,
        direction: "right-to-left", // try RTL first
        maxAttempts: maxScrollAttempts,
        swipeDuration,
        track,
        shouldClick,
      });

      if (!foundByScroll) {
        // Try the opposite direction once (still no resets)
        console.log(`🔄 Not found RTL → trying LTR: ${category}`);
        const foundLTR = await this.scrollUntilVisibleThenOptionallyClick({
          targetXpath: finalXpath,
          direction: "left-to-right",
          maxAttempts: maxScrollAttempts,
          swipeDuration,
          track,
          shouldClick,
        });

        if (!foundLTR) {
          console.log(`❌ Not found after bidirectional scroll: ${category}`);
          results.notFound.push(category);
        } else {
          results.found.push(category);
        }
      } else {
        results.found.push(category);
      }

      // 🔕 No reset here — we keep the current viewport.
    }

    // Report
    console.log("\n🎬 ===== EFFECT CATEGORIES VALIDATION REPORT =====");
    console.log(
      `[COLLECT] 📊 Total Categories Tested: ${results.totalCategories}`
    );
    console.log(`[COLLECT] ✅ Categories Found: ${results.found.length}`);
    console.log(
      `[COLLECT] ❌ Categories Not Found: ${results.notFound.length}`
    );
    if (results.found.length)
      console.log(`[COLLECT] ✅ Found: ${results.found.join(", ")}`);
    if (results.notFound.length)
      console.log(`[COLLECT] ❌ Missing: ${results.notFound.join(", ")}`);
    console.log("🎬 ===============================================\n");

    return results;
  }

  /** ========= Helpers ========= */

  async scrollUntilVisibleThenOptionallyClick({
    targetXpath, // xpath to check visibility & click
    direction, // 'right-to-left' | 'left-to-right'
    maxAttempts,
    swipeDuration,
    track, // { xLeft, xRight, yMid }
    shouldClick,
  }) {
    // quick check again (in case view changed since caller checked)
    if (await elementIsVisible(targetXpath)) {
      if (shouldClick) await clickOnce(targetXpath);
      return true;
    }

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // perform one swipe in the requested direction
      if (direction === "right-to-left") {
        await this.swipeWithinTrack(
          track.xRight,
          track.xLeft,
          track.yMid,
          swipeDuration
        );
      } else {
        await this.swipeWithinTrack(
          track.xLeft,
          track.xRight,
          track.yMid,
          swipeDuration
        );
      }
      await browser.pause(300);

      if (await elementIsVisible(targetXpath)) {
        if (shouldClick) await clickOnce(targetXpath);
        // ✅ Stop immediately — no extra scrolling/reset after click
        return true;
      }
    }
    return false;

    async function elementIsVisible(xp) {
      try {
        const el = await $(xp);
        return (await el.isExisting()) && (await el.isDisplayed());
      } catch {
        return false;
      }
    }

    async function clickOnce(xp) {
      const el = await $(xp);
      await el.click();
      await browser.pause(300);
    }
  }

  /**
   * Compute swipe track inside a container.
   * Returns { xLeft, xRight, yMid } or null if not displayed.
   */
  async getContainerTrack(containerXpath) {
    const container = await $(containerXpath);
    await container.waitForDisplayed({ timeout: 5000 });
    const isShown = await container.isDisplayed().catch(() => false);
    if (!isShown) return null;

    const loc = await container.getLocation();
    const size = await container.getSize();

    const pad = 50; // small inset to avoid edge-gesture rejections
    const xLeft = Math.round(loc.x + pad);
    const xRight = Math.round(loc.x + size.width - pad);
    const yMid = Math.round(loc.y + size.height / 2);
    return { xLeft, xRight, yMid };
  }

  async swipeWithinTrack(x1, x2, y, duration = 800) {
    await browser.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: x1, y },
          { type: "pointerDown", button: 0 },
          { type: "pointerMove", duration, x: x2, y },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await browser.releaseActions();
  }
  async Click_Overlay_Tab() {
    await this.overlay.click();
  }
  async Click_Blur_Tab() {
    await this.blur.click();
  }
  async Click_Whit_Balance() {
    await this.white_balance.click();
  }
  async Click_Curves() {
    await this.curves.click();
  }

  async dragGraphAlongDiagonal(containerXPath, distancePx) {
    const el = await $(containerXPath);
    await el.waitForExist({ timeout: 5000 });

    const loc = await el.getLocation(); // { x, y } = top-left
    const size = await el.getSize(); // { width, height }

    const x0 = loc.x;
    const y0 = loc.y;
    const w = size.width;
    const h = size.height;

    // Start from the center of the control
    const cx = x0 + w / 2;
    const cy = y0 + h / 2;

    // --- Semi-horizontal movement ---
    // Move mostly in X by distancePx, and a small Y adjustment to follow the TR->BL slope.
    // Slope magnitude along the diagonal is (h / w).
    // Use a fraction of that slope to keep it "semi-horizontal".
    const slopeFraction = 0.3; // 0 = pure horizontal, 1 = full diagonal. Tweak if needed.

    // For Android coords: increasing Y goes downward.
    // TR->BL diagonal means as X increases, Y decreases (negative). Hence the minus sign.
    const dx = distancePx;
    const dy = -(h / w) * slopeFraction * dx;

    const startX = Math.round(cx);
    const startY = Math.round(cy);
    const endX = Math.round(cx + dx);
    const endY = Math.round(cy + dy);

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: startY },
          { type: "pointerDown", button: 0 },
          { type: "pointerMove", duration: 600, x: endX, y: endY },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.releaseActions();
  }
}
export default new PhotoEditor_Basic_Operation();
