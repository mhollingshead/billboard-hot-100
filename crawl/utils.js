const axios = require('axios');
const cheerio = require('cheerio');

// Remove tab or newline characters from text nodes
const clean = html => html.replace(/\n/g, '').replace(/\t/g, '');
// Format dates to YYYY-MM-DD
const formatDate = date => {
    date = date.toLocaleDateString().split('/');
    if (date[0].length === 1) date[0] = `0${date[0]}`;
    if (date[1].length === 1) date[1] = `0${date[1]}`;
    return `${date[2]}-${date[0]}-${date[1]}`;
};

const selectors = {
    date: '.chart-results .c-tagline',
    song: 'h3#title-of-a-story',
    artist: 'h3 + span.c-label',
    last_week: '.o-chart-results-list__item:nth-child(4) > span',
    peak_position: '.o-chart-results-list__item:nth-child(5) > span',
    weeks_on_chart: '.o-chart-results-list__item:nth-child(6) > span'
};

const getRecentChart = async () => {
    // Fetch the current chart from billboard.com
    const { data } = await axios.get('https://www.billboard.com/charts/hot-100');
    const $ = cheerio.load(data);

    // Extract the chart's date
    const date = formatDate(new Date($(selectors.date).first().text()));

    // Initialize empty chart object
    const chart = { date, data: [] };
    // Loop through each row of the chart
    $('.o-chart-results-list-row-container').each((i, row) => {
        // Extract relevant song data
        const this_week = i + 1
        const song = clean($(row).find(selectors.song).first().text());
        const artist = clean($(row).find(selectors.artist).first().text());
        const last_week = clean($(row).find(selectors.last_week).first().text());
        const peak_position = clean($(row).find(selectors.peak_position).first().text());
        const weeks_on_chart = clean($(row).find(selectors.weeks_on_chart).first().text());
        // Push song data to the chart object
        chart.data.push({
            song, artist, this_week,
            last_week: last_week === '-' ? null : parseInt(last_week),
            peak_position: parseInt(peak_position),
            weeks_on_chart: parseInt(weeks_on_chart)
        });
    });

    // Return the finished chart object
    return chart;
};

module.exports = { getRecentChart };