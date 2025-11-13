import { $, browser } from "@wdio/globals";
import assert from "assert";
import Common_function from "../pageobjects/commonfun.page";
class Subscription {
  get subscription() {
    return $(
      '//android.widget.Button[@resource-id="com.myzesty:id/btnContinue"]'
    );
  }

  get subscripe_pkg() {
    return $(
      '//android.widget.Button[@resource-id="com.android.vending:id/0_resource_name_obfuscated"]'
    );
  }

  get Pro() {
    return $(
      '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.FrameLayout/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.GroupView'
    );
  }

  get processing_text() {
    return $(
      '//android.widget.TextView[@resource-id="com.android.vending:id/0_resource_name_obfuscated"]'
    );
  }

  async Check_Subscription(expected_text) {
    const isContinueVisible =
      (await this.subscription.isExisting()) &&
      (await this.subscription.isDisplayed());
    const isProVisible =
      (await this.Pro.isExisting()) && (await this.Pro.isDisplayed());

    if (isContinueVisible) {
      await this.Buy_Subscription(expected_text);
      await browser.pause(5000);
    } else if (isProVisible) {
      await this.Pro.click();
      await browser.pause(2000);
      await this.Buy_Subscription(expected_text);
    } else {
      console.log("✅ Already have Premium Subscription.");
    }
  }

  async Buy_Subscription() {
    await this.subscription
      .waitForDisplayed({ timeout: 3000 })
      .catch(() => false);
    await this.subscription.click();
    await browser.pause(4000);

    await this.subscripe_pkg
      .waitForDisplayed({ timeout: 10000 })
      .catch(() => false);
    await this.subscripe_pkg.click();
    await Common_function.waitForElementToBeVisibleCustom(
      '//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View',
      30000
    );
    // await Common_function.waitForElementToBeVisible(
    //   '//android.widget.Button[@content-desc="videoeditor"]/android.view.ViewGroup/android.view.View'
    // );
    // await browser.pause(4000);

    // const processing_visible = await  this.processing_text.isDisplayed();
    // if(processing_visible)
    // {
    //     await this.verify_processing(expected_text)
    // }
    // else
    // {
    //     console.log("Subscription Processing is not visible...")
    // }
  }

  async verify_processing(expected_text) {
    await this.processing_text.waitForDisplayed({ timeout: 5000 });
    const actual_text = await this.processing_text.getText();
    assert.strictEqual(
      actual_text,
      expected_text,
      "Subscription Processing text not asserted!"
    );
  }
}

export default new Subscription();
