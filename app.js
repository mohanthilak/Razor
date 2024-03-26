async function myFunction() {
    for (let i = 0; i < 5; i++) {
      console.log('Before await:', i);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
      console.log('After await:', i);
    }
  }
  
  myFunction();


//   async function Run(){
//     const browser = await puppeteer.launch({headless:true});
//     const page = await browser.newPage();
//     await page.setUserAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36")

//     await page.goto("https://getaround.com/search?address=Palo+Alto%2C+CA%2C+USA&address_source=google&poi_id=&latitude=37.4418834&longitude=-122.1430195&city_display_name=Palo+Alto&start_date=2024-03-28&start_time=09%3A00&end_date=2024-03-29&end_time=09%3A00&country_scope=US&display_view=list&pickup_method=false&pickup_method_explicit_choice=&administrative_area=California");

//     setTimeout(async()=>{
        
//         console.log("page done")
//         await page.waitForSelector('.search_pagination .c-text-body-md', {visible: true, timeout: 5000});
    
//         let paginationData =await page.evaluate(()=>{
//             const div = document.querySelector(".search_pagination .c-text-body-md")
//             return div ? div.textContent.trim(): null;
//         })

//         let data = [];
//         await page.screenshot({path: "example.png", fullPage:true})
//         if(paginationData){
//             paginationData = paginationData.split(' ');
//             paginationData = parseInt(paginationData[paginationData.length-1])
//             console.log("pagination Data", paginationData)
            
//             // for(let i=0; i<paginationData; i++){
//                 // const jj = await page.$(".picks_results");
//                 // const ext = await jj.evaluate((e)=>e.innerHTML);
//                 // console.log({ext})
//             // }
//             let cars = []; 
//             for(let i=0; i<paginationData;i++){

//                 const buffer= await page.evaluate(()=>
//                     Array.from(document.querySelectorAll(".picks_results .pick_result"), (e)=>{
//                         return {name:e.querySelector(".car_card__title").innerText, price:e.querySelector(".car_card__pricing-value").innerText}
//                     })   
//                 )
//                 cars.concat(buffer)
//                 console.log({buffer, length: cars.length});
                
                
//                 // await page.evaluate(()=>
//                 //     console.log("hahaha")
//                 //     // const pp = document.querySelectorAll(".cob-Button__ghost--standalone");
//                 //     // console.log("!!!!!!",{pplength: pp.length});
//                 // )
                

//                 const nextButton = await page.evaluate(async()=>{
//                     const pp = document.querySelectorAll(".cob-Button__ghost--standalone");
//                     if(pp.length==1)pp[0].click()
//                     else pp[1].click();
//                     await new Promise(resolve => setTimeout(resolve, 1500));
//                     return pp.length;                    
//                 })
//                 console.log(nextButton);
//                 // if(nextButton){

//                 //         nextButton.click();
//                 //         await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 1 second}
//                 // }
//                 // await new Promise(resolve=>{

//                 // })
//             }
            
//         }
    
//         await browser.close();
//     }, 5000)

    
// }

// Run();
    // try {
    //     // Wait for the cookie consent pop-up to appear
    //     await page.waitForSelector('.js_cookie-consent-modal .js_cookie-consent-modal__agreement', { visible: true, timeout: 5000 });
        
    //     // Click on the button to accept cookies
    //     await page.click('.js_cookie-consent-modal .js_cookie-consent-modal__agreement');
    // } catch (error) {
    //     // If the cookie consent pop-up doesn't appear within 5 seconds, or if there's an error, log it
    //     console.log('Cookie consent pop-up not found or error:', error);
    // }

