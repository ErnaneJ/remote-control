#define x A0
#define y A1

int last_media_x_result = 0;
int last_media_y_result = 0;

void setup() {
  Serial.begin(9600);
  Serial3.begin(9600);
  pinMode(x, INPUT);
  pinMode(y, INPUT);
}

void loop() {
  float value_x = analogRead(x);
  float media_x = 100 * value_x / 1024;
  int media_x_result = media_x;

  float value_y = analogRead(y);
  float media_y = 100 * value_y / 1024;
  int media_y_result = media_y;

  Serial.print("Valor lido X MEGA: ");
  Serial.println(value_x);
  Serial.print("Media X MEGA: ");
  Serial.println(media_x_result);
  Serial.print("Valor lido Y MEGA: ");
  Serial.println(value_y);
  Serial.print("Media Y MEGA: ");
  Serial.println(media_y_result);
  Serial.print("last_Media X MEGA: ");
  Serial.println(last_media_x_result);
  Serial.print("last_Media Y MEGA: ");
  Serial.println(last_media_y_result);

  if(media_x_result != last_media_x_result || media_y_result != last_media_y_result){
    Serial3.write(media_x_result);
    last_media_x_result = media_x_result;
    delay(10);
    Serial3.write(media_y_result);
    last_media_y_result = media_y_result;
  }

  // if(Serial3.available() > 0){
  //   Serial.print("Valor recebido do ESP: ");
  //   int com = Serial3.read();
  //   Serial.println(com);
  // }
}