import { $, browser } from '@wdio/globals' ;

class Slider
{

    async Slider(driver, startX, endX, startY, endY, desiredPercentage) {
        // Validate percentage is between 0 and 1
        if (desiredPercentage < 0 || desiredPercentage > 1) {
            throw new Error('desiredPercentage must be between 0 and 1.');
        }
    
        // Calculate centerY based on startY and endY
        const centerY = Math.floor((startY + endY) / 2);
    
        // Calculate target position for the desired percentage
        const targetX = Math.floor(startX + (endX - startX) * desiredPercentage);
    
        console.log(`Sliding from ${startX}, ${centerY} to ${targetX}, ${centerY}`);
    
        // Perform sliding action
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: centerY }, // Start at slider
                    { type: 'pointerDown', button: 0 }, // Press down
                    { type: 'pointerMove', duration: 500, x: targetX, y: centerY }, // Slide to target
                    { type: 'pointerUp', button: 0 } // Release
                ]
            }
        ]);
    
        console.log(`Slider moved to ${desiredPercentage * 100}% position.`);
    }



    async Drag_Drop(driver, dragX, dragY, dropX, dropY) {
        try {
    
            await driver.performActions([
                {
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 1000, x: dragX, y: dragY },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 500 },
                        { type: 'pointerMove', duration: 500, x: dropX, y: dropY },
                        { type: 'pointerUp', button: 0 }
                    ]
                }
            ]);
    
            console.log(`Drag and drop completed.`);
        } catch (error) {
            console.error('Error during drag and drop:', error);
        }
    }

    // Vertical screen sliding function
    // async scrollScreen(startX, startY, endX, endY, duration = 1000) {
    //         await browser.performActions([{
    //             type: 'pointer',
    //             id: 'finger1',
    //             parameters: { pointerType: 'touch' },
    //             actions: [
    //                 { type: 'pointerMove', duration: 0, x: startX, y: startY }, // Move to the start position
    //                 { type: 'pointerDown', button: 0 }, // Press down
    //                 { type: 'pointerMove', duration: duration, x: endX, y: endY }, // Move to the end position over the specified duration
    //                 { type: 'pointerUp', button: 0 } // Release
    //             ]
    //         }]);
    //         await browser.releaseActions();
    //     }

    async scrollScreen(startX, startY, endX, endY, duration = 1000, repetitions=1) {
        for (let i = 0; i < repetitions; i++) { // Loop based on the repetitions parameter
            await browser.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY }, // Move to the start position
                    { type: 'pointerDown', button: 0 }, // Press down
                    { type: 'pointerMove', duration: duration, x: endX, y: endY }, // Move to the end position over the specified duration
                    { type: 'pointerUp', button: 0 } // Release
                ]
            }]);
            // await browser.pause(500); // Give time for the action to complete
            await browser.releaseActions();
            await browser.pause(500);
        }
    }
    
    
   
        // Horizental screeen sliding function
    async Single_slide(startX, endX, y, duration = 500) {
            await browser.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: y }, // Move to start position
                    { type: 'pointerDown' }, // Press down
                    { type: 'pause', duration: 100 }, // Small delay before moving
                    { type: 'pointerMove', duration, x: endX, y: y }, // Move with passed duration
                    { type: 'pointerUp' } // Release touch
                ]
            }]);
        }
        
        


    async zoomin(startX1, startY1, startX2, startY2, endX1, endY1, endX2, endY2, repetitions = 1) {
                console.log('Zoom-in Start Coordinates:', { startX1, startY1, startX2, startY2 });
                console.log('Zoom-in End Coordinates:', { endX1, endY1, endX2, endY2 });
                console.log(`Number of repetitions: ${repetitions}`);
            
                for (let i = 0; i < repetitions; i++) {
                    console.log(`Performing zoom-in gesture ${i + 1} of ${repetitions}`);
                    
                    await browser.performActions([
                        {
                            type: 'pointer',
                            id: 'finger1',
                            parameters: { pointerType: 'touch' },
                            actions: [
                                { type: 'pointerMove', duration: 0, x: startX1, y: startY1 }, // Initial position of finger 1
                                { type: 'pointerDown' }, // Press finger 1
                                { type: 'pause', duration: 0 }, // Pause for a short time
                                { type: 'pointerMove', duration: 500, x: endX1, y: endY1 }, // Move finger 1 outward
                                { type: 'pointerUp' } // Release finger 1
                            ]
                        },
                        {
                            type: 'pointer',
                            id: 'finger2',
                            parameters: { pointerType: 'touch' },
                            actions: [
                                { type: 'pointerMove', duration: 0, x: startX2, y: startY2 }, // Initial position of finger 2
                                { type: 'pointerDown' }, // Press finger 2
                                { type: 'pause', duration: 0 }, // Pause for a short time
                                { type: 'pointerMove', duration: 500, x: endX2, y: endY2 }, // Move finger 2 outward
                                { type: 'pointerUp' } // Release finger 2
                            ]
                        }
                    ]);
            
                    // Optional: Pause briefly between repetitions
                    await browser.pause(500);
                }
            
                console.log('Zoom-in gesture performed successfully for all repetitions.');
        }


    async zoomout(startX1, startY1, startX2, startY2, endX1, endY1, endX2, endY2, repetitions = 2) {
                    console.log('Zoom-out Start Coordinates:', { startX1, startY1, startX2, startY2 });
                    console.log('Zoom-out End Coordinates:', { endX1, endY1, endX2, endY2 });
                    console.log(`Number of repetitions: ${repetitions}`);
                
                    for (let i = 0; i < repetitions; i++) {
                        console.log(`Performing zoom-out gesture ${i + 1} of ${repetitions}`);
                        
                        await browser.performActions([
                            {
                                type: 'pointer',
                                id: 'finger1',
                                parameters: { pointerType: 'touch' },
                                actions: [
                                    { type: 'pointerMove', duration: 0, x: startX1, y: startY1 }, // Initial position of finger 1
                                    { type: 'pointerDown' }, // Press finger 1
                                    { type: 'pause', duration: 100 }, // Pause for a short time
                                    { type: 'pointerMove', duration: 500, x: endX1, y: endY1 }, // Move finger 1 outward
                                    { type: 'pointerUp' } // Release finger 1
                                ]
                            },
                            {
                                type: 'pointer',
                                id: 'finger2',
                                parameters: { pointerType: 'touch' },
                                actions: [
                                    { type: 'pointerMove', duration: 0, x: startX2, y: startY2 }, // Initial position of finger 2
                                    { type: 'pointerDown' }, // Press finger 2
                                    { type: 'pause', duration: 100 }, // Pause for a short time
                                    { type: 'pointerMove', duration: 500, x: endX2, y: endY2 }, // Move finger 2 outward
                                    { type: 'pointerUp' } // Release finger 2
                                ]
                            }
                        ]);
                
                        // Optional: Pause briefly between repetitions
                        await browser.pause(1000);
                    }
                
                    console.log('Zoom-out gesture performed successfully for all repetitions.');
        }

        get text_expander()
            {
                return $('//android.view.ViewGroup[@resource-id="com.myzesty:id/range_slider"]/android.view.View[2]');
            }


            // Function to stretch the text, sticket or effects 
            //  Need to add average of bounds
    async dragSliderWithBounds(sliderXpath, dragDistance, sliderBounds) 
    {
        // Locate the slider element using XPath
        const sliderElement = await $(sliderXpath);
        await sliderElement.waitForDisplayed({ timeout: 5000 });
        
        let currentBounds = sliderBounds; // Initialize bounds
        let currentX = (await sliderElement.getLocation()).x; // Start X position of the slider
        const startY = (await sliderElement.getLocation()).y; // Y-coordinate remains constant
        
        // Perform the drag action two times
        for (let i = 0; i < 1; i++) {
          // Get the current boundaries dynamically
          const [minX, maxX] = currentBounds;
        
          // Calculate the endX for the current drag and ensure it stays within bounds
          let endX = currentX + dragDistance;
          if (endX > maxX) {
            endX = maxX; // Cap the drag to the maximum X bound
          } else if (endX < minX) {
            endX = minX; // Cap the drag to the minimum X bound
          }
          const endY = startY; // Y-coordinate remains the same for horizontal dragging
        
          console.log(`Dragging ${i + 1}: from (${currentX}, ${startY}) to (${endX}, ${endY}) within bounds [${minX}, ${maxX}]`);
        
          // Perform the drag action using the W3C Actions API
          await driver.performActions([
            {
              type: 'pointer',
              id: 'finger1',
              parameters: { pointerType: 'touch' },
              actions: [
                { type: 'pointerMove', duration: 0, x: currentX, y: startY }, // Move to the start position
                { type: 'pointerDown', button: 0, }, // Press down
                { type: 'pause', duration: 200 }, // Wait for 200 ms
                { type: 'pointerMove', duration: 500, x: endX, y: endY }, // Drag to the end position
                { type: 'pointerUp', button: 0 }, // Release
              ],
            },
          ]);
        
          console.log(`Drag ${i + 1} action completed successfully!`);
        
          // Update currentX to the new position for the next drag
          currentX = endX;
        
          // Fetch new bounds dynamically after the first drag
          if (i === 0) {
            const newBounds = await sliderElement.getAttribute('bounds'); // Adjust according to how you fetch bounds in your app
            const boundsArray = newBounds.match(/\d+/g).map(Number); // Parse bounds into [minX, maxX]
            currentBounds = [boundsArray[0], boundsArray[2]]; // Extract minX and maxX
            console.log(`Updated slider bounds: [${currentBounds[0]}, ${currentBounds[1]}]`);
          }
        
          // Break the loop if the slider reaches the maximum boundary
          if (currentX >= currentBounds[1]) {
            console.log('Slider reached the maximum boundary.');
            break;
          }
        }
    }

    async dragSlider(sliderXpath, dragDistance, [minX, maxX]) {
        const slider = await $(sliderXpath);
        await slider.waitForDisplayed({ timeout: 5000 });
    
        const location = await slider.getLocation();
        const size = await slider.getSize();
        
        // Start from the center of the slider thumb
        let startX = location.x + Math.floor(size.width / 2);
        const y = location.y + Math.floor(size.height / 2);
    
        // Calculate end X with boundary check
        let endX = startX + dragDistance;
        if (endX > maxX) endX = maxX;
        if (endX < minX) endX = minX;
    
        console.log(`Dragging slider from (${startX}, ${y}) to (${endX}, ${y})`);
    
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 200 },
                    { type: 'pointerMove', duration: 300, x: endX, y },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
    
        console.log('Slider drag completed.');
    }
    


    async Trim_slide(driver, desiredPercentage, startX, endX, startY, endY) 
    {
        // Validate percentage is between 0 and 1
        // if (desiredPercentage < 0 || desiredPercentage > 1) {
        //     throw new Error('desiredPercentage must be between 0 and 1.');
        // }
    
        // Validate boundaries
        if (startX >= endX || startY >= endY) {
            throw new Error('Invalid boundaries: Ensure startX < endX and startY < endY.');
        }
        // Calculate vertical center
        const centerY = Math.floor((startY + endY) / 2);
    
        // Calculate target position
        const targetX = Math.floor(startX + (endX - startX) * desiredPercentage);
    
        console.log(`Sliding from ${startX}, ${centerY} to ${targetX}, ${centerY}`);
    
        // Perform sliding action
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: centerY }, // Start at slider
                    { type: 'pointerDown', button: 0 }, // Press down
                    { type: 'pointerMove', duration: 500, x: targetX, y: centerY }, // Slide to target
                    { type: 'pointerUp', button: 0 } // Release
                ]
            }
        ]);
    
        console.log(`Slider moved to ${desiredPercentage * 100}% position.`);
    }
            
            // Example usage
            // await Sound_slide(driver, 0.5, 124, 929, 1669, 1779);
    

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Music, Audio Fx & Library Xpaths <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    get audioFX()
    {
        return $('//android.widget.LinearLayout[@content-desc="AudioFX"]');
    }

    get audioFX_Song_1()
    {
        return $('(//android.widget.ImageButton[@resource-id="com.myzesty:id/item_action"])[1]');
    }

    get Music_Tab()
    {
        return $('//android.widget.TextView[@text="Music"]');
    }

    get My_library()
    {
        return $('//android.widget.LinearLayout[@content-desc="My Library"]');
    }

    get library_song1()
    {
        return $('(//android.widget.ImageView[@resource-id="com.google.android.documentsui:id/icon_thumb"])[1]');
    }

    get sci_fic_category()
    {
        return $('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.myzesty:id/music_categories"]/android.view.ViewGroup[3]');
    }

    get apply_music()
    {
        return $('(//android.widget.ImageView[@resource-id="com.myzesty:id/done"])[2]');
    }
              

    async Music_tab_Click() 
        {
    
            const maxRetries = 3; // Maximum number of retry attempts
            let attempt = 0;
            let downloadComplete = false;
    
            // Start in the Music tab
            console.log("Starting in the Music tab.");
            let audio_visible = await this.audioFX_Song_1.waitForDisplayed({ timeout: 5000 }).catch(() => false);
        
            if (!audio_visible) {
                console.log("Audio is not visible in the Music tab. Navigating to the AudioFX tab.");
                await this.audioFX.click(); // Switch to the AudioFX tab
                await browser.pause(500); // Wait for 0.5 seconds
                await this.Music_Tab.click();
        
                // Check visibility in the AudioFX tab
                audio_visible = await this.audioFX_Song_1.waitForDisplayed({ timeout: 5000 }).catch(() => false);
        
                if (audio_visible) {
                    console.log("Audio is visible in the Music tab.");
                    await this.audioFX_Song_1.click();
                }
            }
        
            // Check the "selected" attribute
            while (attempt < maxRetries) {
                attempt++;
                console.log(`Attempt ${attempt} to download the song.`);
        
                // Check if the song is already downloaded
                const isSelected = await this.audioFX_Song_1.getAttribute('selected');
                
                if (isSelected === 'true') {
                    console.log("Song is already downloaded. Selecting the song.");
                    await this.audioFX_Song_1.click(); // Select the song
                    downloadComplete = true;
                    break;
                } else {
                    console.log("Song is not downloaded. Downloading the song first.");
                    await this.audioFX_Song_1.click(); // Start downloading the song
        
                    // Wait for the song to be downloaded
                    downloadComplete = await browser.waitUntil(
                        async () => {
                            const status = await this.audioFX_Song_1.getAttribute('selected');
                            return status === 'true';
                        },
                        {
                            timeout: 15000, // Adjust the timeout based on your app's expected download time
                            timeoutMsg: "Song download did not complete within the expected time."
                        }

                    ).catch(() => false);
        
                    if (downloadComplete) {
                        console.log("Download complete. Selecting the song.");
                        await this.audioFX_Song_1.click();
                        break; // Exit the loop if download succeeds
                    } else {
                        console.log("Download failed. Retrying...");
                    }
                }
            }
        
            if (!downloadComplete) {
                throw new Error("Failed to download the song after multiple attempts.");
            }
        }


    async AudioFX_tab() 
    {
        const maxRetries = 3; // Maximum number of retry attempts
        let attempt = 0;
        let downloadComplete = false;
    
        // Start in the Music tab and navigate to AudioFX tab
        await this.audioFX.click();
        await this.Single_slide(973, 200, 562);
        await this.sci_fic_category.click();


        let audio_visible = await this.audioFX_Song_1.waitForDisplayed({ timeout: 5000 }).catch(() => false);
    
        if (!audio_visible) {
            console.log("Audio is not visible in the AudioFX tab. Navigating to the Music tab.");
            await this.Music_Tab.click(); // Switch to the Music tab
            await browser.pause(500); // Wait for 0.5 seconds
            await this.audioFX.click();
    
            // Check visibility in the AudioFX tab again
            audio_visible = await this.audioFX_Song_1.waitForDisplayed({ timeout: 5000 }).catch(() => false);
            if (!audio_visible) {
                throw new Error("Audio is not visible in the AudioFX tab after multiple attempts.");
            }
        }
    
        console.log("Audio is visible in the AudioFX tab.");
    
        // Retry loop for downloading the song
        while (attempt < maxRetries) {
            attempt++;
            console.log(`Attempt ${attempt} to download the song.`);
    
            // Check if the song is already downloaded
            const isSelected = await this.audioFX_Song_1.getAttribute('selected');
            if (isSelected === 'true') {
                console.log("Song is already downloaded. Selecting the song.");
                await this.audioFX_Song_1.click(); // Select the song
                downloadComplete = true;
                break;
            } else {
                console.log("Song is not downloaded. Downloading the song first.");
                await this.audioFX_Song_1.click(); // Start downloading the song
    
                // Wait for the song to be downloaded
                downloadComplete = await browser.waitUntil(
                    async () => {
                        const status = await this.audioFX_Song_1.getAttribute('selected');
                        return status === 'true';
                    },
                    {
                        timeout: 15000, // Adjust the timeout based on your app's expected download time
                        timeoutMsg: "Song download did not complete within the expected time."
                    }
                ).catch(() => false);
    
                if (downloadComplete) {
                    console.log("Download complete. Selecting the song.");
                    await this.audioFX_Song_1.click();
                    break; // Exit the loop if download succeeds
                } else {
                    console.log("Download failed. Retrying...");
                }
            }
        }
    
        if (!downloadComplete) {
            throw new Error("Failed to download the song after multiple attempts.");
        }
    }
    
    async CompareButton(xpath, duration = 2000) 
    {
        const compareButton = await $ (xpath) ;
        // Find the location of the compare button
        const compareElement = compareButton;
        const { x, y } = await compareElement.getLocation(); // Get the element's location
    
        // Perform long press using touch actions
        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: x + 1, y: y + 1 }, // Move to the button (offset slightly to ensure tap)
                    { type: 'pointerDown', button: 0 }, // Press down
                    { type: 'pause', duration: duration }, // Pause to simulate long press
                    { type: 'pointerUp', button: 0 } // Release the press
                ]
            }
        ]);
    
        console.log(`Long pressed the compare button for ${duration} ms.`);
    }

    async tapScreen(x, y) {
        await browser.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: x, y: y },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        // await browser.releaseActions();
    }

    async Sound_slide(driver, startX, endX, startY, endY, desiredPercentage) {
        // Validate percentage is between 0 and 1
        if (desiredPercentage < 0 || desiredPercentage > 1) {
            throw new Error('desiredPercentage must be between 0 and 1.');
        }
    
        // Calculate vertical center
        const centerY = Math.floor((startY + endY) / 2);
        
        // Calculate target position
        const targetX = Math.floor(startX + (endX - startX) * desiredPercentage);
    
        console.log(`Sliding from ${startX}, ${centerY} to ${targetX}, ${centerY}`);
    
        // Perform sliding action
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: centerY }, // Start at slider
                    { type: 'pointerDown', button: 0 }, // Press down
                    { type: 'pointerMove', duration: 500, x: targetX, y: centerY }, // Slide to target
                    { type: 'pointerUp', button: 0 } // Release
                ]
            }
        ]);
    
        console.log(`Slider moved to ${desiredPercentage * 100}% position.`);
    }

    async play_pause(startX, startY) {

            await browser.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY }, // Move to the start position
                    { type: 'pointerDown', button: 0, duration:100 }, // Press down
                    { type: 'pointerUp', button: 0 } // Release
                ]
            }]);
        
    }

    async Refresh_Page() {
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 500, y: 222 },  // Start point
                    { type: 'pointerDown', button: 0 },                    // Touch down
                    { type: 'pointerMove', duration: 1000, x: 500, y: 1932 }, // Swipe down
                    { type: 'pointerUp', button: 0 }                       // Release touch
                ]
            }]);
        }

    async scrollScreenHorizontally(startX, endX, y, duration = 1000) {
            // Horizontal swipe: startX -> endX at a fixed vertical position (y)
            await browser.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: y }, // Move to the starting horizontal position
                    { type: 'pointerDown', button: 0 }, // Press down
                    { type: 'pointerMove', duration: duration, x: endX, y: y }, // Slide horizontally to the end position
                    { type: 'pointerUp', button: 0 } // Release
                ]
            }]);
            await browser.releaseActions();
        }

        async scrollUntilElementIsVisible(element, startX, startY, endX, endY, maxScrolls = 5, duration = 1000) {
            for (let i = 0; i < maxScrolls; i++) {
                let isDisplayed = await $(element).isDisplayed();
                
                if (isDisplayed) {
                    console.log("Element found!");
                    return; // Exit the function if the element is visible
                }
        
                // Scroll the screen
                await this.scrollScreen(startX, startY, endX, endY, duration = 1000, 1);
            }
        
            throw new Error("Element not found after maximum scroll attempts");
        }

        async Extender(driver, elementXpath, dragDistance) 
        {
            // Locate the element
            const element = await $(elementXpath);
            await element.waitForDisplayed({ timeout: 5000 });
        
            // Get element location and size
            const location = await element.getLocation();
            const size = await element.getSize();
        
            // Calculate start and end coordinates
            const startX = location.x + 10; // slight offset from the left edge
            const endX = startX + dragDistance;
            const centerY = location.y + Math.floor(size.height / 2);
        
            console.log(`Sliding from (${startX}, ${centerY}) to (${endX}, ${centerY})`);
        
            // Perform sliding action
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 200 },
                    { type: 'pointerMove', duration: 500, x: endX, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
        
            console.log(`Slider moved to target position.`);
        }     
        

   
}

export default new Slider();