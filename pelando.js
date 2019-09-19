const {
    Builder, By, Key
} = require('selenium-webdriver')
require('chromedriver')
const Chrome = require('selenium-webdriver/chrome')
exports.fetchData = async function () {
    return new Promise(async (resolve, reject) => {
        var prodList = []
        var options = new Chrome.Options();
        options.addArguments(`--user-data-dir=chrome`);
        var driver = new Builder().withCapabilities(options).build();
        try {
            await driver.get('https://www.pelando.com.br/quente')
        } catch (error) {
            reject()
        }
        await sleep(3000);
        for (let index = 0; index < 1; index++) {
            await driver.findElement(By.tagName('body')).sendKeys(Key.PAGE_DOWN);
            await sleep(500)
        }
        var product = {}
        await driver.findElements(By.className('gridLayout-item threadCardLayout--card')).then(async res => {
            for (let index = 0; index < res.length; index++) {
                try {
                    const element = res[index];
                    try {
                        product.name = await element.findElement(By.className("cept-tt thread-link linkPlain thread-title--card")).getText()
                    } catch (error) { }
                    try {
                        product.percent = await element.findElement(By.className('cept-vote-temp vote-temp vote-temp--hot')).getText()
                    } catch (error) { }
                    try {
                        product.price = await element.findElement(By.className("thread-price text--b vAlign--all-tt cept-tp size--all-l")).getText()
                    } catch (error) { }
                    try {
                        product.seller = await element.findElement(By.className("text--b text--color-brandPrimary cept-merchant-name")).getText()
                    } catch (error) { }
                    try {
                        product.url = await element.findElement(By.className("cept-dealBtn boxAlign-jc--all-c space--h-3 width--all-12 btn btn--mode-primary cept-dealBtn-id-347669")).getAttribute('href')
                    } catch (error) { }
                    try {
                        product.description = await element.findElement(By.className("cept-description-container overflow--wrap-break width--all-12  size--all-s size--all-s overflow--clamp-s-2 overflow--fade-b-r--s")).getText()
                    } catch (error) { }
                    try {
                        product.cupom = await element.findElement(By.className("lbox--v-4 flex--width-calc-fix flex--grow-1 clickable overflow--ellipsis width--all-12 hAlign--all-c text--color-charcoal text--b btn--mini")).getAttribute('value')
                    } catch (error) { }
                    try {
                        product.username = await element.findElement(By.className(" thread-username")).getText()
                    } catch (error) { }
                    prodList.push(product)
                } catch (error) {
                    console.log(error)
                }
            }
        })
        await driver.quit()
        resolve(prodList)
    })

}
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
