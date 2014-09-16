#ifndef COUNTRIES_H__
#define COUNTRIES_H__

#include <random>
#include "devices.h"

/**
 * Statistics for a country. Generated based on a country's internet speed
 * (compared to others around the world).
 */
struct Country
{
 public:
  //! Name of the country.
  const char* const name;

  //! Average rate for a Desktop PC connecting from the country.
  const unsigned int baseRate;

 private:
  std::mt19937 gen;
  std::uniform_real_distribution<double> dis;

 public:
  Country(const char* n, unsigned int b)
    : name(n), baseRate(b), gen(b), dis(0, 0.3) {}

  /**
   * @brief Generate a random rate, based on device ID and baseRate.
   * Not currently used.
   *
   * @param deviceId the device ID
   *
   * @return A new rate.
   */
  unsigned int randRate(unsigned int deviceId)
  {
    const double* devr = (deviceId == 0 || deviceId == 3)? lowRateRatio : highRateRatio;
    return (unsigned int)((dis(gen) + devr[deviceId]) * baseRate);
  }
};

/**
 * A list of countries, sorted according to their average connection speed.
 * Connection speeds are generated according to the country's speed ranking.
 */
static Country countries[] =
{
  Country("South Korea",   200000),
  Country("Japan",         150000),
  Country("Hong Kong",     100000),
  Country("Switzerland",    90000),
  Country("Netherlands",    80000),
  Country("Czech Republic", 50000),
  Country("Sweden",         50000),
  Country("Latvia",         50000),
  Country("United States",  45000),
  Country("Macau",          44000),
  Country("Denmark",        44000),
  Country("Canada",         40000),
  Country("United Kingdom", 38000),
  Country("Bulgaria",       35000),
  Country("Romania",        30000),
  Country("Belgium",        30000),
  Country("Israel",         28000),
  Country("Singapore",      25000),
  Country("Poland",         20000),
  Country("Taiwan",         10000),
  Country("Spain",          10000),
  Country("Pakistan",         350),
  Country("India",            300),
  Country("Myanmar",          200),
  Country("Algeria",          180),
  Country("Venezuela",        150),
  Country("Mali",             150),
  Country("Tanzania",         120),
  Country("Iran",             120),
  Country("Nicaragua",        100),
  Country("Kenya",            100),
  Country("Bolivia",          100),
  Country("Syria",             90),
  Country("Nigeria",           70),
  Country("Congo",             70),
  Country("Colombia",          50),
  Country("Botswana",          50),
  Country("Angola",            50),
  Country("Peru",              10),
  Country("Paraguay",          10),
};

//! Number of countries generated.
static const unsigned int countryCount = sizeof(countries) / sizeof(countries[0]);

static Country* countriesEnd = countries + countryCount;

#endif
