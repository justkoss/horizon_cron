const axios = require('axios');
const cron = require('node-cron');

async function deleteIndex() {
    try {
        const response = await axios.delete('http://localhost:9200/notices_v2');
        if (response.status === 200) {
            console.log('Index deletion successful.');
            await horizonAddRequest();
        } else {
            console.error('Failed to delete index:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during index deletion:', error.message);
    }
}

async function horizonAddRequest() {
    try {
        const response = await axios.get('http://localhost:6603/datafusion/horizon_add');
        if (response.status === 200) {
            console.log('Horizon add successful.');
            await fixSearchRequest();
        } else {
            console.error('Failed to perform horizon add:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during horizon add request:', error.message);
    }
}

async function fixSearchRequest() {
    try {
        const response = await axios.get('http://uhar.heberdomaine.net:8081/api/fixsearch');
        if (response.status === 200) {
            console.log('Fixsearch API call successful.');
        } else {
            console.error('Failed to call fixsearch API:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during fixsearch API call:', error.message);
    }
}

// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running cron job...');
    await deleteIndex();
});

// You can add more scheduled tasks if needed

// Keep the script running
process.stdin.resume();
