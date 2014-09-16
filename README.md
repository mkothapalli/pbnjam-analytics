# pbnjam-analytics

Pb&jam's brainchild, visualize akamai's media analytics data.

The pbnjam team developed this project for Tech Jam 2014 at Akamai. The members of this team are:

Drougas, Yannis. 
Kantabathina, Saianirudh.
Kothapalli, Malini.
Solomon, Joshua.

## Description
###video: https://drive.google.com/a/akamai.com/file/d/0B6OlWg09PJjEYWNzTlVvbjE4WnM/edit?usp=sharing 

We wanted to create a cool visualization of the data returned by one of the OPEN APIs.

Since our team consists of a good mix of back-end engineers, a front-end engineer, and a UI designer - we wanted to design an application that would consume an API and then visualize the data using a front-end framework.

We wanted to use the Media Analytics API to get data on Media events. From there, we wanted to create a dashboard to visualize the events and the data that is part of each event. However, the Media Analytics API was still in beta mode, so we decided to mock the data. As part of that, Yannis wrote the JSONGenerator, which is included in this repository.

## JSONGenerator

The JSONGenerator generates data for 40 different countries: 20 of them have high internet speeds and the other 20 have low speeds. The data for each country is generated based on the speed of internet in that country. The internet speed itself for each country was mocked.

The format of the data generated by the JSONGenerator matches the OPEN data format:
```json
  "data": {
    "reportpacks": [
      {
        "id": "0",
        "eventid": "0",
        "eventname": "Champion's League 2013-2014",
        "startdate": "1379419200",
        "enddate": "1400932800",
        "device": "iPhone",
        "country": "South Korea",
        "metrics": {
          "HD_play_duration": "231105253",
          "SD_play_duration": "99045108",
          "bitrate_views": "7",
          "views": "36000000"
        }
      },
    ]
  }
```
* id: a unique id per record.
* eventid: unique id for that media event
* eventname: title of the media event
* startdata: epoch time when the event started
* enddate: epoch time when the event ended
* device: one of the iPhone, iPad, Desktop, or Andriod that was used to view the media event
* country: the country of the client
* metrics: the aggregate metrics for the event narrowed to the country and device in question
  * HD_play_duration: the aggregate time in hours the event was viewed in hd quality
  * SD_play_duration: the aggregate time in hours the event was viewed in sd quality
  * bitrate_views: aggregate bandwidth in kbps used across all media streams
  * views: aggregate number of views for the event

## Visualization

The data that was generated by the JSONGenerator was then fed into our custom visualization tool. Our visualization tool was based on D3.js, a javascript based library that renders and brings life to data. In addition, Node.js and Express were used to host the tool.

The interactive visualization combines a scatterplot of the event ids along with a display of the metrics as they are averaged across a timeline selection. When a user selects a time rage, the app shows the average metrics for that time, but also can show specific metrics for that selected event.

## Hosting our app

We were determined to live demo the app and get some brownie points, so we created an EC2 instance with Node.js and Express where we hosted our cool tool. 

If interested take a peek at the url: 


