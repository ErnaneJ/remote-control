#define F_CPU 16000000 UL

#include <avr/io.h>
#include <util/delay.h>

#define SENSOR_PIN A0

void ACD_init()
{
  ADMUX = (1 << REFS0); //default Ch-0; Vref = 5V
  ADCSRA |= (1 << ADEN) | (0 << ADSC) | (0 << ADATE); //auto-trigger OFF
  ADCSRB = 0x00;
}

uint16_t adc_read(uint8_t ch)
{
  ADCSRA |= (1 << ADSC);

  while (ADCSRA & (1 << ADSC)); // wait for conversion to complete
  ADC = (ADCL | (ADCH << 8));
  return (ADC);
}

void setup()
{
  Serial.begin(9600);
  ACD_init();
}

void loop()
{
  uint16_t sensorValue = adc_read(SENSOR_PIN);
  Serial.println(sensorValue);
  delay(100);
}

