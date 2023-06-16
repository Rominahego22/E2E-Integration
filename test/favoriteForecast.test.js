
const {Builder, Capabilities, Browser, By, Key, until, Actions} = require('selenium-webdriver');
const assert = require("assert");

let driver;
let urlLennar = "https://vly-dev.lennar.com/";
let userName ="luis.navarromedina@lennar.com";
let userpassword = "Tommy25.*";
let userNameInput= "input28";
let submitUser = "//input[@value='Next']"
let passInput = "input60";
let submitPass = "//form[@id='form52']/div[2]/input";
let labelFavorite;

describe('Scenario Favorites Forecast', function () {


  beforeAll( async function () {      
    driver = await new Builder().forBrowser('firefox').build();
    await driver.manage().setTimeouts({implicit: 20000});
    await driver.get(urlLennar);
    await driver.wait(until.elementLocated(By.id(userNameInput))).then(el => el.sendKeys(userName));
    await driver.wait(until.elementLocated(By.xpath(submitUser))).then(el => el.click());
    await driver.wait(until.elementLocated(By.id(passInput))).then(el => el.sendKeys(userpassword));   
    await driver.wait(until.elementLocated(By.xpath(submitPass))).then(el => el.click()); 
  
  });

  afterAll(async function () {   
    await driver.sleep(3000);   
    await driver.quit();
  });

  
describe('Test case 1', () => {

  it('TC01 - Validate the login if you have favorite forecast saved previously', async () =>{

    
    await driver.executeScript('window.scrollBy(0,500);');
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='Favorites']")),30000).then(el => el.click());
    await driver.sleep(2000);
    labelFavorite = await driver.findElement(By.xpath('//div[@class="RecentForecast"]/p')).getText();
    await driver.sleep(2000);
    console.log(labelFavorite);

    assert.equal(labelFavorite, "You don't have any favorite forecasts.");
    
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='RecentsAndFavorites']/div[text()='Recent Forecast']")),30000).then(el => el.click());
    await driver.sleep(2000);


    

    const plants = await driver.findElements(By.xpath("//div[@class='ForecastTile']"));

    let count= Object.keys(plants).length;
    console.log(count);


    for(let i = 1; i<=count; i++){

      await driver.sleep(1500);
      await driver.wait(until.elementLocated(By.xpath('(//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"])['+i+']')),10000).then(el => el.click());
      await driver.sleep(1500);
    }
    await driver.wait(until.elementLocated(By.xpath("//div[@class='Favorites']")),30000).then(el => el.click());

    await driver.wait(until.elementLocated(By.xpath("//div[@class='RecentsAndFavorites']/div[text()='Recent Forecast']")),30000).then(el => el.click());
    await driver.sleep(1000);

   /* for(let i = count-1; i>=1; i--){

      await driver.wait(until.elementLocated(By.xpath('(//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"])['+i+']')),10000).then(el => el.click());
      await driver.sleep(1000);
    }   */

  });

});    

describe('Test case 2', () => {

  it('TC02 - Add more than 10 favorite forecast with the same user', async () =>{

    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='RecentsAndFavorites']/div[text()='Recent Forecast']")),100).then(el => el.click());
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.xpath("//button[@class='MuiButtonBase-root css-1c1oqsw']/p"))).then(el => el.click());
    await driver.sleep(2000);

    assert.equal(true,await driver.findElement(By.xpath("//div[@class='SelectPage']/div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-sizeSmall  css-vijw4d']/div[@role='button']")).isDisplayed());

    await driver.wait(until.elementLocated(By.xpath("//div[@class='SelectPage']/div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-sizeSmall  css-vijw4d']/div[@role='button']")),10000).then(el => el.click());

    await driver.findElement(By.xpath("(//ul/li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-10lvi4n'])[1]")).sendKeys(Key.ARROW_DOWN,Key.ENTER);

    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.xpath("(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk'])[3]")),10000).then(el => el.click());
   // //div[@class="MuiAlert-message css-1xsto0d"]

   let messageDiv = await driver.wait(until.elementLocated(By.xpath("//div[@class='MuiAlert-message css-1xsto0d']")),10000).then(el => el.getText());
    
   //console.log(messageDiv);

   assert.equal(messageDiv,"Max favorites allowed has been reached, remove a forecast from favorites to add new.");
   
   
  });

});  


});

