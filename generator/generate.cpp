#include <iostream>
#include <vector>
#include <map>
#include <string>
#include "events.h"
#include "countries.h"

class MyGen
{
 private:
  std::mt19937 gen;
  std::uniform_int_distribution<unsigned int> dist;

 public:
  MyGen(unsigned int seed, unsigned int from, unsigned int to)
    : gen(seed), dist(from, to) {}

  unsigned int get() { return dist(gen); }
  unsigned int operator()() { return dist(gen); }
};


MyGen highRebufGen(1, 2, 20);
MyGen lowRebufGen(1, 100, 300);

void print(unsigned int id, unsigned int eventId, Event* event, Country* country,
           const char* device)
{
  bool isHigh = (country->baseRate >= 10000);
  unsigned int minutes = event->getMins();
  double r = isHigh? 0.7 : 0.3;
  unsigned int rebufs = isHigh? highRebufGen() : lowRebufGen();
  unsigned int views = isHigh? (event->popularity / 10) : (event->popularity / 100);
  unsigned int bitrate = (isHigh? 4000 : 500) * views;

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
  std::cout << "          \"HD_play_duration\": \"" << (unsigned int)(r * minutes) << "\",\n";
  std::cout << "          \"SD_play_duration\": \"" << (unsigned int)((1-r) * minutes) << "\",\n";
  std::cout << "          \"bitrate\": \"" << bitrate << "\",\n";
  std::cout << "          \"bitrate_views\": \"" << rebufs << "\",\n";
  std::cout << "          \"views\": \"" << views << "\"\n";
  std::cout << "        }\n";
  std::cout << "      }";
}

int main()
{
  std::cout << "{\n";
  std::cout << "  \"data\": {\n";
  std::cout << "    \"reportpacks\": [";
  MyGen eventGen(1, 0, eventCount - 1);
  MyGen deviceGen(2, 0, deviceCount - 1);
  MyGen countryGen(3, 0, countryCount - 1);

  unsigned int id = 0;
  for (unsigned int eventId = 0; eventId < eventCount; ++eventId)
  {
    for (Country* country = countries; country < countriesEnd; ++country)
    {
      if (id > 0) std::cout << ",";
      unsigned int deviceId = deviceGen();
      print(id, eventId, events + eventId, country, devices[deviceId]);
      ++id;
    }
  }

  std::cout << "\n    ]\n";
  std::cout << "  }\n";
  std::cout << "}\n";
  return 0;
}
