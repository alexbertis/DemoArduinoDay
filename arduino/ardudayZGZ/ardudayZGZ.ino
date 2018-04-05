#define L_SALON 2
#define L_HALL 3
#define L_MIHAB 4
#define L_PASILLO 5
#define F_MIHAB 6
#define P_SALON 7
#define P_MIHAB 8

String jsonNew = "";
/*  0 LUZ SALON
 *  1 LUZ HALL
 *  2 LUZ MICUARTO
 *  3 LUZ PASILLO
 *  4 FLEXO MICUARTO
 *  5 PERS SALON
 *  6 PERS MICUARTO
 */
int vals[7] = {0,0,0,0,0,0,0};
int indexini = 0;
int indexfin = 0;

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
  }
}
void selector(String str){
  int i = 0;
  indexini = 0;
  indexfin = 0;
  while (indexfin != -1){
    indexfin = str.indexOf(",", indexini);
    if (indexfin != -1)
      vals[i] = str.substring(indexini, indexfin).toInt();
    else
      vals[i] = str.substring(indexini).toInt();
    indexini = indexfin + 1;
    i++;
  }
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
