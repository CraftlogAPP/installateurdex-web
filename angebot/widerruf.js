// Muster-Widerrufsbelehrung + Muster-Widerrufsformular für die Seite „Angebot annehmen“.
// WORTGLEICH zu mobile/src/lib/wartungsvertrag.ts (widerrufsbelehrung, vorzeitigerBeginnText) — am 07.11.2026 gegen die
// amtlichen Texte geprüft (DE Anlage 1/2 zu Art. 246a EGBGB, AT Anhang I Teil A/B FAGG). Der Test
// mobile/scripts/test-angebot-widerruf.js vergleicht beide Fassungen; bei Änderungen dort hier nachziehen.
(function (root) {
  function anschrift(f) {
    return [f.street, [f.zip, f.city].filter(Boolean).join(' ')].filter(function (x) { return !!x && !!String(x).trim(); }).join(', ');
  }

  /** land: 'AT' | 'DE'; firma: { name, street, zip, city, phone, email } → { titel, abschnitte, formularTitel, formular, quelle } */
  function widerrufsbelehrung(land, f) {
    if (land !== 'AT' && land !== 'DE') return null;
    var phone = f.phone && String(f.phone).trim();
    var email = f.email && String(f.email).trim();
    var kontakt = [String(f.name || '').trim(), anschrift(f), phone ? 'Telefon ' + phone : '', email ? 'E-Mail ' + email : ''].filter(Boolean).join(', ');
    var an = [String(f.name || '').trim(), anschrift(f), email ? 'E-Mail ' + email : ''].filter(Boolean).join(', ');
    var at = land === 'AT';
    var beispiel = at ? '(z. B. mit der Post versandter Brief oder E-Mail)' : '(z. B. ein mit der Post versandter Brief oder eine E-Mail)';
    return {
      titel: 'Widerrufsbelehrung',
      abschnitte: [
        { h: 'Widerrufsrecht', text: 'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.' },
        { text: 'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.' },
        {
          text: 'Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (' + kontakt + ') mittels einer eindeutigen Erklärung ' + beispiel + ' über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.',
        },
        { text: 'Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.' },
        {
          h: 'Folgen des Widerrufs',
          text: 'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.',
        },
        {
          text: 'Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.',
        },
      ],
      formularTitel: 'Muster-Widerrufsformular',
      formular: [
        at
          ? '(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück)'
          : '(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)',
        '– An ' + an + ':',
        '– Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)',
        '– Bestellt am (*)/erhalten am (*)',
        '– Name des/der Verbraucher(s)',
        '– Anschrift des/der Verbraucher(s)',
        '– Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)',
        '– Datum',
        '(*) Unzutreffendes streichen.',
      ],
      quelle: land === 'DE' ? 'Muster nach Anlage 1 und 2 zu Art. 246a EGBGB (§ 312g BGB)' : 'Muster nach Anhang I Teil A und B FAGG (§§ 11 ff. FAGG)',
    };
  }

  function vorzeitigerBeginnText(ja) {
    return {
      frage: 'Soll vor Ablauf der Widerrufsfrist mit der Leistung begonnen werden?',
      ja: 'Ja. Ich verlange ausdrücklich, dass der Auftragnehmer vor Ablauf der Widerrufsfrist mit den vereinbarten Leistungen beginnt. Mir ist bekannt, dass ich bei einem Widerruf einen angemessenen Betrag für die bis dahin erbrachten Leistungen zu zahlen habe und dass mein Widerrufsrecht erlischt, sobald die Leistung vollständig erbracht ist.',
      nein: 'Nein. Mit den Leistungen wird erst nach Ablauf der Widerrufsfrist begonnen.',
      gewaehlt: ja ? 'ja' : 'nein',
    };
  }

  root.IdxWiderruf = { widerrufsbelehrung: widerrufsbelehrung, vorzeitigerBeginnText: vorzeitigerBeginnText };
})(typeof window !== 'undefined' ? window : globalThis);
