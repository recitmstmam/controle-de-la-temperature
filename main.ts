input.onButtonPressed(Button.B, function () {
    basic.showString("T=" + Température + "C")
    basic.pause(1000)
})
let Température = 0
radio.setGroup(1)
Température = smarthome.ReadTemperature(TMP36Type.TMP36_temperature_C, AnalogPin.P0)
let Angle_fenetre = 160
servos.P1.setAngle(Angle_fenetre)
basic.pause(2000)
servos.P1.stop()
basic.forever(function () {
    // Calibrer votre sonde avec un autre thermomètre et ajuster le calcul en conséquence.
    Température = smarthome.ReadTemperature(TMP36Type.TMP36_temperature_C, AnalogPin.P0) + 2
    basic.pause(100)
    radio.sendValue("T ", Température)
    // Ajuster cette valeur en fonction de vos paramètres expérimentaux. Ici, la fenêtre ouvre lorsque la température dépasse 25 °C.
    if (Température >= 25) {
        // Auster cette valeur de l'angle d'ouverture pour que la fenêtre reste ouverte sans courant.
        while (Angle_fenetre > 45) {
            Angle_fenetre += -1
            servos.P1.setAngle(Angle_fenetre)
            basic.pause(15)
        }
        servos.P1.stop()
    } else {
        // Auster cette valeur de l'angle de fermeture pour que la fenêtre ferme correctement.
        while (Angle_fenetre < 160) {
            Angle_fenetre += 1
            servos.P1.setAngle(Angle_fenetre)
            basic.pause(15)
        }
        servos.P1.stop()
    }
    // 60 secondes avant la prochaine mesure
    basic.pause(60000)
})
