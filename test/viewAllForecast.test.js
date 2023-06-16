const {By, Builder, Browser, until} = require('selenium-webdriver');

const assert = require("assert");


describe('Scenario View all forecast ', function () {

  let driver;
 
  beforeAll( async function () {

    driver = await new Builder().forBrowser('firefox').build();

  });

  afterAll(async function () {
    await driver.sleep(3000);   
    await driver.quit();

  });

  describe('Test case 1', () => {

  it('Step 01: Validate Access to VLY  Selenium script', async function () {

    await driver.get('https://gentle-cliff-068d0e10f.2.azurestaticapps.net/');

  });

 
  it('Step 02: Type your email: romina.gonzalez', async () =>{

    await driver.wait(until.elementLocated(By.id("input28"))).then(el => el.sendKeys('romina.gonzalez@lennar.com'));

  });


  it('Step 03: Click on the Next button', async () =>{

    await driver.wait(until.elementLocated(By.xpath("//input[@value='Next']"))).then(el => el.click());

  });


  it('Step 04: Type your password: *******', async () =>{

    await driver.wait(until.elementLocated(By.id("input60"))).then(el => el.sendKeys('Lenn@r2306'));      

  });


  it('Step 05: Click on the Verify button', async () =>{

    await driver.wait(until.elementLocated(By.xpath("//form[@id='form52']/div[2]/input"))).then(el => el.click());

  });


  it('Step 06: Validate the login is successfull', async () =>{

    await driver.manage().setTimeouts({implicit: 7000});
    let lblName = await driver.findElement(By.className("Welcome"));
    let value = await lblName.getText();
    assert.equal(value, "Welcome,");

  });

});

  describe('Test case 2', () => {

  it('Step 01: Validation of the selection of the All ForecastS', async () =>{

    await driver.findElement(By.xpath ("//button[@class='MuiButtonBase-root css-1c1oqsw']")).click();
    let lblName = await driver.findElement(By.className("ForecastLabel")).getText();
    assert.equal(lblName, "All Forecasts");

  },7000);

 
  it('Step 02: Validation of the number of records of the first sheet of the All Forecasts', async () =>{

    const plants = await driver.findElements(By.xpath("//div[@class='ForecastTile']"));
    let count= Object.keys(plants).length;
    console.log("The number of elements are as follows: "+count);
    assert.equal(count,26);


  })

 });  

});