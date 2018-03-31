#define L_SALON 2
#define L_HALL 3
#define L_MIHAB 4
#define L_PASILLO 5
#define F_MIHAB 6
#define P_SALON 7
#define P_MIHAB 8

String jsonOld = "", jsonNew = "";
/*  0 LUZ SALON
 *  1 LUZ HALL
 *  2 LUZ MICUARTO
 *  3 LUZ PASILLO
 *  4 FLEXO MICUARTO
 *  5 PERS SALON
 *  6 PERS MICUARTO
 */
int vals[7] = {0,0,0,0,0,0,0};

void setup() {
  Serial.begin(9600);
  Serial.println("PREPARADO");
  for(int p = 2; p < 9; p++) pinMode(p, OUTPUT);
}

void loop() {
  if(Serial.available()){
    jsonNew = Serial.readString();
    jsonNew.trim();
    selector(jsonNew);
    darLEDs();
    delay(200);
    jsonOld = jsonNew;
  }
}
void selector(String str){
  vals[0] = str.substring(str.indexOf("lampara") + 10, str.indexOf("lampara") + 13).toInt();
  vals[1] = str.substring(str.indexOf("lampara", 40) + 10, str.indexOf("lampara", 40) + 13).toInt();
  vals[2] = str.substring(str.indexOf("lampara", 75) + 10, str.indexOf("lampara", 75) + 13).toInt();
  vals[3] = str.substring(str.indexOf("lampara", 125) + 10, str.indexOf("lampara", 125) + 13).toInt();
  vals[4] = str.substring(str.indexOf("flexo") + 8, str.indexOf("flexo") + 11).toInt();
  vals[5] = str.substring(str.indexOf("persiana") + 11, str.indexOf("persiana") + 14).toInt();
  vals[6] = str.substring(str.indexOf("persiana", 85) + 11, str.indexOf("persiana", 85) + 14).toInt();
}

void darLEDs(){
  for(int v = 0; v < 7; v++){
    Serial.print(vals[v]);
    analogWrite(v+2, vals[v]);
    Serial.print(", ");
  }
  Serial.println();
}

void transicionLED(int pin, int vInicial, int vFinal){
  if(vInicial <= vFinal){
    while(vInicial < vFinal){
      vInicial++;
      analogWrite(pin, vInicial);
      delay(8);
    }
  }else{
    while(vInicial > vFinal){
      vInicial--;
      analogWrite(pin, vInicial);
      delay(8);
    }
  }
}

