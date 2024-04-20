
<h1 align="center">
    <div>Historic Billboard Hot 100 Data</div>
    <div>
        <a href="https://github.com/mhollingshead/billboard-hot-100/actions/workflows/crawler.yml"><img src="https://github.com/mhollingshead/billboard-hot-100/actions/workflows/crawler.yml/badge.svg" alt="Crawler" /></a>
        <a><img src="https://img.shields.io/static/v1?label=Last%20Crawl&message=20%20Apr%202024%2004%3A17%3A43&color=34D058&labelColor=333a41" alt="Last Crawl" /></a>
        <a href="https://github.com/mhollingshead/billboard-hot-100/tree/main/date"><img src="https://img.shields.io/static/v1?label=Charts&message=3429&color=blue&labelColor=333a41" alt="charts" /></a>
    </div>
</h1>

<p align="center">
    <i>JSON files for every Billboard Hot 100 chart in history, updated daily.</i>
</p>
<p align="center">
    <a href="https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/date/1958-08-04.json">1958-08-04</a> | <a href="https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/date/2024-04-20.json">2024-04-20</a>
</p>

## Get the Most Recent Chart

To get the current Billboard Hot 100 chart, use the following URL:

```html
https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/recent.json
```

The JSON data will be a single [chart object](#chart-object).

## Get a Specific Chart

To get the Billboard Hot 100 chart during a specific week, use the following URL:

```html
https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/date/<DATE>.json
```

where `<DATE>` is a **valid release date** (formatted `YYYY-MM-DD`). The JSON data will be a single [chart object](#chart-object).

### Valid Release Dates

You can use [`valid_dates.json`](https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/valid_dates.json) to get a list of all valid release dates.

## Get All Charts

To get all Billboard Hot 100 charts, use the following URL:

```html
https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/all.json
```

The JSON data will be an array of [chart objects](#chart-object).

## Schema

All JSON files contain either single **chart objects** or arrays of **chart objects**.

### Chart Object

```javascript
{
    "date": String,
    "data": [
        {
            "song": String,
            "artist": String,
            "this_week": Number,
            "last_week": Number || null,
            "peak_position": Number,
            "weeks_on_chart": Number
        },
        ...
    ]
}
```

| Attribute | Type | Description |
| --- | --- | --- |
| `date` | `String` | The chart's release date (formatted `YYYY-MM-DD`). |
| `data` | `Array<Object>` | The chart's data, an array of 100 **song objects**. |
| **song object**.`song` | `String` | The song's title. |
| **song object**.`artist` | `String` | The song's artist. |
| **song object**.`this_week` | `Number` | The song's current chart position. |
| **song object**.`last_week` | `Number` \| `null` | The song's chart position during the previous week. |
| **song object**.`peak_position` | `Number` | The song's peak chart position during any week. |
| **song object**.`weeks_on_chart` | `Number` | The number of weeks that the song has been on the chart. |
