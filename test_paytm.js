const PaytmChecksum = require('paytmchecksum');

async function run() {
    const mid = 'XVTaon26026633479601';
    const merchantKey = 'nCVLn3KyVJOoLb3&';
    const orderId = 'ORDER_' + Date.now();
    const website = 'DEFAULT';
    
    // As per paytm JS checkout integration
    const paytmParams = {
        body: {
            requestType: 'Payment',
            mid: mid,
            websiteName: website,
            orderId: orderId,
            callbackUrl: 'http://localhost:3000/api/paytm/callback',
            txnAmount: {
                value: '1.00',
                currency: 'INR',
            },
            userInfo: {
                custId: 'CUST_' + Date.now(),
            },
        }
    };
    
    const signature = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), merchantKey);
    const requestData = {
        ...paytmParams,
        head: { signature: signature }
    };
    
    console.log('--- REQ ---');
    console.log(JSON.stringify(requestData, null, 2));
    
    const response = await fetch(`https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    });
    
    const textResponse = await response.text();
    console.log('--- RES ---');
    console.log(textResponse);
}

run().catch(console.error);
