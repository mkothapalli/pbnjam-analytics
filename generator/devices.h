#ifndef DEVICES_H__
#define DEVICES_H__


const char* devices[] =
{
  "iPhone",
  "iPad",
  "Desktop",
  "Android"
};

static const unsigned int deviceCount = sizeof(devices) / sizeof(devices[0]);
static char const* const* deviceEnd = devices + deviceCount;

static const double lowRateRatio[deviceCount] = { 0.2, 0.5, 0.7, 0.35 };
static const double highRateRatio[deviceCount] = { 0.5, 0.8, 1, 0.65 };

#endif
