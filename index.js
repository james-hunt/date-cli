const { main } = require('./src/index');
const runMain = async () => {
    await main().then(value=>{
        console.log("Days between:", value);
    }).catch(e=>{
        console.warn('ERROR:', e.message)
    });

    process.exit();
}

runMain();