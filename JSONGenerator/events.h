#ifndef EVENTS_H__
#define EVENTS_H__

#include <functional>
#include <random>

//! Statistics for an event. Their values are improvised.
class Event
{
 public:
  const std::string name;
  const unsigned int fromDate;
  const unsigned int toDate;
  const unsigned int popularity;

  /**
   * @brief Constructor.
   *
   * @param n The name of the event.
   * @param f Start time of the event (Epoch Time).
   * @param t End time of the event (Epoch Time).
   * @param maxMins Maximum time (in minutes) a normal person would spend
   * watching the event (generated).
   * @param fromSepFirst2013 If this is true, f and t represent number of days
   * from Sep 1, 2013. Otherwise, they represent Epoch Times (sec from Jan 1,
   * 1970).
   */
  Event(const std::string& n, unsigned int f, unsigned int t,
        unsigned int maxMins, bool fromSepFirst2013)
    : name(n),
    fromDate(fromSepFirst2013? (oneDay * f + oct012013) : f),
    toDate(fromSepFirst2013? (oneDay * t + oct012013) : t),
    popularity(maxMins),
    rng(std::hash<std::string>()(n)),
    dist(maxMins/2, maxMins)
  {
  }

  //! @return Randomly generated number of minutes.
  unsigned int getMins() { return dist(rng); }

 private:
  static const time_t oct012013 = 1380585600;
  //static const time_t sep262013 = 1380196800;
  //static const time_t sep012013 = 1378036800;
  //static const time_t sep012007 = 1188648000;
  static const unsigned int oneDay = 3600 * 24;

  std::mt19937 rng;
  std::uniform_int_distribution<unsigned int> dist;
};

//! Generated events.
static Event events[] =
{
  Event("Champion's League 2013-2014", 1379419200, 1400932800, 1200 * 300000, false),
  Event("World Cup 2014", 1402574400, 1405252800, 1800 * 500000, false),
  Event("Winter Olympics 2014", 1391774400, 1393156800, 200000000, false),
  Event("Event3", 0, 4, 100000000, true),
  Event("Event4", 26, 8, 50000000, true),
  Event("Event5", 52, 12, 25000000, true),
  Event("Event6", 78, 16, 12500000, true),
  Event("Event7", 104, 20, 6250000, true),
  Event("Event8", 130, 24, 3125000, true),
  Event("Event9", 156, 28, 1562500, true),
  Event("Event10", 182, 32, 781250, true),
  Event("Event11", 208, 36, 390625, true),
  Event("Event12", 234, 40, 195313, true),
  Event("Event13", 260, 44, 97656, true),
  Event("Event14", 286, 48, 48828, true),
  Event("Event15", 312, 52, 24414, true),
  Event("Event16", 338, 56, 12207, true),
  Event("Event17", 364, 60, 6104, true),
  Event("Event18", 390, 64, 3052, true),
  Event("Event19", 416, 68, 1526, true),
  Event("Event20", 442, 72, 763, true),
  Event("Event21", 468, 76, 500, true),
  Event("Event22", 494, 80, 495, true),
  Event("Event23", 520, 84, 490, true),
  Event("Event24", 546, 88, 485, true),
  Event("Event25", 572, 92, 480, true),
  Event("Event26", 598, 96, 475, true),
  Event("Event27", 624, 100, 470, true),
  Event("Event28", 650, 104, 465, true),
  Event("Event29", 676, 108, 460, true),
  Event("Event30", 702, 112, 455, true),
  Event("Event31", 728, 116, 450, true),
  Event("Event32", 754, 120, 445, true),
  Event("Event33", 780, 124, 440, true),
  Event("Event34", 806, 128, 435, true),
  Event("Event35", 832, 132, 430, true),
  Event("Event36", 858, 136, 425, true),
  Event("Event37", 884, 140, 420, true),
  Event("Event38", 910, 144, 415, true),
  Event("Event39", 936, 148, 410, true),
  Event("Event40", 962, 152, 405, true),
  Event("Event41", 988, 156, 400, true),
  Event("Event42", 1014, 160, 395, true),
  Event("Event43", 1040, 164, 390, true),
  Event("Event44", 1066, 168, 385, true),
  Event("Event45", 1092, 172, 380, true),
  Event("Event46", 1118, 176, 375, true),
  Event("Event47", 1144, 180, 370, true),
  Event("Event48", 1170, 184, 365, true),
  Event("Event49", 1196, 188, 360, true),
  Event("Event50", 1222, 192, 355, true),
  Event("Event51", 1248, 196, 350, true),
  Event("Event52", 1274, 200, 345, true),
  Event("Event53", 1300, 204, 340, true),
  Event("Event54", 1326, 208, 335, true),
  Event("Event55", 1352, 212, 330, true),
  Event("Event56", 1378, 216, 325, true),
  Event("Event57", 1404, 220, 320, true),
  Event("Event58", 1430, 224, 315, true),
  Event("Event59", 1456, 228, 310, true),
  Event("Event60", 1482, 232, 305, true),
  Event("Event61", 1508, 236, 300, true),
  Event("Event62", 1534, 240, 295, true),
  Event("Event63", 1560, 244, 290, true),
  Event("Event64", 1586, 248, 285, true),
  Event("Event65", 1612, 252, 280, true),
  Event("Event66", 1638, 256, 275, true),
  Event("Event67", 1664, 260, 270, true),
  Event("Event68", 1690, 264, 265, true),
  Event("Event69", 1716, 268, 260, true),
  Event("Event70", 1742, 272, 255, true),
  Event("Event71", 1768, 276, 250, true),
  Event("Event72", 1794, 280, 245, true),
  Event("Event73", 1820, 284, 240, true),
  Event("Event74", 1846, 288, 235, true),
  Event("Event75", 1872, 292, 230, true),
  Event("Event76", 1898, 296, 225, true),
  Event("Event77", 1924, 300, 220, true),
  Event("Event78", 1950, 304, 215, true),
  Event("Event79", 1976, 308, 210, true),
  Event("Event80", 2002, 312, 205, true),
  Event("Event81", 2028, 316, 200, true),
  Event("Event82", 2054, 320, 195, true),
  Event("Event83", 2080, 324, 190, true),
  Event("Event84", 2106, 328, 185, true),
  Event("Event85", 2132, 332, 180, true),
  Event("Event86", 2158, 336, 175, true),
  Event("Event87", 2184, 340, 170, true),
  Event("Event88", 2210, 344, 165, true),
  Event("Event89", 2236, 348, 160, true),
  Event("Event90", 2262, 352, 155, true),
  Event("Event91", 2288, 356, 150, true),
  Event("Event92", 2314, 360, 145, true),
  Event("Event93", 2340, 364, 140, true),
  Event("Event94", 2366, 368, 135, true),
  Event("Event95", 2392, 372, 130, true),
  Event("Event96", 2418, 376, 125, true),
  Event("Event97", 2444, 380, 120, true),
  Event("Event98", 2470, 384, 115, true),
  Event("Event99", 2496, 388, 110, true),
};

//! The number of generated events.
static const unsigned int eventCount = sizeof(events) / sizeof(events[0]);

#endif //EVENTS_H__
