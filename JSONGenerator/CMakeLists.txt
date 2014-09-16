cmake_minimum_required (VERSION 2.6)
project (pbnjam-generator)

set(CMAKE_USE_RELATIVE_PATHS ON)

if (CMAKE_CXX_COMPILER_ID STREQUAL "Clang")

  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Werror -std=c++11 -fexceptions -fcxx-exceptions")
  if (${CMAKE_SYSTEM_NAME} MATCHES "Darwin")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++")
  endif (${CMAKE_SYSTEM_NAME} MATCHES "Darwin")

elseif (CMAKE_COMPILER_IS_GNUCXX)

  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Werror -std=c++11")
  if (${CMAKE_SYSTEM_NAME} MATCHES "Darwin")
    set(CMAKE_OSX_SYSROOT "")
  endif (${CMAKE_SYSTEM_NAME} MATCHES "Darwin")

endif (CMAKE_CXX_COMPILER_ID STREQUAL "Clang")

add_executable(generate generate.cpp)
