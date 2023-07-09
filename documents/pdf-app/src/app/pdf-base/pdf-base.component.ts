import {Component, ElementRef, ViewChild} from '@angular/core';
import JSPDF from "jspdf";

const mockPaket = {
  "data": {
    "paketIdentifikation": {
      "belegart": "AUSLANDSSCHECK",
      "erfassungstag": "2023-02-04",
      "kontoauszugsnummer": 1235,
      "paketnummer": 1,
      "zahlungsweg": "20",
      "__typename": "PaketInfo"
    },
    "paketsumme": 3,
    "zahlungen": [
      {
        "einzahler": "Ausland Mr.",
        "einzahlungstag": "2023-02-11",
        "empfaenger": null,
        "konto": {
          "bic": "BNPANOKK",
          "blz": null,
          "iban": "DE02100100100006820101",
          "kontonummer": null,
          "sepa": false,
          "__typename": "ZahlungsKonto"
        },
        "laufendeNummer": 1,
        "rechnungsnummer": "321132413412",
        "verwendungszweck": "Ausland",
        "betrag": 1,
        "__typename": "Zahlung",
        "schecknummer": 545454545454,
        "scheckfristKennung": null
      },
      {
        "einzahler": "Ausland 2",
        "einzahlungstag": "2023-02-04",
        "empfaenger": null,
        "konto": {
          "bic": "BNPANOKK",
          "blz": null,
          "iban": "DE02100100100006820101",
          "kontonummer": null,
          "sepa": false,
          "__typename": "ZahlungsKonto"
        },
        "laufendeNummer": 2,
        "rechnungsnummer": "321132413412",
        "verwendungszweck": "Ausland",
        "betrag": 1,
        "__typename": "Zahlung",
        "schecknummer": 12131414245252,
        "scheckfristKennung": null
      },
      {
        "einzahler": "Joe Scheck",
        "einzahlungstag": "2023-02-04",
        "empfaenger": null,
        "konto": {
          "bic": "BNPANOKK",
          "blz": null,
          "iban": "DE02100100100006820101",
          "kontonummer": null,
          "sepa": false,
          "__typename": "ZahlungsKonto"
        },
        "laufendeNummer": 3,
        "rechnungsnummer": "321132413412",
        "verwendungszweck": "Ausland",
        "betrag": 1,
        "__typename": "Zahlung",
        "schecknummer": 12345678,
        "scheckfristKennung": null
      }
    ],
    "__typename": "Paket"
  }
}

@Component({
  selector: 'app-pdf-base',
  templateUrl: './pdf-base.component.html',
  styleUrls: ['./pdf-base.component.scss']
})
export class PdfBaseComponent {
  @ViewChild('content') el: ElementRef | undefined
  paket = mockPaket
  dataLoaded = false

  makePDF() {
    const pdf = new JSPDF('p', 'pt', 'a4')
    pdf.html(this.el?.nativeElement as HTMLElement,
      {
        html2canvas: {
          scale: 0.5
        },
        margin: 30,
        callback: pdf => {
          pdf.save('paket.pdf')
        }
      })
    pdf.save()

  }
}
