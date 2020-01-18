# ng Testprojekt

## Scope: Testprojekt, um Storybook zu testen.
Außerdem wurde Jest integriert, um Screenshottests mit Storybook zu evaluieren.
Scrennhot testing wird mit storyshots umgesetzt.
Ziel: Einheitliche Jest-Konfiguration für die klassischen NG Tests und die Snapshots.
(Alles über *npm test* aufrufbar).

Wichtig ist:
* Nutzung von Babel
    * core, runtime, loader nicht vergessen
    * babel Plugin "require-context-hook" verwenden, da webpacks require.context() gemockt werden muss  
    https://www.npmjs.com/package/babel-plugin-require-context-hook
* Einstellung der Typen in tsconfig Dateien
* Festlegen (in jest.config.js):
    * welche Datentypen von wem (Jest, Babel) transformiert werden sollen.
    * welche Pfade zu ignorieren sind.
    * Babel für das Transpilieren der js Dateien verwenden! ()


## Installation JEST

Bei Fehler (und es werden welche auftreten), helfen diese beiden Links weiter.

https://www.npmjs.com/package/@storybook/addon-storyshots
https://github.com/thymikee/jest-preset-angular/blob/master/README.md
https://github.com/thymikee/jest-preset-angular/issues/256
