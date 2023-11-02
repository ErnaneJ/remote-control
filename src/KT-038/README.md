# KY-038 Sound Intensity Sensor 🎤

Exploring the functionality of the KY-038 sound intensity sensor and learning how to read it using an Arduino Uno (ATmega328P). The KY-038 is a sensor designed to detect sound intensity in your environment, providing analog and digital outputs to indicate sound levels. The analog output ranges from 0 to 1023, while the digital output is 0 for low intensity and 1 for high intensity.

## KY-038 Sensor

The KY-038 sensor is equipped with a microphone that captures variations in sound intensity in its surroundings. It converts these variations into electrical signals that can be processed by an Arduino. This sensor offers the following outputs:

- **Analog Output:** This output provides an analog voltage that varies with sound intensity. The voltage decreases as the sound intensity increases.

- **Digital Output:** In addition to the analog output, the KY-038 also features a digital output. This output goes high when the sound intensity surpasses a predefined threshold. You can adjust the sensitivity by using a potentiometer on the sensor board.

- **Indicator LED:** The KY-038 sensor has an LED on the board that lights up when the digital output is high.

## Getting Started

1. **Physical Connections:**
   - The VCC pin of the KY-038 to the 5V on the Arduino.
   - The GND pin of the KY-038 to the GND on the Arduino.
   - The D0 pin of the KY-038 to a digital pin on the Arduino (optional).
   - The A0 pin of the KY-038 to an analog pin on the Arduino.

2. **Potentiometer Calibration:**
   - The KY-038 sensor is equipped with a potentiometer used to set the threshold for the digital output. By rotating the potentiometer, you can adjust the sensitivity of the sensor to different sound intensity levels.

3. **Code:**

    [Here is the code used for reading analog signals on the Arduino at port A0 connected to the KY-038 sensor.](./src/KT-038/sketch.ino). 🧩📝