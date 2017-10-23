const connectWithRetry = module.exports = async (promiseToRetry, serverName, retryNumber, timeout) => {
    try {
        console.log(`connecting to ${serverName}, attempt: ${retryNumber || 0}`)
        await new Promise(resolve => setTimeout(resolve, timeout || 0))
        return await promiseToRetry()
    }
    catch (err) {
        if (retryNumber === 5) {
            return Promise.reject(`Failed after 5 retries to call ${serverName}`)
        }

        await connectWithRetry(promiseToRetry, serverName,  retryNumber + 1 || 1, Math.pow(2, retryNumber) * 1000)
    }
}


connectWithRetry()