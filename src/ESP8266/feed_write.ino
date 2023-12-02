// Adafruit IO Shared Feeds Write Example
// desc: Example of writing a button value to a shared feed.
//
// Tutorial Link: https://learn.adafruit.com/adafruit-io-basics-feeds/sharing-a-feed
//
// Adafruit invests time and resources providing this open source code.
// Please support Adafruit and open source hardware by purchasing
// products from Adafruit!
//
// Written by Brent Rubell for Adafruit Industries
// Copyright (c) 2018 Adafruit Industries
// Licensed under the MIT license.
//
// All text above must be included in any redistribution.

/************************** Configuration ***********************************/

// edit the config.h tab and enter your Adafruit IO credentials
// and any additional configuration needed for WiFi, cellular,
// or ethernet clients.
#include "config.h"
#include <SoftwareSerial.h>
SoftwareSerial SUART(2, 1); //SRX = D2 = GPIO-4; STX = D1 = GPIO-5

/************************ Example Starts Here *******************************/

// the Adafruit IO username of whomever owns the feed
#define FEED_OWNER "Ernane"

// set up a shared feed between you and the FEED_OWNER 
// make sure you have both read AND write access to this feed
AdafruitIO_Feed *sharedFeed = io.feed("remote", FEED_OWNER);

void setup() {

  // start the serial connection
  Serial.begin(9600);
  SUART.begin(9600);

  // wait for serial monitor to open
  while(! Serial);

  // connect to io.adafruit.com
  Serial.print("Connecting to Adafruit IO");
  io.connect();

  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  // we are connected
  Serial.println();
  Serial.println(io.statusText());
}

void loop() {

  // io.run(); is required for all sketches.
  // it should always be present at the top of your loop
  // function. it keeps the client connected to
  // io.adafruit.com, and processes any incoming data.
  io.run();
  int cont = 0;
  while(cont != 2){
    if(Serial.available() > 0){
      int valor = Serial.read();
      // save the current state to the 'sharedFeed' feed on adafruit io
      Serial.print("sending data -> ");
      sharedFeed->save(valor);
    }
  }
  delay(1000);
}
