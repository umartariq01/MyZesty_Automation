import { $, browser } from "@wdio/globals";

class WizardSticker {
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
  get sticker_tab() {
    return $(
      '//android.widget.LinearLayout[@resource-id="com.myzesty:id/sticker"]'
    );
  }
  get sticker_panel() {
    return $('//android.widget.TextView[@resource-id="com.myzesty:id/title"]');
  }
  get sticker_guide() {
    return $(
      '//android.widget.ImageView[@resource-id="com.myzesty:id/showGuide"]'
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
  async Click_Sticker_Tab() {
    await this.sticker_tab.click();
  }
  async Click_Sticker_Guide() {
    await this.sticker_guide.click();
  }

  async validateCategoriesDeviceAgnostic(
    containerXPath,
    categories,
    opts = {}
  ) {
    const {
      click = true,
      maxSwipes = 8,
      pauseMs = 300,
      textClass = "android.widget.TextView",
    } = opts;

    const container = await $(containerXPath);
    await container.waitForDisplayed({ timeout: 8000 });

    // rect helper
    const getRect = async (el) =>
      typeof el.getRect === "function"
        ? el.getRect()
        : (async () => {
            const [loc, size] = await Promise.all([
              el.getLocation(),
              el.getSize(),
            ]);
            return {
              x: loc.x,
              y: loc.y,
              width: size.width,
              height: size.height,
            };
          })();

    // geometry (computed once; container size usually stable)
    const r = await getRect(container);
    const y = Math.floor(r.y + r.height / 2);
    const xL = Math.floor(r.x + r.width * 0.15);
    const xR = Math.floor(r.x + r.width * 0.85);

    // primitives
    const swipe = async (fromX, toX, duration = 350) => {
      await driver.performActions([
        {
          type: "pointer",
          id: "finger",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: fromX, y },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration, x: toX, y },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
      await driver.releaseActions();
    };

    const isVisible = async (el) =>
      typeof el.isDisplayedInViewport === "function"
        ? el.isDisplayedInViewport()
        : el.isDisplayed();

    const findAndMaybeClick = async (label) => {
      const xp = `${containerXPath}//${textClass}[@text="${label}"]`;
      const el = await $(xp);
      if ((await el.isExisting()) && (await isVisible(el))) {
        if (click) {
          await el.click();
          await browser.pause(200);
        }
        return true;
      }
      return false;
    };

    const results = {
      found: [],
      notFound: [],
      totalCategories: categories.length,
    };

    for (const label of categories) {
      // 1) Try without scrolling first — if found, skip all swipes
      if (await findAndMaybeClick(label)) {
        results.found.push(label);
        continue;
      }

      // 2) Not visible -> start scrolling to search
      let found = false;

      // right -> left
      for (let i = 0; i < maxSwipes && !found; i++) {
        await swipe(xR, xL);
        await browser.pause(pauseMs);
        found = await findAndMaybeClick(label);
      }

      // left -> right (only if still not found)
      for (let i = 0; i < maxSwipes && !found; i++) {
        await swipe(xL, xR);
        await browser.pause(pauseMs);
        found = await findAndMaybeClick(label);
      }

      (found ? results.found : results.notFound).push(label);

      // Note: no reset here — we only scrolled when needed.
      // If you do want to normalize position after a “scrolled” search, uncomment:
      // if (!found) { for (let i = 0; i < 2; i++) { await swipe(xL, xR); await browser.pause(120); } }
    }

    console.log("Categories result:", results);
    return results;
  }
}

export default new WizardSticker();
