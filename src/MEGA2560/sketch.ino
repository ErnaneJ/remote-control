#define x A0
#define y A1
#define IN1 7
#define IN2 6
#define IN3 5
#define IN4 4

int last_media_x_result = 0;
int last_media_y_result = 0;

void go_up(){
  // ------ RODA ESQUERDA PARA FRENTE ------
  digitalWrite(IN2, HIGH);
  // ------ RODA DIREITA PARA FRENTE ------
  digitalWrite(IN3, HIGH);
}

void go_down(){
  // ------ RODA ESQUERDA PARA TRÁS ------
  digitalWrite(IN1, HIGH);
  // ------ RODA DIREITA PARA TRÁS ------
  digitalWrite(IN4, HIGH);
}

void go_left(){
  // ------ RODA DIREITA PARA FRENTE ------
  digitalWrite(IN3, HIGH);
}

void go_rigth(){
  // ------ RODA ESQUERDA PARA FRENTE ------
  digitalWrite(IN2, HIGH);
}

void motor_off(){
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void setup() {
  Serial.begin(9600);
  Serial3.begin(9600);
  pinMode(x, INPUT);
  pinMode(y, INPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
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

  if(media_x_result >= 0 && media_x_result < 45){
    Serial.println("ESQUERDA");
    go_left();
  }else if(media_x_result > 50){
    Serial.println("DIREITA");
    go_rigth();
  }else if(media_y_result >= 0 && media_y_result < 45){
    Serial.println("TRÁS");
    go_down();
  }else if(media_y_result > 50){
    Serial.println("FRENTE");
    go_up();
  }else{
    Serial.println("PARADO");
    motor_off();
  }

  if(media_x_result != last_media_x_result || media_y_result != last_media_y_result){
    Serial3.write(media_x_result);
    last_media_x_result = media_x_result;
    delay(10);
    Serial3.write(media_y_result);
    last_media_y_result = media_y_result;
  }
}