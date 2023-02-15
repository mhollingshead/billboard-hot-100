const fs = require('fs');
const { getRecentChart } = require('./utils');

(async () => {
    const dir = '..';
    // Get the recent chart
    const recent = await getRecentChart();

    // Update recent.json
    fs.writeFileSync(`${dir}/recent.json`, JSON.stringify(recent));
    // Create or update date/<DATE>.json
    fs.writeFileSync(`${dir}/date/${recent.date}.json`, JSON.stringify(recent));
    
    // Load all.json
    const all = JSON.parse(fs.readFileSync(`${dir}/all.json`));
    // Update or push the recent chart
    if (all[all.length - 1].date === recent.date) {
        all[all.length - 1] = recent;
    } else {
        all.push(recent);
    }
    // Update all.json
    fs.writeFileSync(`${dir}/all.json`, JSON.stringify(all));

    // Load valid_dates.json
    const valid_dates = JSON.parse(fs.readFileSync(`${dir}/valid_dates.json`));
    // Push recent date and update valid_dates.json if necessary
    if (!valid_dates.includes(recent.date)) {
        valid_dates.push(recent.date);
        fs.writeFileSync(`${dir}/valid_dates.json`, JSON.stringify(valid_dates));
    }
})();