import { $, browser } from "@wdio/globals";
import Photo_Editor_Locators from "../pageobjects/PE_Locators.page.js";

class PE_Draw {
    async Click_Draw_Tab() {
        await Photo_Editor_Locators.draw_tab.click();
    }
  // PE_Draw specific functions will be added here as needed
}

export default new PE_Draw();
