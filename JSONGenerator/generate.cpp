#include <iostream>
#include <vector>
#include <map>
#include <string>
#include "events.h"
#include "countries.h"

//! @brief Generator of random numbers from a uniform distribution.
class MyGen
{
 private:
  std::mt19937 gen;
  std::uniform_int_distribution<unsigned int> dist;

 public:
  /**
   * @brief Constructor.
   *
   * @param seed The seed for the generator.
   * @param from The minimum value returned.
   * @param to The maximum value to ever be returned.
   */
  MyGen(unsigned int seed, unsigned int from, unsigned int to)
    : gen(seed), dist(from, to) {}

  /**
   * @brief Generate a new random number.
   *
   * @return The generated number.
   */
  unsigned int get() { return dist(gen); }

  /**
   * @brief Operator to generate a new random number.
   *
   * @return The generated number.
   */
  unsigned int operator()() { return dist(gen); }
};


MyGen highRebufGen(1, 2, 20);
MyGen lowRebufGen(1, 100, 300);
MyGen lowBitrateGen(3, 1, 20);
MyGen highBitrateGen(4, 21, 40);

void print(unsigned int id, unsigned int eventId, Event* event, Country* country,
           const char* device)
{
  // If a country's average speed is 10000, then it's "high speed". Speeds were
  // improvised, so we just put a number that will pick the countries with the
  // fastest connection as "high".
  bool isHigh = (country->baseRate >= 10000);

  // Viewing minutes is andomly generated, according to the event's popularity.
  unsigned int minutes = event->getMins();

  // Ratio of play duration that was HD. Depends on whether the country's
  // connection is "high speed" or not.
  double r = isHigh? 0.7 : 0.3;

  // Number of rebufferings. Uses the appropriate generator.
  unsigned int rebufs = isHigh? highRebufGen() : lowRebufGen();

  // Aggregate bitrate across all the streams (in Kbps). Use between two
  // different generators, depending on whether this is a "high rate" country.
  unsigned int bitrateBase = isHigh? highBitrateGen() : lowBitrateGen();

  unsigned int bitrate = bitrateBase * 17500 + 100000;

  // Number of views.
  unsigned int views = bitrateBase * 5000;

  std::cout << "\n";
  std::cout << "      {\n";
  std::cout << "        \"id\": \"" << id << "\",\n";
  std::cout << "        \"eventid\": \"" << eventId << "\",\n";
  std::cout << "        \"eventname\": \"" << event->name << "\",\n";
  std::cout << "        \"startdate\": \"" << event->fromDate << "\",\n";
  std::cout << "        \"enddate\": \"" << event->toDate << "\",\n";
  std::cout << "        \"device\": \"" << device << "\",\n";
  std::cout << "        \"country\": \"" << country->name << "\",\n";
  std::cout << "        \"metrics\": {\n";
  std::cout << "          \"HD_play_duration\": \"" << (unsigned int)(r * minutes / 60) << "\",\n";
  std::cout << "          \"SD_play_duration\": \"" << (unsigned int)((1-r) * minutes * 60) << "\",\n";
  std::cout << "          \"bitrate\": \"" << bitrate << "\",\n";
  std::cout << "          \"bitrate_views\": \"" << rebufs << "\",\n";
  std::cout << "          \"views\": \"" << views << "\"\n";
  std::cout << "        }\n";
  std::cout << "      }";
}

int main(int argc, const char* argv[])
{
  unsigned int maxNumEntries = std::numeric_limits<unsigned int>::max();
  if (argc > 1)
  {
    maxNumEntries = ::strtoul(argv[1], NULL, 10);
    if (maxNumEntries < 1)
    {
      std::cerr << "Usage: " << argv[0] << " [max number of entries]\n";
      return -1;
    }
  }

  std::cout << "{\n";
  std::cout << "  \"data\": {\n";
  std::cout << "    \"reportpacks\": [";

  MyGen deviceGen(2, 0, deviceCount - 1);
  unsigned int id = 0;

  for (unsigned int eventId = 0;
       (eventId < eventCount) && (id < maxNumEntries);
       ++eventId)
  {
    if (id > 0)
      std::cout << ",";

    unsigned int deviceId = deviceGen();

    print(id, eventId, events + eventId, countries, devices[deviceId]);
    ++id;
  }

  std::cout << "\n    ]\n";
  std::cout << "  }\n";
  std::cout << "}\n";
  return 0;
}
