#ifndef DEVICES_H__
#define DEVICES_H__

//! The number of possible client devices connecting to the system.
const char* devices[] =
{
  "iPhone",
  "iPad",
  "Desktop",
  "Android"
};

//! Number of possible clients.
static const unsigned int deviceCount = sizeof(devices) / sizeof(devices[0]);

//! Lowest possible rate for a device compared to the best possible connection.
static const double lowRateRatio[deviceCount] = { 0.2, 0.5, 0.7, 0.35 };

//! Highest possible rate for a device compared to the best possible connection.
static const double highRateRatio[deviceCount] = { 0.5, 0.8, 1, 0.65 };

#endif
