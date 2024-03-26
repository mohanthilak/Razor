const puppeteer = require('puppeteer');

class WebScrapper{
    
    constructor(){
        this.browser = null;
        this.page = null;
        this.paginationData = 0;
        this.dataArray = []
    };
    async InititalizeScrapper(){
        this.browser = await puppeteer.launch({headless:true});
        this.page = await this.browser.newPage();
        await this.page.setUserAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36")
    }

    async PointToPage(url){
        if(!url) throw new Error("Need to Pass valid URL");
        await this.page.goto(url);
    }
    async StartScraping(){
        return new Promise(resolve =>setTimeout(async() => {
            await this.GetPaginationCount();
            console.log({NumberOfPages: this.paginationData})
            if(!this.paginationData) return;
            const count = await this.CollectData();
            console.log({NumberOfCarsCollected: count.length});
            resolve()
        }, 5000)) 
    }

    async GetPaginationCount(){
        let pagination =await this.page.evaluate(()=>{
            const div = document.querySelector(".search_pagination .c-text-body-md")
            return div ? div.textContent.trim(): null;
        })
        if(pagination){
            let paginationStringArray = pagination.split(' ');
            this.paginationData = parseInt(paginationStringArray[paginationStringArray.length-1])
        }

    }

    async CollectData(){
        if(this.paginationData == 0) return;

        for(let i=0; i<this.paginationData;i++){

            const buffer= await this.page.evaluate(()=>
                Array.from(document.querySelectorAll(".picks_results .pick_result"), (e)=>{

                    //Identify the class name element that contains the data you want to scrap, use querySelector to fetch the element.  
                    return {name:e.querySelector(".car_card__title").innerText, price:e.querySelector(".car_card__pricing-value").innerText, image: e.querySelector('.car_card__header').getAttribute('data-background-image')}
                })   
            )
            this.dataArray = this.dataArray.concat(buffer)
            console.log({buffer, length: buffer.length});

            await this.page.evaluate(async()=>{
                const pp = document.querySelectorAll(".cob-Button__ghost--standalone");
                if(pp.length==1)pp[0].click()
                else pp[1].click();
                await new Promise(resolve => setTimeout(resolve, 1500));                
            })
        }

        return this.dataArray;
    }
}


async function ActualRun(){
    const WS = new WebScrapper();
    await WS.InititalizeScrapper();
    await WS.PointToPage("https://getaround.com/search?address=Palo+Alto%2C+CA%2C+USA&address_source=google&poi_id=&latitude=37.4418834&longitude=-122.1430195&city_display_name=Palo+Alto&start_date=2024-03-28&start_time=09%3A00&end_date=2024-03-29&end_time=09%3A00&country_scope=US&display_view=list&pickup_method=false&pickup_method_explicit_choice=&administrative_area=California");
    await WS.StartScraping();
}

ActualRun();
