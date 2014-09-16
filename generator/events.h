#ifndef EVENTS_H__
#define EVENTS_H__

#include <functional>
#include <random>

class Event
{
 public:
  //static const time_t oct012013 = 1380585600;
  //static const time_t sep262013 = 1380196800;
  static const time_t sep012013 = 1378036800;
  static const unsigned int oneDay = 3600 * 24;
  const std::string name;
  const unsigned int fromDate;
  const unsigned int toDate;
  const unsigned int popularity;

  Event(const std::string& n, unsigned int f, unsigned int t,
        unsigned int maxMins, bool fromSepFirst2013)
    : name(n),
    fromDate(fromSepFirst2013? (oneDay * f + sep012013) : f),
    toDate(fromSepFirst2013? (oneDay * t + sep012013) : t),
    popularity(maxMins),
    rng(std::hash<std::string>()(n)),
    dist(maxMins/2, maxMins)
  {
  }

  unsigned int getMins() { return dist(rng); }

 private:
  std::mt19937 rng;
  std::uniform_int_distribution<unsigned int> dist;
};

static Event events[] =
{
  Event("Champion's League 2013-2014", 1379419200, 1400932800, 1200 * 300000, false),
  Event("World Cup 2014", 1402574400, 1405252800, 1800 * 500000, false),
  Event("Winter Olympics 2014", 1391774400, 1393156800, 200000000, false),
  Event("Event3", 0, 4, 100000000, true),
  Event("Event4", 4, 8, 50000000, true),
  Event("Event5", 8, 12, 25000000, true),
  Event("Event6", 12, 16, 12500000, true),
  Event("Event7", 16, 20, 6250000, true),
  Event("Event8", 20, 24, 3125000, true),
  Event("Event9", 24, 28, 1562500, true),
  Event("Event10", 28, 32, 781250, true),
  Event("Event11", 32, 36, 390625, true),
  Event("Event12", 36, 40, 195313, true),
  Event("Event13", 40, 44, 97656, true),
  Event("Event14", 44, 48, 48828, true),
  Event("Event15", 48, 52, 24414, true),
  Event("Event16", 52, 56, 12207, true),
  Event("Event17", 56, 60, 6104, true),
  Event("Event18", 60, 64, 3052, true),
  Event("Event19", 64, 68, 1526, true),
  Event("Event20", 68, 72, 763, true),
  Event("Event21", 72, 76, 500, true),
  Event("Event22", 76, 80, 495, true),
  Event("Event23", 80, 84, 490, true),
  Event("Event24", 84, 88, 485, true),
  Event("Event25", 88, 92, 480, true),
  Event("Event26", 92, 96, 475, true),
  Event("Event27", 96, 100, 470, true),
  Event("Event28", 100, 104, 465, true),
  Event("Event29", 104, 108, 460, true),
  Event("Event30", 108, 112, 455, true),
  Event("Event31", 112, 116, 450, true),
  Event("Event32", 116, 120, 445, true),
  Event("Event33", 120, 124, 440, true),
  Event("Event34", 124, 128, 435, true),
  Event("Event35", 128, 132, 430, true),
  Event("Event36", 132, 136, 425, true),
  Event("Event37", 136, 140, 420, true),
  Event("Event38", 140, 144, 415, true),
  Event("Event39", 144, 148, 410, true),
  Event("Event40", 148, 152, 405, true),
  Event("Event41", 152, 156, 400, true),
  Event("Event42", 156, 160, 395, true),
  Event("Event43", 160, 164, 390, true),
  Event("Event44", 164, 168, 385, true),
  Event("Event45", 168, 172, 380, true),
  Event("Event46", 172, 176, 375, true),
  Event("Event47", 176, 180, 370, true),
  Event("Event48", 180, 184, 365, true),
  Event("Event49", 184, 188, 360, true),
  Event("Event50", 188, 192, 355, true),
  Event("Event51", 192, 196, 350, true),
  Event("Event52", 196, 200, 345, true),
  Event("Event53", 200, 204, 340, true),
  Event("Event54", 204, 208, 335, true),
  Event("Event55", 208, 212, 330, true),
  Event("Event56", 212, 216, 325, true),
  Event("Event57", 216, 220, 320, true),
  Event("Event58", 220, 224, 315, true),
  Event("Event59", 224, 228, 310, true),
  Event("Event60", 228, 232, 305, true),
  Event("Event61", 232, 236, 300, true),
  Event("Event62", 236, 240, 295, true),
  Event("Event63", 240, 244, 290, true),
  Event("Event64", 244, 248, 285, true),
  Event("Event65", 248, 252, 280, true),
  Event("Event66", 252, 256, 275, true),
  Event("Event67", 256, 260, 270, true),
  Event("Event68", 260, 264, 265, true),
  Event("Event69", 264, 268, 260, true),
  Event("Event70", 268, 272, 255, true),
  Event("Event71", 272, 276, 250, true),
  Event("Event72", 276, 280, 245, true),
  Event("Event73", 280, 284, 240, true),
  Event("Event74", 284, 288, 235, true),
  Event("Event75", 288, 292, 230, true),
  Event("Event76", 292, 296, 225, true),
  Event("Event77", 296, 300, 220, true),
  Event("Event78", 300, 304, 215, true),
  Event("Event79", 304, 308, 210, true),
  Event("Event80", 308, 312, 205, true),
  Event("Event81", 312, 316, 200, true),
  Event("Event82", 316, 320, 195, true),
  Event("Event83", 320, 324, 190, true),
  Event("Event84", 324, 328, 185, true),
  Event("Event85", 328, 332, 180, true),
  Event("Event86", 332, 336, 175, true),
  Event("Event87", 336, 340, 170, true),
  Event("Event88", 340, 344, 165, true),
  Event("Event89", 344, 348, 160, true),
  Event("Event90", 348, 352, 155, true),
  Event("Event91", 352, 356, 150, true),
  Event("Event92", 356, 360, 145, true),
  Event("Event93", 360, 364, 140, true),
  Event("Event94", 364, 368, 135, true),
  Event("Event95", 368, 372, 130, true),
  Event("Event96", 372, 376, 125, true),
  Event("Event97", 376, 380, 120, true),
  Event("Event98", 380, 384, 115, true),
  Event("Event99", 384, 388, 110, true),
};

static const unsigned int eventCount = sizeof(events) / sizeof(events[0]);

#endif //EVENTS_H__
